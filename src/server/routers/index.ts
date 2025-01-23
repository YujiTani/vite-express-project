import express from "express";

import usersRouter from "@/server/routers/users/index.ts";
import postsRouter from "@/server/routers/posts/index.ts";
import questsRouter from '@/server/routers/quests/index.ts';

const apiRouter = express.Router();
apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/quests', questsRouter);

export { apiRouter };
