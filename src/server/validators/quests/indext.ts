import { body } from "express-validator";

export const basicQuestValidation = [
    body('name').notEmpty().withMessage('名前を入力してください'),
    body('name').isLength({ max: 60 }).withMessage('名前は60文字以内で入力してください'),
    body('name').isString().withMessage('名前は文字列で入力してください'),

    body('description').optional().isLength({ max: 255 }).withMessage('内容は255文字以内で入力してください'),
    body('description').optional().isString().withMessage('内容は文字列で入力してください'),
  
    body('state').optional().isNumeric().withMessage('コンテンツは数値で入力してください'),
    body('state').optional().isInt().withMessage('コンテンツは整数で入力してください'),
];

export const updateQuestValidation = [
    body('name').optional().notEmpty().withMessage('名前を入力してください'),
    body('name').optional().isLength({ max: 60 }).withMessage('名前は60文字以内で入力してください'),
    body('name').optional().isString().withMessage('名前は文字列で入力してください'),

    body('description').optional().isLength({ max: 255 }).withMessage('内容は255文字以内で入力してください'),
    body('description').optional().isString().withMessage('内容は文字列で入力してください'),
  
    body('state').optional().isNumeric().withMessage('コンテンツは数値で入力してください'),
    body('state').optional().isInt().withMessage('コンテンツは整数で入力してください'),
];