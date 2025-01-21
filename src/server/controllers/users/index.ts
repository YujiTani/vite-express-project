import { Request, Response } from "express";

import { User } from "@/server/types/controller/users.ts";
import { ApiController } from "@/server/types/common/index.ts";
import { Prisma, PrismaClient } from "@prisma/client";
import { handlePrismaError, logQuery } from "../helper.ts";

const prisma = new PrismaClient({
  // ログを出力する
  log: ['query', 'info', 'warn', 'error']}
);

// クエリイベントリスナーを追加
prisma.$on('query', logQuery)

/**
 * ユーザー一覧を取得する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー一覧
 */
export const getUsers: ApiController = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany(
      {
        where: {
          deletedAt: null
    },
    orderBy: {
      id: 'asc'
    },
    take: 50
    } 
  );
  return res.json(users);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

/**
 * ユーザーを取得する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー
 */
export const getUserById: ApiController = async (req: Request, res: Response) => {
  try{

    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
        deletedAt: null
      }
    });
    return res.json(user);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

/**
 * ユーザーを作成する
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザー
 */
export const registerUser: ApiController = async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender
      }
    })
    return res.status(201).json(newUser);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

/**
 * ユーザーの名前を更新する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 更新したユーザー
 */
export const updateUserName: ApiController = async (req: Request, res: Response) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { name: req.body.name }
    });
    return res.json(updatedUser);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

/**
 * ユーザーを更新する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 更新したユーザー
 */
export const updateUser: ApiController = async (req: Request, res: Response) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {id: Number(req.params.id)},
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
      }
    })
    return res.json(updatedUser);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

/**
 * ユーザーの削除フラグをたてる
 * @param req リクエスト
 * @param res レスポンス
 * @returns 削除フラグをたてたユーザー
 */
export const trashUser: ApiController = async (req: Request, res: Response) => {
  try {
    const trashedUser = await prisma.user.update({
      where: {id: Number(req.params.id)},
      data: {deletedAt: new Date()}
    })
    return res.json(trashedUser);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

/**
 * ユーザーの削除フラグを解除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 削除フラグを解除したユーザー
 */
export const restoreUser: ApiController = async (req: Request, res: Response) => {
  try {
    const restoredUser = await prisma.user.update({
      where: {id: Number(req.params.id)},
      data: {deletedAt: null}
    })
    return res.json(restoredUser);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

/**
 * ユーザーを完全削除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 完全削除したユーザー
 */
export const destroyUser: ApiController = async (req: Request, res: Response) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {id: Number(req.params.id)},
    })
    return res.json(deletedUser);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}