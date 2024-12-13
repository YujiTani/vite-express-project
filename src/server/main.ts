import express from "express";
import ViteExpress from "vite-express";

import { apiRouter } from "@/server/router/index.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRouter)

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 3005, () =>
  console.log("Server is listening on port 3005..."),
);
