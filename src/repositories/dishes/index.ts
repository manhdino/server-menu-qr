import database from "@/configs/database";
import DishesEntity from "@/entities/dishes";

const dishesRepository = database.getRepository(DishesEntity)

class DishesRepository {

    static index = async () => {
        const query = dishesRepository
        .createQueryBuilder('dishes')
        return query.getMany()
    }
}

export default DishesRepository