import express from "express";

import { getUsers, getUserById, registerUser, updateUser, updateUserName, deleteUser } from "@/server/controller/users/index.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', registerUser);
router.put('/users/:id', updateUser);
router.patch('/users/:id', updateUserName);
router.delete('/users/:id', deleteUser);

export { router as usersRouter };
