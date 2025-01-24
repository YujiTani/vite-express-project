import { Request, response, Response } from 'express'
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
      const limit = req.body.limit || 50
      const offset = req.body.offset || 0
      const quests = await prisma.quest.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          id: 'asc',
        },
        take: limit,
        skip: offset, 
      })

    const response = {
      response_id: uuidv7(),
      ok: true,
      quests: quests.map((quest) => ({
        uuid: quest.uuid,
        name: quest.name,
        description: quest.description,
        state: quest.state,
      })),
      total: quests.length,
      limit,
      offset,
    }

    return res.json(response)
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

      const response = {
        response_id: uuidv7(),
        ok: true,
        uuid: quest?.uuid,
        name: quest?.name,
        description: quest?.description,
        state: quest?.state,
      }

      return res.json(response)
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

    const response = {
      response_id: uuidv7(),
      ok: true,
      uuid: newQuest.uuid,
      name: newQuest.name,
      description: newQuest.description,
      state: newQuest.state,
    }

    return res.status(201).json(response)
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
      const updatedQuest = await prisma.quest.update({
          where: {
              uuid: String(req.params.uuid),
          },
          data: req.body as Prisma.QuestUpdateInput,
      })

      const response = {
        response_id: uuidv7(),
        ok: true,
        uuid: updatedQuest.uuid,
        name: updatedQuest.name,
        description: updatedQuest.description,
        state: updatedQuest.state,
      }

      return res.json(response)
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
    await prisma.quest.update({
      where: {
        uuid: String(req.params.uuid),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return res.status(204).send()
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
    await prisma.quest.update({
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

    return res.status(204).send()
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
    await prisma.quest.delete({
      where: {
        uuid: String(req.params.uuid),
      },
    })

    return res.status(204).send()
  } catch (error) {
    return handlePrismaError(error, res)
  }
}
