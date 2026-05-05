import express from "express";
import mongoose from "mongoose";
import { login, createUser } from "./controllers/users.js";

import userrouter from "./routes/users.js";
import cardrouter from "./routes/cards.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/logger.js";
import cors from "cors";

mongoose.connect("mongodb://localhost:27017/aroundb");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.url,
    date: new Date().toISOString(),
  });
  next();
});

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
