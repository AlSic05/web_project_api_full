import express from "express";
import { getUsers, getUserById, createUser } from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);

router.get("/users/:userId", getUserById);

router.post("/users", createUser);

export default router;
