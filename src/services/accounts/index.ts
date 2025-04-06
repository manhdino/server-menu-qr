import { Request } from 'express'
import AccountsRepository from '@/repositories/accounts/inderx'
class AccountsService {
  static async index(query) {
    const select = []
    const result = await AccountsRepository.index()
    return {
      accounts: result
    }
  }

  static async create(req: Request) {
    const result = await AccountsRepository.create(req)
    return {
      account: result
    }
  }

  static async destroy(req: Request) {
    const result = await AccountsRepository.destroy({ accountId: Number(req.params.id) })
    return {
      dish: result
    }
  }
}

export default AccountsService
