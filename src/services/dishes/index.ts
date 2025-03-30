import DishesRepository from "@/repositories/dishes"


class DishesService {

    static async index(){
        const result = await DishesRepository.index()
        return {
            dishes:result
        }
    }
}

export default DishesService