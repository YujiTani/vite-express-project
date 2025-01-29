import express from "express";

import { validateRequest } from "@/server/middlewares/validation.ts";
import { requestErrorHandler } from "@/server/models/repositories/helper.ts";
import { validateId, validateQuery } from "@/server/validators/common/index.ts";
import { createUserWithPostValidation } from "@/server/validators/posts/index.ts";
import { basicUserValidation, updateUserValidation } from "@/server/validators/users/index.ts";
import * as userController from "../models/controllers/users.ts";

const router = express.Router();

// routerはpath,validator,controllerの3つを設定する
router.get("/", [...validateQuery, validateRequest], requestErrorHandler(userController.getUsers));
router.get("/:id", [...validateId, validateRequest], requestErrorHandler(userController.getUserById));
router.post("/", [...basicUserValidation, validateRequest], requestErrorHandler(userController.createUser));
router.put(
	"/:id",
	[...validateId, ...updateUserValidation, validateRequest],
	requestErrorHandler(userController.updateUser),
);
router.delete("/:id/trash", [...validateId, validateRequest], requestErrorHandler(userController.trashUser));
router.put("/:id/restore", [...validateId, validateRequest], requestErrorHandler(userController.restoreUser));
router.delete("/:id", [...validateId, validateRequest], requestErrorHandler(userController.destroyUser));
router.post(
	"/with-posts",
	[...basicUserValidation, ...createUserWithPostValidation, validateRequest],
	requestErrorHandler(userController.createUserWithPost),
);

export default router;
