import express from "express";
import {body, param, validationResult} from 'express-validator';

import { getUsers, getUserById, registerUser, updateUser, updateUserName, deleteUser } from "@/server/controller/users/index.js";
import { validateRequest } from "@/server/validator/helper.js";

const router = express.Router();

router.get('/users', getUsers);

router.get('/users/:id', [
  param('id').isInt().withMessage('ID must be an integer')
], validateRequest, getUserById);
router.post('/users',[
 body('name').notEmpty().withMessage('Name is required'),
 body('name').isLength({max: 60}).withMessage('Name must be within 60 characters'),
 
 body('email').notEmpty().withMessage('Email is required'),
 body('email').isEmail().withMessage('Invalid email format'),

 body('age').notEmpty().withMessage('Age is required'),
 body('age').isInt().withMessage('Age must be an integer'),
 body('age').isInt({min: 0}).withMessage('Age must be greater than 0'),

 body('gender').notEmpty().withMessage('Gender is required'),
 body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
], validateRequest, registerUser);
router.put('/users/:id', [
  param('id').isInt().withMessage('ID must be an integer'),
  
  body('name').notEmpty().withMessage('Name is required'),
  body('name').isLength({max: 60}).withMessage('Name must be within 60 characters'),
  
  body('email').notEmpty().withMessage('Email is required'),
  body('email').isEmail().withMessage('Invalid email format'),
 
  body('age').notEmpty().withMessage('Age is required'),
  body('age').isInt().withMessage('Age must be an integer'),
  body('age').isInt({min: 0}).withMessage('Age must be greater than 0'),
 
  body('gender').notEmpty().withMessage('Gender is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
], validateRequest, updateUser);
router.patch('/users/:id',[
  param('id').isInt().withMessage('ID must be an integer'),
  body('name').notEmpty().withMessage('Name is required'),
  body('name').isLength({max: 60}).withMessage('Name must be within 60 characters'),
], validateRequest, updateUserName);
router.delete('/users/:id', [
  param('id').isInt().withMessage('ID must be an integer'),
], validateRequest, deleteUser);

export { router as usersRouter };
