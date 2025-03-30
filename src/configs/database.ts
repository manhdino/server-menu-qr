import 'reflect-metadata'
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm'
import dotenv from 'dotenv';
import winstonLogger from '@/loggers/winstonLogger'
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

export const connection = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port:  Number(process.env.POSTGRES_PORT),
  username:  process.env.POSTGRES_USER,
  password:  process.env.POSTGRES_PASSWORD,
  database:  process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/../entities/*.ts`],
  migrations: [`${__dirname}/../migrations/*.ts`],
})

  class Database {

    private static instance: Database;
    private constructor() {
        this.connect();
    }

  
      // connect
      async connect(type = 'postgres') {
        const startTime = Date.now();
        const requestId =  uuidv4();
        await connection
          .initialize() 
          .then(() =>{
             winstonLogger.log(
              `Database connect time: ${Date.now() - startTime}ms, Request ID: ${requestId}`,
              [
                { requestId: requestId },
                { timestamp: Date.now() }
            ])
          })
          .catch((error: any) => {
            winstonLogger.error(
              `Database connect failed by reason ${error.message}`,[])
              throw new Error('Database connect failed');
          })  
      }
  
      static getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) {
        return connection.getRepository(entity);
      }
      static getInstance() {
          if (!Database.instance) {
              Database.instance = new Database();
          }
          return Database.instance
      }
  }
  
  
export default Database