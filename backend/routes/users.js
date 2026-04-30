import express from "express";
import { getCards, createCard, deleteCard } from "../controllers/cards.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/cards", auth, getCards);

router.post("/cards", auth, createCard);

router.delete("/cards/:cardId", auth, deleteCard);

export default router;
