import express from "express";
import ViteExpress from "vite-express";

import { apiRouter } from "@/server/routers/index.ts";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);

// 404エラー
app.use((_req, res) => {
	return res.status(404).json({ message: "Invalid API route" });
});

ViteExpress.listen(app, 3005, () => console.log("Server is listening on port 3005..."));
