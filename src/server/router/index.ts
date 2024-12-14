import express from "express";

import { usersRouter } from "@/server/router/users/index.ts";

const router = express.Router();

router.use('/users', usersRouter);

export { router as apiRoutes };