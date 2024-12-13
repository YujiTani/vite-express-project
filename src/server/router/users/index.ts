import express from "express";

import { getUsers, getUserById, registerUser, updateUserName, deleteUser } from "@/server/controller/users/index.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', registerUser);
router.patch('/users/:id', updateUserName);
router.delete('/users/:id', deleteUser);

export { router as usersRouter };
