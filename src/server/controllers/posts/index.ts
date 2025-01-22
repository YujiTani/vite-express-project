import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import { ApiController } from "@/server/types/common/index.ts";
import { handlePrismaError, logQuery } from "../helper.ts";
import { CreatePostRequest, UpdatePostRequest } from "@/server/types/controller/posts.ts";

const prisma  = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
})

prisma.$on('query', logQuery as (e: Prisma.QueryEvent) => void)

/**
 * 投稿一覧を取得する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 投稿一覧
 */
export const getPosts: ApiController = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany(
            {
                orderBy: {
                    id: 'asc'
                },
                take: 50
            }
        )
        return res.json(posts)
    } catch (error) {
        return handlePrismaError(error, res)
        
    }
}

/**
 * 投稿を取得する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 投稿
 */
export const getPostById: ApiController = async (req: Request, res: Response) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        return res.json(post)
    } catch (error) {
        return handlePrismaError(error, res)
    }
}

/**
 * 投稿を作成する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 作成された投稿
 */
export const createPost: ApiController = async (req: Request, res: Response) => {
    try {
        const post = await prisma.post.create({
            data: req.body as Prisma.PostCreateInput
        })
        return res.status(201).json(post)
    } catch (error) {
        return handlePrismaError(error, res)
    }
}

/**
 * 投稿を更新する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 更新された投稿
 */
export const updatePost: ApiController = async (req: Request, res: Response) => {
    try {
        const post = await prisma.post.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body as Prisma.PostUpdateInput
        })
        return res.json(post)
    } catch (error) {
        return handlePrismaError(error, res)
    }
}

/**
 * 投稿を削除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 削除された投稿
 */
export const deletePost: ApiController = async (req: Request, res: Response) => {
    try {
        await prisma.post.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        return res.status(204).send()
    } catch (error) {
        return handlePrismaError(error, res)
    }
}
