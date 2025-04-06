import database from '@/configs/database'
import { Request } from 'express'
import AccountsEntity from '@/entities/accounts'
import { BadRequestError } from '@/responses/errorResponse'

const accountsRepository = database.getRepository(AccountsEntity)

class AccountsRepository {
  static index = async () => {
    return await accountsRepository.createQueryBuilder('accounts').getMany()
  }

  static create = async (req: Request) => {
    const accountData = req.body
    const newAccount = accountsRepository.create(accountData)
    await accountsRepository.save(accountData)
    return newAccount
  }

  static destroy = async ({ accountId }: { accountId: number }) => {
    console.log(accountId)
    const foundAccount = await accountsRepository
      .createQueryBuilder('accounts')
      .where('accounts.id = :accountId', { accountId })
      .getOne()
    console.log(foundAccount)
    if (!foundAccount) {
      throw new BadRequestError('Account not found')
    }
    return await accountsRepository
      .createQueryBuilder()
      .delete()
      .from('accounts')
      .where('id = :accountId', { accountId })
      .returning('id')
      .execute()
  }
}

export default AccountsRepository
