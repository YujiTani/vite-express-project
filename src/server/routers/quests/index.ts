
import { requestErrorHandler } from "@/server/controllers/helper.ts";
import { createQuest, getQuestById, getQuests, updateQuestByUuid } from "@/server/controllers/quests/index.ts";
import express from "express";

const router = express.Router();

router.get('/', requestErrorHandler(getQuests));
router.get('/:id', requestErrorHandler(getQuestById));
router.post('/', requestErrorHandler(createQuest));
router.put('/:uuid', requestErrorHandler(updateQuestByUuid));

export default router;
