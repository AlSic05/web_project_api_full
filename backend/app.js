import express from "express";
import mongoose from "mongoose";
import { login, createUser } from "./controllers/users.js";

import userrouter from "./routes/users.js";
import cardrouter from "./routes/cards.js";
import { errorHandler } from "./middlewares/errorHandler.js";

mongoose.connect("mongodb://localhost:27017/aroundb");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(userrouter);
app.use(cardrouter);

app.use((req, res, next) => {
  const err = new Error("Recurso solicitado no encontrado");
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
