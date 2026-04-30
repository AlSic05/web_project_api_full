import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const { JWT_SECRET = "dev-secret" } = process.env;

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email y contraseña requeridos",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject();
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.send({ token });
      });
    })
    .catch(() => {
      return res.status(401).send({
        message: "Email o contraseña incorrectos",
      });
    });
};

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Error del servidor" }));
};

export const getMe = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      return res.status(500).send({ message: "Error del servidor" });
    });
};

export const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      return res.status(500).send({ message: "Error del servidor" });
    });
};

export const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .send({ message: "Email y contraseña son obligatorios" });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar: avatar || undefined,
        email,
        password: hash,
      });
    })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({ message: "El email ya está registrado" });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Datos inválidos" });
      }
      return res.status(500).send({ message: "Error del servidor" });
    });
};

export const updateProfile = (req, res) => {
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
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Datos inválidos" });
      }
      return res.status(500).send({ message: "Error del servidor" });
    });
};

export const updateAvatar = (req, res) => {
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
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "URL inválida" });
      }
      return res.status(500).send({ message: "Error del servidor" });
    });
};
