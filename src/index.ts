 
// import * as express from 'express'
// import * as bodyParser from 'body-parser'
// import { Request, Response } from 'express'
// import { AppDataSource } from './data-source'
// import { Routes } from './routes'
// import { User } from './entity/User'

// AppDataSource.initialize()
//   .then(async () => {
//     // create express app
//     const app = express()
//     app.use(bodyParser.json())

//     // register express routes from defined application routes
//     Routes.forEach((route) => {
//       ;(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//         const result = new (route.controller as any)()[route.action](req, res, next)
//         if (result instanceof Promise) {
//           result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined))
//         } else if (result !== null && result !== undefined) {
//           res.json(result)
//         }
//       })
//     })

//     // setup express app here
//     // ...

//     // start express server
//     app.listen(3000)

//     // insert new users for test
//     await AppDataSource.manager.save(
//       AppDataSource.manager.create(User, {
//         firstName: 'Timber',
//         lastName: 'Saw',
//         age: 27
//       })
//     )

//     await AppDataSource.manager.save(
//       AppDataSource.manager.create(User, {
//         firstName: 'Phantom',
//         lastName: 'Assassin',
//         age: 24
//       })
//     )

//     console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results')
//   })
//   .catch((error) => console.log(error))
import 'module-alias/register'
import express from 'express'
import { ErrorRequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routes from '@routes/index'





const startServer = () => {
  // Init Express App
  const app = express()

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


  // // Fix Cache from disk from ExpressJS
  // app.use((req, res, next) => {
  //   res.set('Cache-Control', 'no-store')
  //   next()
  // })

  // Cookie parser.
  app.use(cookieParser())

  // Cors.
  app.use(cors())

  // Route.
  app.use('/v1/api',routes)

  // // Allow CORS: for more info, check here: https://youtu.be/iYgAWJ2Djkw
  // app.use(cors(corsOptions))

  // // Enable req.body json data
  // app.use(express.json())

  // // Use Route APIs V1
  // app.use('/v1', APIs_V1)


  // // Should be store to env in the actual product: check here: https://youtu.be/Vgr3MWb7aOw
  // const LOCAL_DEV_APP_PORT = 8017
  // const LOCAL_DEV_APP_HOST = 'localhost'
  // const AUTHOR = 'Dinomanh'
  // app.listen(LOCAL_DEV_APP_PORT, LOCAL_DEV_APP_HOST, () => {
  //   console.log(`Local DEV: Hello ${AUTHOR}, Back-end Server is running successfully at Host: ${LOCAL_DEV_APP_HOST} and Port: ${LOCAL_DEV_APP_PORT}`)
  // })

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
