import 'module-alias/register'
import express from 'express'
import { ErrorRequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routes from '@routes/index'
import { v4 as uuidv4 } from 'uuid';
import  morgan from 'morgan'
import helmet from "helmet"
import compression from 'compression'
import { LoggerRequest } from './interfaces'
import winstonLogger from '@/loggers/winstonLogger'
import { corsOptions } from '@configs/cors'
import database from '@/configs/database'

const startServer = async () => {
  // Init Express App
  const app = express()

  await database.getInstance().connect()

  const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
      status: 'error',
      code: statusCode,
      message: error.message || "Internal Server Error",
    });
};

  app.use((req, res, next) => {
   res.set('Cache-Control', 'no-store')
   next()
  })
  // Cookie parser.
  app.use(cookieParser())

  // Cors.
  app.use(cors(corsOptions))

  // Route.
  app.use('/v1/api',routes)


  app.use(morgan("combined"))
  app.use(helmet())
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({
      extended: true
  }))
  
app.use((req:LoggerRequest, res, next) => {
    req.startTime = Date.now();
    req.requestId =  uuidv4();
    winstonLogger.log(`parameters [${req.method}]`, [
        req.path,
        { requestId: req.requestId },
        req.method === 'POST' ? req.body : req.query,
        { timestamp: Date.now() }
    ])
    next();
})
const LOCAL_DEV_APP_PORT = process.env.SERVER_PORT || 8017
const LOCAL_DEV_APP_HOST = process.env.SERVER_HOST || 'localhost'
const AUTHOR = 'Dinomanh'
app.listen(Number(LOCAL_DEV_APP_PORT), LOCAL_DEV_APP_HOST, () => {
  console.log(`Local DEV: Hello ${AUTHOR}, Back-end Server is running successfully at Host: ${LOCAL_DEV_APP_HOST} and Port: ${LOCAL_DEV_APP_PORT}`)
})
  app.use(errorHandler);

}
;(async () => {
  try {
    // Start Back-end Server
    console.log('Starting Server...')
    startServer()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
