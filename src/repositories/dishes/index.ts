import database from '@/configs/database'
import DishesEntity from '@/entities/dishes'

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
    return query.getMany()
  }
}

export default DishesRepository
