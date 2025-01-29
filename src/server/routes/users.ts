import express from "express";

import { requestErrorHandler } from "@/server/models/repositories/helper.ts";
import {
	createUserWithPost,
	destroyUser,
	getUserById,
	getUsers,
	registerUser,
	restoreUser,
	trashUser,
	updateUser,
	updateUserName,
} from "@/server/models/repositories/users/index.ts";
import { validateId } from "@/server/validators/common/index.ts";
import { validateRequest } from "@/server/validators/helper.ts";
import { basicPostValidation, createUserWithPostValidation } from "@/server/validators/posts/index.ts";
import { basicUserValidation, updateUserValidation } from "@/server/validators/users/index.ts";

const router = express.Router();

// routerはpath,validator,controllerの3つを設定する
router.get("/", requestErrorHandler(getUsers));
router.get("/:id", [...validateId, validateRequest], requestErrorHandler(getUserById));
router.post("/", [...basicUserValidation, validateRequest], requestErrorHandler(registerUser));
router.put("/:id", [...validateId, ...updateUserValidation, validateRequest], requestErrorHandler(updateUser));
router.patch("/:id", [...validateId, ...updateUserValidation, validateRequest], requestErrorHandler(updateUserName));
router.delete("/:id/trash", [...validateId, validateRequest], requestErrorHandler(trashUser));
router.patch("/:id/restore", [...validateId, validateRequest], requestErrorHandler(restoreUser));
router.delete("/:id", [...validateId, validateRequest], requestErrorHandler(destroyUser));
router.post(
	"/with-posts",
	[...basicUserValidation, ...createUserWithPostValidation, validateRequest],
	requestErrorHandler(createUserWithPost),
);

export default router;
