import { body } from 'express-validator';

export const basicPostValidation = [
  body('title').notEmpty().withMessage('タイトルを入力してください'),
  body('title').isLength({ max: 255 }).withMessage('タイトルは255文字以内で入力してください'),

  body('content').optional().isString().withMessage('コンテンツは文字列で入力してください'),
  
  body('published').optional().isBoolean().withMessage('公開状態は真偽値で入力してください'),
];

export const updatePostValidation = [
  body('title').optional().notEmpty().withMessage('タイトルを入力してください'),
  body('title').optional().isLength({ max: 255 }).withMessage('タイトルは255文字以内で入力してください'),

  body('content').optional().isString().withMessage('コンテンツは文字列で入力してください'),

  body('published').optional().isBoolean().withMessage('公開状態は真偽値で入力してください'),
];

export const createUserWithPostValidation = [
    body('posts.*.title').notEmpty().withMessage('タイトルを入力してください'),
    body('posts.*.title').isLength({ max: 255 }).withMessage('タイトルは255文字以内で入力してください'),
  
    body('posts.*.content').optional().isString().withMessage('コンテンツは文字列で入力してください'),
    
    body('posts.*.published').optional().isBoolean().withMessage('公開状態は真偽値で入力してください'),
]