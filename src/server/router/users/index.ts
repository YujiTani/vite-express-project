import express from "express";

import { getUsers, getUserById, registerUser, updateUser, updateUserName, deleteUser } from "@/server/controller/users/index.js";
import { validateRequest } from "@/server/validator/helper.js";
import { validateId } from "@/server/validator/common/index.js";
import { basicUserValidation, updateUserValidation } from "@/server/validator/users/index.js";

const router = express.Router();

router.get('/users', getUsers);

router.get(
  '/users/:id', 
  [
    ...validateId
  ], 
  validateRequest, 
  getUserById
);

router.post(
  '/users',
  [
    ...basicUserValidation,
  ], 
  validateRequest, 
  registerUser
);

router.put(
  '/users/:id', 
  [
    ...validateId,
    ...updateUserValidation,
  ], 
  validateRequest, 
  updateUser
);

router.patch(
  '/users/:id',
  [
    ...validateId,
    ...updateUserValidation,
  ], 
  validateRequest, 
  updateUserName
);

router.delete(
  '/users/:id',
  [
    ...validateId,
  ], 
  validateRequest, 
  deleteUser
);

export { router as usersRouter };
