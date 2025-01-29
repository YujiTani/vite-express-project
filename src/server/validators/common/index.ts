import { param, query } from "express-validator";

/**
 * idのバリデーション
 * @param id id
 */
export const validateId = [param("id").isInt().withMessage("IDは整数でなければなりません")];

/**
 * query,limit,offsetのバリデーション
 * @param query 検索条件
 * @param limit 取得件数
 * @param offset 取得開始位置
 */
export const validateQuery = [
	query("query").optional().isObject().withMessage("検索条件はオブジェクトでなければなりません"),
	query("limit").optional().isInt().withMessage("取得件数は整数でなければなりません"),
	query("offset").optional().isInt().withMessage("取得開始位置は整数でなければなりません"),
];
