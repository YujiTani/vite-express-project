import express from "express";
import ViteExpress from "vite-express";

import { apiRoutes } from "@/server/router/index.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes)

// 404エラー
app.use((req, res) => {
  res.status(404).json({ message: 'page not found' });
})

ViteExpress.listen(app, 3005, () =>
  console.log("Server is listening on port 3005..."),
);
