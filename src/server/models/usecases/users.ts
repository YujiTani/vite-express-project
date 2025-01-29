import type { Request, Response } from "express";
import { v7 as uuidv7 } from "uuid";

import { handlePrismaError } from "@/server/models/repositories/helper.ts";
import * as userRepository from "@/server/models/repositories/userRepository.ts";
import type { ApiController, RequestFind } from "@/server/types/common/index.ts";

/**
 * ユーザー一覧を取得する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー一覧
 */
export const getAll: ApiController = async (req: RequestFind, res) => {
	try {
		const limit = req.limit ?? 50;
		const offset = req.offset ?? 0;
		const users = await userRepository.findAll(req.query, limit, offset);

		const response = {
			response_id: uuidv7(),
			users: users.map((user) => ({
				id: user.id,
				name: user.name,
				email: user.email,
				age: user.age,
				gender: user.gender,
				role: user.role,
			})),
			count: users.length,
			limit,
			offset,
		};

		return res.json(response);
	} catch (error) {
		return handlePrismaError(error, res);
	}
};

/**
 * ユーザーを取得する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー
 */
export const get: ApiController = async (req, res) => {
	try {
		const user = await userRepository.find(Number(req.params.id));

		if (!user) {
			return res.status(404).json({
				response_id: uuidv7(),
				message: "リソースが見つかりません",
			});
		}

		const response = {
			response_id: uuidv7(),
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				age: user.age,
				gender: user.gender,
				role: user.role,
			},
		};
		return res.json(response);
	} catch (error) {
		return handlePrismaError(error, res);
	}
};

/**
 * ユーザーを作成する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー
 */
export const create: ApiController = async (req, res) => {
	try {
		const createdUser = await userRepository.create(req.body);

		const response = {
			response_id: uuidv7(),
			user: {
				id: createdUser.id,
				name: createdUser.name,
				email: createdUser.email,
				age: createdUser.age,
				gender: createdUser.gender,
				role: createdUser.role,
			},
		};

		return res.status(201).json(response);
	} catch (error) {
		return handlePrismaError(error, res);
	}
};

/**
 * ユーザーを更新する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 更新したユーザー
 */
export const update: ApiController = async (req, res) => {
	try {
		const updatedUser = await userRepository.update(Number(req.params.id), req.body);

		if (!updatedUser) {
			return res.status(404).json({
				response_id: uuidv7(),
				message: "リソースが見つかりません",
			});
		}

		const response = {
			response_id: uuidv7(),
			user: {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				age: updatedUser.age,
				gender: updatedUser.gender,
				role: updatedUser.role,
			},
		};

		return res.json(response);
	} catch (error) {
		return handlePrismaError(error, res);
	}
};

/**
 * ユーザーの削除フラグをたてる
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const trash: ApiController = async (req, res) => {
	try {
		const trashedUser = await userRepository.trash(Number(req.params.id));

		if (!trashedUser) {
			return res.status(404).json({
				response_id: uuidv7(),
				message: "リソースが見つかりません",
			});
		}

		return res.status(204).send();
	} catch (error) {
		return handlePrismaError(error, res);
	}
};

/**
 * ユーザーの削除フラグを解除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const restore: ApiController = async (req, res) => {
	try {
		const restoredUser = await userRepository.restore(Number(req.params.id));

		if (!restoredUser) {
			return res.status(404).json({
				response_id: uuidv7(),
				message: "リソースが見つかりません",
			});
		}

		return res.status(204).send();
	} catch (error) {
		return handlePrismaError(error, res);
	}
};

/**
 * ユーザーを完全削除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const destroy: ApiController = async (req, res) => {
	try {
		const deletedUser = await userRepository.destroy(Number(req.params.id));

		if (!deletedUser) {
			return res.status(404).json({
				response_id: uuidv7(),
				message: "リソースが見つかりません",
			});
		}

		return res.status(204).send();
	} catch (error) {
		return handlePrismaError(error, res);
	}
};

/**
 * ユーザー作成時に投稿作成する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 作成されたユーザー,作成された投稿
 */
export const createWithPost: ApiController = async (req, res) => {
	try {
		const user = await userRepository.createWithPost(req.body);

		if (!user) {
			return res.status(404).json({
				response_id: uuidv7(),
				message: "リソースが見つかりません",
			});
		}

		return res.status(201).json({ user });
	} catch (error) {
		return handlePrismaError(error, res);
	}
};
