import type { Request, Response } from "express";

export type ApiController<TReq extends Request = Request, TRes extends Response = Response> = (
	req: TReq,
	res: TRes,
) => Promise<TRes>;

// used
// default
// const defaultController: ApiController = async (req, res) => { ... }

// custom
// interface CustomRequest extends Request {
//     customField: string;
// }

// interface CustomResponse extends Response {
//     customMethod(): void;
// }

// const customController: ApiController<CustomRequest, CustomResponse> = async (req, res) => { ... }

/**
 * 検索の基本クエリ
 * @param query 検索条件
 * @param limit 取得件数
 * @param offset 取得開始位置
 */
export type RequestFind = {
	query: Record<string, string>;
	limit: number;
	offset: number;
};
