import express from "express";

import { validateRequest } from "@/server/middlewares/validation.ts";
import { requestErrorHandler } from "@/server/models/repositories/helper.ts";
import {
	createQuest,
	destroyQuestByUuid,
	getQuestById,
	getQuests,
	restoreQuestByUuid,
	trashQuestByUuid,
	updateQuestByUuid,
} from "@/server/models/repositories/questRepository.ts";
import { basicQuestValidation } from "@/server/validators/quests/indext.ts";

const router = express.Router();

router.get("/", requestErrorHandler(getQuests));
router.get("/:id", requestErrorHandler(getQuestById));
router.post("/", [...basicQuestValidation, validateRequest], requestErrorHandler(createQuest));
router.put("/:uuid", [...basicQuestValidation, validateRequest], requestErrorHandler(updateQuestByUuid));
router.delete("/:uuid/trash", requestErrorHandler(trashQuestByUuid));
router.put("/:uuid/restore", requestErrorHandler(restoreQuestByUuid));
router.delete("/:uuid", requestErrorHandler(destroyQuestByUuid));

export default router;
