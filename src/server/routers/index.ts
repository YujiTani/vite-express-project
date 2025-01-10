import express from "express";

import usersRouter from "@/server/routers/users/index.ts";

const apiRouter = express.Router();
apiRouter.use('/users', usersRouter);

export { apiRouter };
