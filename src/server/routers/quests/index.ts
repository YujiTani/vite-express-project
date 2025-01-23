import { requestErrorHandler } from "@/server/controllers/helper.ts";
import { createQuest, destroyQuestByUuid, getQuestById, getQuests, restoreQuestByUuid, trashQuestByUuid, updateQuestByUuid } from "@/server/controllers/quests/index.ts";
import express from "express";

const router = express.Router();

router.get('/', requestErrorHandler(getQuests));
router.get('/:id', requestErrorHandler(getQuestById));
router.post('/', requestErrorHandler(createQuest));
router.put('/:uuid', requestErrorHandler(updateQuestByUuid));
router.delete('/:uuid/trash', requestErrorHandler(trashQuestByUuid));
router.put('/:uuid/restore', requestErrorHandler(restoreQuestByUuid));
router.delete('/:uuid', requestErrorHandler(destroyQuestByUuid));    

export default router;
