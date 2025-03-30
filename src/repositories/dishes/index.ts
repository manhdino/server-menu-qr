import database from '@/configs/database'
import DishesEntity from '@/entities/dishes'
import { BadRequestError } from '@/responses/errorResponse'
import { IDish } from '@/types'
import { Request } from 'express'

const dishesRepository = database.getRepository(DishesEntity)

class DishesRepository {
  static index = async ({
    limit = 50,
    page = 1,
    sortBy = 'createdAt',
    select = [],
    order = 'DESC' as 'ASC' | 'DESC'
  }) => {
    const skip = (page - 1) * limit

    const query = dishesRepository
      .createQueryBuilder('dishes')
      .orderBy(`dishes.${sortBy}`, order)
      .take(limit)
      .skip(skip)

    if (select.length > 0) {
      query.select(select.map((column) => `dishes.${column}`))
    }
    const [result, count] = await query.getManyAndCount()
    return {
      result,
      count
    }
  }

  static show = async ({ dishId }: { dishId: number }) => {
    return await dishesRepository.createQueryBuilder('dishes').where('dishes.id = :dishId', { dishId }).getOne()
  }

  static create = async (req: Request) => {
    const dishData: IDish = req.body
    const newDish = dishesRepository.create(dishData)
    return await dishesRepository.save(newDish)
  }

  static update = async (req: Request) => {
    const dishId = req.params.id
    const foundDish = await dishesRepository.createQueryBuilder().where({ id: dishId }).getOne()
    if (!foundDish) {
      throw new BadRequestError('Dish not found')
    }
    return await dishesRepository
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :dishId', { dishId })
      .returning('id')
      .execute()
  }

  static destroy = async ({ dishId }: { dishId: number }) => {
    // Kiểm tra xem dish có tồn tại không
    const foundDish = await dishesRepository
      .createQueryBuilder('dishes')
      .where('dishes.id = :dishId', { dishId })
      .getOne()

    if (!foundDish) {
      throw new BadRequestError('Dish not found')
    }

    // Xóa dish
    return await dishesRepository
      .createQueryBuilder()
      .delete()
      .from('dishes')
      .where('id = :dishId', { dishId })
      .returning('id')
      .execute()
  }
}

export default DishesRepository
