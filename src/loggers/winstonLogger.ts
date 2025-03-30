'use strict'

import { createLogger, format, transports, Logger } from 'winston'
import { v4 as uuidv4 } from 'uuid'
import DailyRotateFile from 'winston-daily-rotate-file'
import chalk from 'chalk'

const { combine, timestamp } = format

class WinstonLogger {
  private logger: Logger

  constructor() {
    const formatPrint = format.printf(({ level, message, requestId, timestamp, metadata }) => {
      return `${chalk.bgGray(timestamp)} [${level}]  [${chalk.cyan(requestId)}] [${chalk.green(message)}] ${metadata ? JSON.stringify(metadata) : ''}`
    })

    this.logger = createLogger({
      level: process.env.LOG_LEVEL || 'debug',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        formatPrint
      ),

      transports: [
        new transports.Console(),
        new DailyRotateFile({
          level: 'info',
          dirname: 'logs',
          filename: 'application-%DATE%.info.log',
          datePattern: 'YYYY-MM-DD-HH-mm',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: combine(
            timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A'
            }),
            formatPrint
          )
        }),
        new DailyRotateFile({
          level: 'error',
          dirname: 'logs',
          filename: 'application-%DATE%.error.log',
          datePattern: 'YYYY-MM-DD-HH-mm',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: combine(
            timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A'
            }),
            formatPrint
          )
        })
      ]
    })
  }

  commonParams(params) {
    const [req, metadata, timestamp] = params
    const requestId = req?.requestId || uuidv4()
    return {
      requestId,
      metadata,
      timestamp
    }
  }

  log(message: string, params) {
    const paramLogs = this.commonParams(params)
    const logObject = Object.assign(
      {
        message
      },
      paramLogs
    )

    this.logger.info(logObject)
  }

  error(message: string, params) {
    const paramLogs = this.commonParams(params)
    const logObject = Object.assign(
      {
        message
      },
      paramLogs
    )
    this.logger.error(logObject)
  }
}

export default new WinstonLogger()
