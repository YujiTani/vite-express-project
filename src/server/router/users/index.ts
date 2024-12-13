import express from "express";
import {body, param, validationResult} from 'express-validator';

import { getUsers, getUserById, registerUser, updateUser, updateUserName, deleteUser } from "@/server/controller/users/index.js";
import { validateRequest } from "@/server/validator/helper.js";

const router = express.Router();

router.get('/users', getUsers);

router.get('/users/:id', [
  param('id').isInt().withMessage('IDは整数でなければなりません')
], validateRequest, getUserById);
router.post('/users',[
 body('name').notEmpty().withMessage('名前は必須です'),
 body('name').isLength({max: 60}).withMessage('名前は60文字以内でなければなりません'),
 
 body('email').notEmpty().withMessage('メールアドレスは必須です'),
 body('email').isEmail().withMessage('メールアドレスの形式が正しくありません'),

 body('age').notEmpty().withMessage('年齢は必須です'),
 body('age').isInt().withMessage('年齢は整数でなければなりません'),
 body('age').isInt({min: 0}).withMessage('年齢は0以上でなければなりません'),

 body('gender').notEmpty().withMessage('性別は必須です'),
 body('gender').isIn(['male', 'female', 'other']).withMessage('性別が無効です'),
], validateRequest, registerUser);
router.put('/users/:id', [
  param('id').isInt().withMessage('IDは整数でなければなりません'),
  
  body('name').notEmpty().withMessage('名前は必須です'),
  body('name').isLength({max: 60}).withMessage('名前は60文字以内でなければなりません'),
  
  body('email').notEmpty().withMessage('メールアドレスは必須です'),
  body('email').isEmail().withMessage('メールアドレスの形式が正しくありません'),
 
  body('age').notEmpty().withMessage('年齢は必須です'),
  body('age').isInt().withMessage('年齢は整数でなければなりません'),
  body('age').isInt({min: 0}).withMessage('年齢は0以上でなければなりません'),
 
  body('gender').notEmpty().withMessage('性別は必須です'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('性別が無効です'),
], validateRequest, updateUser);
router.patch('/users/:id',[
  param('id').isInt().withMessage('IDは整数でなければなりません'),
  body('name').notEmpty().withMessage('名前は必須です'),
  body('name').isLength({max: 60}).withMessage('名前は60文字以内でなければなりません'),
], validateRequest, updateUserName);
router.delete('/users/:id', [
  param('id').isInt().withMessage('IDは整数でなければなりません'),
], validateRequest, deleteUser);

export { router as usersRouter };
