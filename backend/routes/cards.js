import express from "express";
import { getCards, createCard, deleteCard } from "../controllers/cards.js";
import { auth } from "../middlewares/auth.js";
import { celebrate, Joi } from "celebrate";
import { validateURL } from "../middlewares/validation.js";

const router = express.Router();

router.get("/cards", auth, getCards);

router.post(
  "/cards",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);

router.delete(
  "/cards/:cardId",
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteCard,
);

export default router;
