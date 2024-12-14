import express from "express";

import { getUsers, getUserById, registerUser, updateUser, updateUserName, deleteUser } from "@/server/controller/users/index.js";
import { validateRequest } from "@/server/validator/helper.js";
import { validateId } from "@/server/validator/common/index.js";
import { basicUserValidation, updateUserValidation } from "@/server/validator/users/index.js";
import { requestErrorHandler } from "@/server/router/helper.js";

const router = express.Router();

// routerはpath,validator,controllerの3つを設定する
router.get('/', requestErrorHandler(getUsers));
router.get('/:id', [...validateId, validateRequest], requestErrorHandler(getUserById));
router.post('/', [...basicUserValidation, validateRequest], requestErrorHandler(registerUser));
router.put('/:id', [...validateId, ...updateUserValidation, validateRequest], requestErrorHandler(updateUser));
router.patch('/:id', [...validateId, ...updateUserValidation, validateRequest], requestErrorHandler(updateUserName));
router.delete('/:id', [...validateId, validateRequest], requestErrorHandler(deleteUser));

export { router as usersRouter };
