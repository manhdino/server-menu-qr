'use strict'

import { Created, OK } from '@/responses/successResponse'
import AccountsService from '@/services/accounts'

import { Request, Response } from 'express'

class TablesController {
  index = async (req: Request, res: Response) => {
    new OK({
      message: 'Láy danh sách món ăn thành công',
      metadata: await AccountsService.index(req.query)
    }).send(res)
  }

  //   show = async (req: Request, res: Response) => {
  //     new OK({
  //       message: 'Láy chi tiết món ăn thành công',
  //       metadata: await DishesService.show(req)
  //     }).send(res)
  //   }

  create = async (req: Request, res: Response) => {
    new Created({
      message: 'Tạo tài khoản thành công',
      metadata: await AccountsService.create(req)
    }).send(res)
  }

  //   update = async (req: Request, res: Response) => {
  //     new OK({
  //       message: 'Cập nhật món ắn thành công',
  //       metadata: await DishesService.update(req)
  //     }).send(res)
  //   }

  destroy = async (req: Request, res: Response) => {
    new OK({
      message: 'Xóa tài khoản thành công',
      metadata: await AccountsService.destroy(req)
    }).send(res)
  }
}

export default new TablesController()
