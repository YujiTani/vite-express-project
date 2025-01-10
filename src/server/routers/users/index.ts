import express from "express";

import { validateRequest } from "@/server/validators/helper.ts";
import { validateId } from "@/server/validators/common/index.ts";
import { basicUserValidation, updateUserValidation } from "@/server/validators/users/index.ts";
import { requestErrorHandler } from "@/server/controllers/helper.ts";
import { deleteUser, getUserById, getUsers, registerUser, updateUser, updateUserName } from "@/server/controllers/users/index.ts";

const router = express.Router();

// routerはpath,validator,controllerの3つを設定する
router.get('/', requestErrorHandler(getUsers));
router.get('/:id', [...validateId, validateRequest], requestErrorHandler(getUserById));
router.post('/', [...basicUserValidation, validateRequest], requestErrorHandler(registerUser));
router.put('/:id', [...validateId, ...updateUserValidation, validateRequest], requestErrorHandler(updateUser));
router.patch('/:id', [...validateId, ...updateUserValidation, validateRequest], requestErrorHandler(updateUserName));
router.delete('/:id', [...validateId, validateRequest], requestErrorHandler(deleteUser));

export default router;
