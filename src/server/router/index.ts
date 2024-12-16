import express from "express";

import usersRouter from "@/server/router/users/index.ts";

const apiRouter = express.Router();
apiRouter.use('/users', usersRouter);

export { apiRouter };
