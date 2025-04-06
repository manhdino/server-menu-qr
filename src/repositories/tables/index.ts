import database from '@/configs/database'
import TablesEntity from '@/entities/tables'
import { v4 as uuidv4 } from 'uuid'
import { Request } from 'express'
import { BadRequestError } from '@/responses/errorResponse'

const tablesRepository = database.getRepository(TablesEntity)

class TablesRepository {
  static index = async () => {
    return await tablesRepository.createQueryBuilder('tables').getMany()
  }

  static show = async ({ tableId }: { tableId: number }) => {
    return await tablesRepository.createQueryBuilder('tables').where('tables.id = :tableId', { tableId }).getOne()
  }

  static create = async (req: Request) => {
    const tableData = { ...req.body, token: uuidv4() }
    const newTable = tablesRepository.create(tableData)
    await tablesRepository.save(newTable)
    return newTable
  }

  static update = async (req: Request) => {
    console.log(req)
    const tableId = req.params.id
    const foundTable = await tablesRepository.createQueryBuilder().where({ id: tableId }).getOne()
    if (!foundTable) {
      throw new BadRequestError('Table not found')
    }
    const result = await tablesRepository
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :tableId', { tableId })
      .returning('id')
      .execute()

    const updatedTableId = result.raw[0].id
    return { id: updatedTableId }
  }

  static destroy = async ({ tableId }: { tableId: number }) => {
    const foundTable = await tablesRepository
      .createQueryBuilder('tables')
      .where('tables.id = :tableId', { tableId })
      .getOne()

    if (!foundTable) {
      throw new BadRequestError('Dish not found')
    }

    // Xóa dish
    return await tablesRepository
      .createQueryBuilder()
      .delete()
      .from('tables')
      .where('id = :tableId', { tableId })
      .returning('id')
      .execute()
  }
}

export default TablesRepository
