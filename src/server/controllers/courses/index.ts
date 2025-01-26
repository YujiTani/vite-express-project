import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { v7 as uuidv7 } from 'uuid'

import { handlePrismaError, logQuery } from "../helper.ts";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'] as Prisma.LogLevel[],
}) 

// @ts-ignore
prisma.$on('query', (event) => {
  logQuery(event)
});


/**
 * コースを作成
 * @param req リクエスト
 * @param res レスポンス
 * @returns コース
 */
export const createCourse = async (req: Request, res: Response) => {
    try {
        const uuid = uuidv7()
        const course = await prisma.course.create({
            data: {
                ...req.body,
                uuid,
            } as Prisma.CourseCreateInput,
        })

        if (!course) {
            return res.status(404).json({ 
                response_id: uuidv7(),
                message: 'リソースが見つかりません'
             })
        }

        const response = {
            response_id: uuidv7(),
            ok: true,
            course: {
                uuid: course.uuid,
                name: course.name,
                description: course.description,
                difficulty: course.difficulty,
            }
        }

        return res.status(201).json(response)
    } catch (error) {
        return handlePrismaError(error, res)
    }
}

/**
 * 指定したコースの更新
 * @param req リクエスト
 * @param res レスポンス
 * @returns 更新したコース
 */
export const updateCourseByUuid = async (req: Request, res: Response) => {
    try {
      const updatedCourse = await prisma.course.update({
          where: {
              uuid: String(req.params.uuid),
              deletedAt: null,
          },
          data: req.body as Prisma.CourseUpdateInput,
      })

      const response = {
        response_id: uuidv7(),
        course: {
          uuid: updatedCourse.uuid,
          name: updatedCourse.name,
          description: updatedCourse.description,
          difficulty: updatedCourse.difficulty,
        },
      }

      return res.json(response)
    } catch (error) {
        return handlePrismaError(error, res)
    }
}

/**
 * コースの削除フラグを立てる
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const trashCourseByUuid = async (req: Request, res: Response) => {
  try {
    await prisma.course.update({
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
 * コースの削除フラグを解除する
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const restoreCourseByUuid = async (req: Request, res: Response) => {
  try {
    await prisma.course.update({
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
 * コースを完全削除する
 * 完全削除は、削除フラグが立っているコースのみ対象とする
 * @param req リクエスト
 * @param res レスポンス
 * @returns {void}
 */
export const destroyCourseByUuid = async (req: Request, res: Response) => {
  try {
    await prisma.course.delete({
      where: {
        uuid: String(req.params.uuid),
        deletedAt: {
          not: null,
        },
      },
    })

    return res.status(204).send()
  } catch (error) {
    return handlePrismaError(error, res)
  }
}
