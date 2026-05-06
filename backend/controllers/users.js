import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const { NODE_ENV, JWT_SECRET } = process.env;

export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("Email y contraseña requeridos");
    err.statusCode = 400;
    return next(err);
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("Email o contraseña incorrectos");
        err.statusCode = 401;
        throw err;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("Email o contraseña incorrectos");
          err.statusCode = 401;
          throw err;
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" },
        );
        return res.send({ token });
      });
    })
    .catch(next);
};

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      } else if (err.name === "CastError") {
        err.statusCode = 400;
      }
      next(err);
    });
};

export const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      } else if (err.name === "CastError") {
        err.statusCode = 400;
      }
      next(err);
    });
};

export const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (!password || !email) {
    const err = new Error("Email y contraseña son obligatorios");
    err.statusCode = 400;
    return next(err);
  }

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar: avatar || undefined,
        email,
        password: hash,
      }),
    )
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        err.statusCode = 409;
      } else if (err.name === "ValidationError") {
        err.statusCode = 400;
      }
      next(err);
    });
};

export const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      } else if (err.name === "ValidationError") {
        err.statusCode = 400;
      }
      next(err);
    });
};

export const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      } else if (err.name === "ValidationError") {
        err.statusCode = 400;
      }
      next(err);
    });
};
