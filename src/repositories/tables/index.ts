import database from '@/configs/database'
import TablesEntity from '@/entities/tables'
import { v4 as uuidv4 } from 'uuid'
import { Request } from 'express'

const tablesRepository = database.getRepository(TablesEntity)

class TablesRepository {
  static index = async () => {
    return await tablesRepository.createQueryBuilder('tables').getMany()
  }

  // static show = async ({ dishId }: { dishId: number }) => {
  //   return await dishesRepository.createQueryBuilder('dishes').where('dishes.id = :dishId', { dishId }).getOne()
  // }

  static create = async (req: Request) => {
    const tableData = { ...req.body, token: uuidv4() }
    const newTable = tablesRepository.create(tableData)
    await tablesRepository.save(newTable)
    return newTable
  }

  //   static update = async (req: Request) => {
  //     const dishId = req.params.id
  //     const foundDish = await dishesRepository.createQueryBuilder().where({ id: dishId }).getOne()
  //     if (!foundDish) {
  //       throw new BadRequestError('Dish not found')
  //     }
  //     const result = await dishesRepository
  //       .createQueryBuilder()
  //       .update()
  //       .set(req.body)
  //       .where('id = :dishId', { dishId })
  //       .returning('id')
  //       .execute()

  //     const updatedDishId = result.raw[0].id
  //     return { id: updatedDishId }
  //   }

  //   static destroy = async ({ dishId }: { dishId: number }) => {
  //     // Kiểm tra xem dish có tồn tại không
  //     const foundDish = await dishesRepository
  //       .createQueryBuilder('dishes')
  //       .where('dishes.id = :dishId', { dishId })
  //       .getOne()

  //     if (!foundDish) {
  //       throw new BadRequestError('Dish not found')
  //     }

  //     // Xóa dish
  //     return await dishesRepository
  //       .createQueryBuilder()
  //       .delete()
  //       .from('dishes')
  //       .where('id = :dishId', { dishId })
  //       .returning('id')
  //       .execute()
  //   }
}

export default TablesRepository
