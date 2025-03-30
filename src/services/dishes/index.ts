import DishesRepository from '@/repositories/dishes'
import { Request } from 'express'

class DishesService {
  static async index(query) {
    const select = ['name', 'id', 'price']
    const result = await DishesRepository.index({ ...query, select: select })
    return {
      dishes: result
    }
  }

  static async show(req: Request) {
    const result = await DishesRepository.show({ dishId: Number(req.params.id) })
    return {
      dish: result
    }
  }

  static async create(req: Request) {
    const result = await DishesRepository.create(req)
    return {
      dish: result
    }
  }

  static async update(req: Request) {
    const result = await DishesRepository.update(req)
    return {
      dish: result
    }
  }
}

export default DishesService
