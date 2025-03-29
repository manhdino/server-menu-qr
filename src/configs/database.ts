import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'menu_order_qr',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: []
})
