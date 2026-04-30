import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  login,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);

router.get("/users/:userId", getUserById);

export default router;
