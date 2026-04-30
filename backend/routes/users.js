import express from "express";
import { getUsers, getUserById } from "../controllers/users.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/users", auth, getUsers);

router.get("/users/:userId", auth, getUserById);

export default router;
