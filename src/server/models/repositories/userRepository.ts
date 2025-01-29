import { type Prisma, PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

import { handlePrismaError, logQuery } from "@/server/models/repositories/helper.ts";
import type { ApiController } from "@/server/types/common/index.ts";

const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

// @ts-ignore
prisma.$on("query", logQuery);

/**
 * ユーザー一覧を取得する
 * @param limit 取得件数
 * @param offset 取得開始位置
 * @returns ユーザー一覧
 */
export const findAll = async (limit: number, offset: number) => {
	return await prisma.user.findMany({
		where: {
			deletedAt: null,
		},
		orderBy: {
			id: "asc",
		},
		take: limit,
		skip: offset,
	});
};

/**
 * ユーザーを取得する
 * @param id ユーザーID
 * @returns ユーザー
 */
export const find = async (id: number) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
			deletedAt: null,
		},
	});

	if (user === null) {
		// 見つからなかった
		return null;
	}

	return user;
};

/**
 * ユーザーを作成する
 * @param data ユーザー作成データ
 * @returns ユーザー
 */
export const create = async (data: Prisma.UserCreateInput) => {
	return await prisma.user.create({
		data,
	});
};

/**
 * ユーザーを更新する
 * @param id ユーザーID
 * @param data ユーザー更新データ
 * @returns 更新したユーザー
 */
export const update = async (id: number, data: Prisma.UserUpdateInput) => {
	const updatedUser = await prisma.user.update({
		where: { id },
		data: data,
	});

	if (!updatedUser) {
		// 見つからなかった
		return null;
	}

	return updatedUser;
};

/**
 * ユーザーの削除フラグをたてる
 * @param id ユーザーID
 * @returns 削除フラグをたてたユーザー
 */
export const trash = async (id: number) => {
	const trashedUser = await prisma.user.update({
		where: { id },
		data: { deletedAt: new Date() },
	});

	if (!trashedUser) {
		// 見つからなかった
		return null;
	}

	return trashedUser;
};

/**
 * ユーザーの削除フラグを解除する
 * @param id ユーザーID
 * @returns 削除フラグを解除したユーザー
 */
export const restore = async (id: number) => {
	const restoredUser = await prisma.user.update({
		where: { id },
		data: { deletedAt: null },
	});

	if (!restoredUser) {
		// 見つからなかった
		return null;
	}

	return restoredUser;
};

/**
 * ユーザーを完全削除する
 * @param id ユーザーID
 * @returns 完全削除したユーザー
 */
export const destroy = async (id: number) => {
	const deletedUser = await prisma.user.delete({
		where: { id },
	});

	if (!deletedUser) {
		// 見つからなかった
		return null;
	}

	return deletedUser;
};

/**
 * ユーザー作成時に投稿作成する
 * @param data ユーザー作成データ
 * @returns 作成されたユーザー
 */
export const createWithPost = async (data: Prisma.UserCreateInput) => {
	if (!data.posts) {
		return null;
	}

	const user = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			age: data.age,
			gender: data.gender,
			role: data.role,
			posts: {
				create: (data.posts as Prisma.PostCreateInput[]).map((post) => ({
					title: post.title,
					content: post.content,
					published: post.published,
				})),
			},
		},
	});

	if (!user) {
		return null;
	}

	return user;
};
