import DishesRepository from '@/repositories/dishes'

class DishesService {
  static async index(query) {
    const select = ['name']
    const result = await DishesRepository.index({ ...query, select: select })
    return {
      dishes: result
    }
  }
}

export default DishesService
