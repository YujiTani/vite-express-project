import express from "express";

import { getUsers, getUserById, registerUser, updateUser, updateUserName, deleteUser } from "@/server/controller/users/index.ts";
import { validateRequest } from "@/server/validator/helper.ts";
import { validateId } from "@/server/validator/common/index.ts";
import { basicUserValidation, updateUserValidation } from "@/server/validator/users/index.ts";
import { requestErrorHandler } from "@/server/controller/helper.ts";

const router = express.Router();

// routerはpath,validator,controllerの3つを設定する
router.get('/', requestErrorHandler(getUsers));
router.get('/:id', [...validateId, validateRequest], requestErrorHandler(getUserById));
router.post('/', [...basicUserValidation, validateRequest], requestErrorHandler(registerUser));
router.put('/:id', [...validateId, ...updateUserValidation, validateRequest], requestErrorHandler(updateUser));
router.patch('/:id', [...validateId, ...updateUserValidation, validateRequest], requestErrorHandler(updateUserName));
router.delete('/:id', [...validateId, validateRequest], requestErrorHandler(deleteUser));

export default router;