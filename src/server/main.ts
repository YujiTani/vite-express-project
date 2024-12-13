import express from "express";
import ViteExpress from "vite-express";

import { usersRouter } from "@/server/router/users/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: 大元にまとめたrouterを使うようにしたい
app.use('/api', usersRouter)

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
