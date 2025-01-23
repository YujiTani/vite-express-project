import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { v7 as uuidv7 } from 'uuid'

import { ApiController } from '@/server/types/common/index.ts'
import { handlePrismaError, logQuery } from '../helper.ts'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

prisma.$on('query', logQuery)

/**
 * クエスト一覧を取得
 * @param req リクエスト
 * @param res レスポンス
 * @returns クエスト一覧
 */
export const getQuests: ApiController = async (req: Request, res: Response) => {
  try {
      const quests = await prisma.quest.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        id: 'asc',
      },
      take: 50,
    })
    return res.json(quests)
  } catch (error) {
    return handlePrismaError(error, res)
  }
}

/**
 * クエストを取得
 * @param req リクエスト
 * @param res レスポンス
 * @returns クエスト
 */
export const getQuestById: ApiController = async (req: Request, res: Response) => {
    try {
    const quest = await prisma.quest.findUnique({
        where: {
            id: Number(req.params.id),
            deletedAt: null
        }
    })
    return res.json(quest)
    } catch (error) {
       return handlePrismaError(error, res)
    }
}

/**
 * クエストを作成
 * @param req リクエスト
 * @param res レスポンス
 * @returns 作成したクエスト
 */
export const createQuest: ApiController = async (req: Request, res: Response) => {
  try {
    const uuid = uuidv7()
    const newQuest = await prisma.quest.create({
      data: {
        ...req.body,
        uuid,
      } as Prisma.QuestCreateInput,
    })
    return res.status(201).json(newQuest)
  } catch (error) {
    return handlePrismaError(error, res)
  }
}

/**
 * 指定したクエストの更新
 * @param req リクエスト
 * @param res レスポンス
 * @returns 更新したクエスト
 */
export const updateQuestByUuid: ApiController = async (req: Request, res: Response) => {
    try {
      console.log('body:', req.body)
        const updatedQuest = await prisma.quest.update({
            where: {
                uuid: String(req.params.uuid),
            },
            data: req.body as Prisma.QuestUpdateInput,
        })
        return res.json(updatedQuest)
    } catch (error) {
        return handlePrismaError(error, res)
    }
}

/**
 * クエストの削除フラグを立てる
 * @param req リクエスト
 * @param res レスポンス
 * @returns 削除フラグを立てたクエスト
 */
export const trashQuestByUuid: ApiController = async (req: Request, res: Response) => {
  try {
    const trashedQuest = await prisma.quest.update({
      where: {
        uuid: String(req.params.uuid),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    })
    return res.json(trashedQuest)
  } catch (error) {
    return handlePrismaError(error, res)
  }
}

/**
 * クエストの削除フラグを解除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns 削除フラグを解除したクエスト
 */
export const restoreQuestByUuid: ApiController = async (req: Request, res: Response) => {
  try {
    const restoredQuest = await prisma.quest.update({
      where: {
        uuid: String(req.params.uuid),
        deletedAt: {
          not: null,
        },
      },
      data: {
        deletedAt: null,
      },
    })
    return res.json(restoredQuest)
  } catch (error) {
    return handlePrismaError(error, res)
  }
}    

/**
 * クエストを完全削除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const destroyQuestByUuid: ApiController = async (req: Request, res: Response) => {
  try {
    const destroyedQuest = await prisma.quest.delete({
      where: {
        uuid: String(req.params.uuid),
      },
    })
    return res.status(204).send()
  } catch (error) {
    return handlePrismaError(error, res)
  }
}
