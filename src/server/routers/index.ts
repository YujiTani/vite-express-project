import express from "express";

import usersRouter from "@/server/routers/users/index.ts";
import postsRouter from "@/server/routers/posts/index.ts";

const apiRouter = express.Router();
apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);

export { apiRouter };
