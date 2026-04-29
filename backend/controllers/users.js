import User from "../models/user.js";

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Error del servidor" }));
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
      res.status(500).send({ message: "Error del servidor" });
    });
};

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: "Datos inválidos" }));
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
      res.status(500).send({ message: "Error del servidor" });
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
      res.status(500).send({ message: "Error del servidor" });
    });
};
