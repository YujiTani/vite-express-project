import { requestErrorHandler } from "@/server/controllers/helper.ts";
import { createQuest, destroyQuestByUuid, getQuestById, getQuests, restoreQuestByUuid, trashQuestByUuid, updateQuestByUuid } from "@/server/controllers/quests/index.ts";
import { validateRequest } from "@/server/validators/helper.ts";
import { basicQuestValidation } from "@/server/validators/quests/indext.ts";
import express from "express";

const router = express.Router();

router.get('/', requestErrorHandler(getQuests));
router.get('/:id', requestErrorHandler(getQuestById));
router.post('/',[...basicQuestValidation, validateRequest], requestErrorHandler(createQuest));
router.put('/:uuid', [...basicQuestValidation, validateRequest], requestErrorHandler(updateQuestByUuid));
router.delete('/:uuid/trash', requestErrorHandler(trashQuestByUuid));
router.put('/:uuid/restore', requestErrorHandler(restoreQuestByUuid));
router.delete('/:uuid', requestErrorHandler(destroyQuestByUuid));

export default router;
