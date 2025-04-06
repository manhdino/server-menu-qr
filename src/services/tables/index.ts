import DishesRepository from '@/repositories/dishes'
import TablesRepository from '@/repositories/tables'
import { Request } from 'express'

class TablesService {
  static async index(query) {
    // const select = ['name', 'id', 'price']
    const select = []
    const result = await TablesRepository.index()
    return {
      tables: result
    }
  }

  static async show(req: Request) {
    const result = await TablesRepository.show({ tableId: Number(req.params.id) })
    return {
      table: result
    }
  }

  static async create(req: Request) {
    const result = await TablesRepository.create(req)
    return {
      table: result
    }
  }

  static async update(req: Request) {
    const result = await TablesRepository.update(req)
    return {
      table: result
    }
  }

  static async destroy(req: Request) {
    const result = await TablesRepository.destroy({ tableId: Number(req.params.id) })
    return {
      table: result
    }
  }
}

export default TablesService
