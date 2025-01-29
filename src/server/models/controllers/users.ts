import type { Request, Response } from "express";

import * as userUsecase from "@/server/models/usecases/users.ts";
import type { RequestFind } from "@/server/types/common/index.ts";

/**
 * GET /users
 * ユーザー一覧を取得する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー一覧
 */
export const getUsers = async (req: Partial<RequestFind>, res: Response): Promise<Response> => {
	const request = {
		query: req.query,
		limit: Number(req.query?.limit),
		offset: Number(req.query?.offset),
	};

	return await userUsecase.getAll(request, res);
};

/**
 * GET /users/:id
 * ユーザーを取得する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー
 */
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
	return await userUsecase.get(req, res);
};

/**
 * POST /users
 * ユーザーを作成する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー
 */
export const createUser = async (req: Request, res: Response): Promise<Response> => {
	return await userUsecase.create(req, res);
};

/**
 * PUT /users/:id
 * ユーザーを更新する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー
 */
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
	return await userUsecase.update(req, res);
};

/**
 * DELETE /users/:id/trash
 * ユーザーを論理削除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const trashUser = async (req: Request, res: Response): Promise<Response> => {
	return await userUsecase.trash(req, res);
};

/**
 * PUT /users/:id/restore
 * ユーザーを復元する
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const restoreUser = async (req: Request, res: Response): Promise<Response> => {
	return await userUsecase.restore(req, res);
};

/**
 * DELETE /users/:id
 * ユーザーを物理削除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const destroyUser = async (req: Request, res: Response): Promise<Response> => {
	return await userUsecase.destroy(req, res);
};

/**
 * POST /users/with-posts
 * ユーザーと投稿を作成する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー
 */
export const createUserWithPost = async (req: Request, res: Response): Promise<Response> => {
	return await userUsecase.createWithPost(req, res);
};
