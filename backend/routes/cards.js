import express from "express";
import { getCards, createCard, deleteCard } from "../controllers/cards.js";

const router = express.Router();

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);

export default router;
