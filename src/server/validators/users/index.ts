import { body, param } from "express-validator";

export const basicUserValidation = [
	body("name").notEmpty().withMessage("ユーザー名を入力してください"),
	body("name").isLength({ max: 60 }).withMessage("ユーザー名は60文字以内で入力してください"),

	body("email").notEmpty().withMessage("メールアドレスを入力してください"),
	body("email").isEmail().withMessage("メールアドレスの形式が正しくありません"),

	body("age").notEmpty().withMessage("年齢を入力してください"),
	body("age").isInt().withMessage("年齢を整数で入力してください"),
	body("age").isInt({ min: 0 }).withMessage("年齢は0歳以上で入力してください"),

	body("gender").notEmpty().withMessage("性別を選択してください"),
	body("gender").isIn(["male", "female", "other"]).withMessage("無効ではない性別を選択してください"),
];

export const updateUserValidation = [
	body("name").optional().notEmpty().withMessage("ユーザー名を入力してください"),
	body("name").optional().isLength({ max: 60 }).withMessage("ユーザー名は60文字以内で入力してください"),

	body("email").optional().notEmpty().withMessage("メールアドレスを入力してください"),
	body("email").optional().isEmail().withMessage("メールアドレスの形式が正しくありません"),

	body("age").optional().notEmpty().withMessage("年齢を入力してください"),
	body("age").optional().isInt().withMessage("年齢を整数で入力してください"),
	body("age").optional().isInt({ min: 0 }).withMessage("年齢は0歳以上で入力してください"),

	body("gender").optional().notEmpty().withMessage("性別を選択してください"),
	body("gender").optional().isIn(["male", "female", "other"]).withMessage("無効ではない性別を選択してください"),
];
