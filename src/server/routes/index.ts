import express from "express";

import coursesRouter from "@/server/routes/courses.ts";
import postsRouter from "@/server/routes/posts.ts";
import questsRouter from "@/server/routes/quests.ts";
import usersRouter from "@/server/routes/users.ts";

const apiRouter = express.Router();
apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/quests", questsRouter);
apiRouter.use("/courses", coursesRouter);

export { apiRouter };
