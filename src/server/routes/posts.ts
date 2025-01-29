import express from "express";

import { requestErrorHandler } from "@/server/models/repositories/helper.ts";
import {
	createPost,
	deletePost,
	getPostById,
	getPosts,
	updatePost,
} from "@/server/models/repositories/postRepository.ts";
import { validateId } from "@/server/validators/common/index.ts";
import { validateRequest } from "@/server/validators/helper.ts";
import { basicPostValidation, updatePostValidation } from "@/server/validators/posts/index.ts";

const router = express.Router();

router.get("/", requestErrorHandler(getPosts));
router.get("/:id", [...validateId, validateRequest], requestErrorHandler(getPostById));
router.post("/", [...basicPostValidation, validateRequest], requestErrorHandler(createPost));
router.put("/:id", [...validateId, ...updatePostValidation, validateRequest], requestErrorHandler(updatePost));
router.delete("/:id", [...validateId, validateRequest], requestErrorHandler(deletePost));

export default router;
