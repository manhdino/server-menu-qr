'use strict'

import { Created, OK } from '@/responses/successResponse'
import DishesService from '@/services/dishes'
import { Request, Response } from 'express'

// export const updateDish = (id: number, data: UpdateDishBodyType) => {
//   return prisma.dish.update({
//     where: {
//       id
//     },
//     data
//   })
// }

// export const deleteDish = (id: number) => {
//   return prisma.dish.delete({
//     where: {
//       id
//     }
//   })
// }

class DishesController {
  index = async (req: Request, res: Response) => {
    new OK({
      message: 'Get list dishes successfully',
      metadata: await DishesService.index(req.query)
    }).send(res)
  }

  show = async (req: Request, res: Response) => {
    new OK({
      message: 'Get detail dish successfully',
      metadata: await DishesService.show(req)
    }).send(res)
  }

  create = async (req: Request, res: Response) => {
    new Created({
      message: 'Create dish successfully',
      metadata: await DishesService.create(req)
    }).send(res)
  }

  update = async (req: Request, res: Response) => {
    new Created({
      message: 'Update dish successfully',
      metadata: await DishesService.update(req)
    }).send(res)
  }
}

export default new DishesController()
