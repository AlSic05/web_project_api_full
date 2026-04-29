import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/aroundb");

import userrouter from "./routes/users.js";
import cardrouter from "./routes/cards.js";

const app = express();
const PORT = 3000;

app.use(express.json());

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

app.use((req, res, next) => {
  req.user = {
    _id: "69d3d3bcaf75603d3792d4e1",
  };

  next();
});
