import database from '@/configs/database'
import { Request } from 'express'
import AccountsEntity from '@/entities/accounts'

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
}

export default AccountsRepository
