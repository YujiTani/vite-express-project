import express from "express";

import { getUsers, getUserById, registerUser, updateUser, updateUserName, deleteUser } from "@/server/controller/users/index.js";
import { validateRequest } from "@/server/validator/helper.js";
import { validateId } from "@/server/validator/common/index.js";
import { basicUserValidation, updateUserValidation } from "@/server/validator/users/index.js";

const router = express.Router();

// routerはpath,validator,controllerの3つを設定する
router.get('/', getUsers);
router.get('/:id', [...validateId, validateRequest], getUserById);
router.post('/', [...basicUserValidation, validateRequest], registerUser);
router.put('/:id', [...validateId, ...updateUserValidation, validateRequest], updateUser);
router.patch('/:id', [...validateId, ...updateUserValidation, validateRequest], updateUserName);
router.delete('/:id', [...validateId, validateRequest], deleteUser);

export { router as usersRouter };
