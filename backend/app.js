import express from "express";
import mongoose from "mongoose";
import { login, createUser } from "./controllers/users.js";

import userrouter from "./routes/users.js";
import cardrouter from "./routes/cards.js";

mongoose.connect("mongodb://localhost:27017/aroundb");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(userrouter);
app.use(cardrouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
