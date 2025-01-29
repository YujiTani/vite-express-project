import type { Prisma } from "@prisma/client";

/**
 * ユーザー作成
 * @param name ユーザー名
 * @param email メールアドレス
 * @param age 年齢
 * @param gender 性別
 * @param role 役割
 * @param posts ユーザーに紐づく投稿
 */
export interface RequestCreateUser {
	name: string;
	email: string;
	age: number;
	gender: string;
	role: string;
	posts: Prisma.PostCreateInput[];
}
