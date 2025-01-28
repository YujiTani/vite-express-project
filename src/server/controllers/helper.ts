import { Prisma } from "@prisma/client";
import type { Request, Response } from "express";

import type { ApiController } from "@/server/types/common/index.ts";

export const requestErrorHandler = (controller: ApiController) => {
	return async (req: Request, res: Response) => {
		try {
			return await controller(req, res);
		} catch (error) {
			return res.status(500).json({ message: "Internal Server Error" });
		}
	};
};

/**
 * Prismaのエラーを適切なHTTPレスポンスに変換する
 * @param error エラーオブジェクト
 * @param res レスポンス
 */
export const handlePrismaError = (error: any, res: Response) => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		switch (error.code) {
			case "P2002":
				// ユニーク制約違反（例：既存のメールアドレス）
				return res.status(409).json({
					message: "一意性制約に違反しています",
					field: error.meta?.target,
				});

			case "P2025":
				return res.status(404).json({
					message: "リソースが見つかりません",
				});
			case "P2003":
				// 外部キー制約違反
				return res.status(400).json({
					message: "関連するリソースが存在しません",
					field: error.meta?.field_name,
				});

			case "P2014":
				// 関係の制約違反
				return res.status(400).json({
					message: "リレーションの制約に違反しています",
				});

			case "P2021":
				// テーブルが存在しない
				return res.status(500).json({
					message: "データベース構造に問題があります",
				});

			case "P2000":
				// 入力値の制約違反
				return res.status(400).json({
					message: "入力値が制約に違反しています",
					field: error.meta?.target,
				});

			default:
				// その他のPrismaエラー
				return res.status(400).json({
					message: error.message,
				});
		}
	}

	// 予期せぬエラー
	return res.status(500).json({
		message: "サーバー内部エラーが発生しました",
	});
};

/**
 * SQLクエリをログ出力する
 * @param e クエリイベント
 */
export const logQuery = (e: Prisma.QueryEvent) => {
	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
	console.log(`Query: ${formatQuery(e.query)}`);
	console.log(`Params: ${e.params}`);
	console.log(`Duration: ${e.duration}ms`);
	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
};

/**
 * SQLクエリをフォーマットする
 * @param sql SQLクエリ
 * @returns フォーマットされたSQLクエリ
 */
function formatQuery(sql: string): string {
	return sql
		.replace(/SELECT/g, "\nSELECT")
		.replace(/FROM/g, "\nFROM")
		.replace(/WHERE/g, "\nWHERE")
		.replace(/ORDER BY/g, "\nORDER BY")
		.replace(/LIMIT/g, "\nLIMIT")
		.replace(/OFFSET/g, "\nOFFSET")
		.replace(/,/g, ",\n    ");
}
