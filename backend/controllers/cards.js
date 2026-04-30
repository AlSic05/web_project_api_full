import Card from "../models/card.js";

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: "Error del servidor" }));
};

export const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(400).send({ message: "Datos inválidos" }));
};

export const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({
          message: "No tienes permisos para eliminar esta tarjeta",
        });
      }

      return Card.findByIdAndRemove(req.params.cardId).then((card) =>
        res.send({ data: card }),
      );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      res.status(500).send({ message: "Error del servidor" });
    });
};

export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      res.status(500).send({ message: "Error del servidor" });
    });
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true },
  )
    .orFail()
    .then((card) => {
      if (!card)
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(400).send({ message: "ID inválido" });
      res.status(500).send({ message: "Error del servidor" });
    });
};
