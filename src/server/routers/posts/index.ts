import express from "express";

import { validateRequest } from "@/server/validators/helper.ts";
import { validateId } from "@/server/validators/common/index.ts";
import { basicPostValidation, updatePostValidation } from "@/server/validators/posts/index.ts";
import { requestErrorHandler } from "@/server/controllers/helper.ts";
import { getPostById, getPosts, createPost, updatePost, deletePost } from "@/server/controllers/posts/index.ts";

const router = express.Router();

router.get('/', requestErrorHandler(getPosts));
router.get('/:id', [...validateId, validateRequest], requestErrorHandler(getPostById));
router.post('/', [...basicPostValidation, validateRequest], requestErrorHandler(createPost));
router.put('/:id', [...validateId, ...updatePostValidation, validateRequest], requestErrorHandler(updatePost));
router.delete('/:id', [...validateId, validateRequest], requestErrorHandler(deletePost));

export default router;
