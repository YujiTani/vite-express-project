import express from "express";

import { createCourse, getCourses, getCoursesByQuestUuid } from "@/server/models/repositories/courseRepository.ts";
import { requestErrorHandler } from "@/server/models/repositories/helper.ts";

const router = express.Router();

router.get("/", requestErrorHandler(getCourses));
router.get("/:uuid/quests", requestErrorHandler(getCoursesByQuestUuid));
// router.get("/:uuid", requestErrorHandler(getCourseByUuid));
router.post("/:uuid", requestErrorHandler(createCourse));

export default router;
