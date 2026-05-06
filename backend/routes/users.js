import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  getMe,
  updateProfile,
  updateAvatar,
} from "../controllers/users.js";
import { auth } from "../middlewares/auth.js";
import { celebrate, Joi } from "celebrate";
import { validateURL } from "../middlewares/validation.js";

const router = express.Router();

router.get("/users", auth, getUsers);

router.get("/users/me", auth, getMe);

router.patch(
  "/users/me",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile,
);

router.patch(
  "/users/me/avatar",
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar,
);

router.get(
  "/users/:userId",
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  getUserById,
);
router.post(
  "/users",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);

export default router;
