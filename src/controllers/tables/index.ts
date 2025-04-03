'use strict'

import { Created, OK } from '@/responses/successResponse'
import DishesService from '@/services/dishes'
import TablesService from '@/services/tables'
import { Request, Response } from 'express'

class TablesController {
  index = async (req: Request, res: Response) => {
    new OK({
      message: 'Láy danh sách món ăn thành công',
      metadata: await TablesService.index(req.query)
    }).send(res)
  }

  show = async (req: Request, res: Response) => {
    new OK({
      message: 'Láy chi tiết món ăn thành công',
      metadata: await DishesService.show(req)
    }).send(res)
  }

  create = async (req: Request, res: Response) => {
    new Created({
      message: 'Tạo bàn ăn thành công',
      metadata: await TablesService.create(req)
    }).send(res)
  }

  update = async (req: Request, res: Response) => {
    new OK({
      message: 'Cập nhật món ắn thành công',
      metadata: await DishesService.update(req)
    }).send(res)
  }

  destroy = async (req: Request, res: Response) => {
    new OK({
      message: 'Xóa món ăn thành công',
      metadata: await DishesService.destroy(req)
    }).send(res)
  }
}

export default new TablesController()
