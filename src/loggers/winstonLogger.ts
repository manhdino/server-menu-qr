'use strict';

import { createLogger, format, transports,Logger } from 'winston'
import { v4 as uuidv4 } from 'uuid';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp } = format;

class WinstonLogger {

    private logger: Logger

    constructor() {
        const formatPrint = format.printf(
            ({ level, message, context, requestId, timestamp, metadata }) => {
                return `${timestamp} [${level}] ${context} [${requestId}] ${message} ${metadata ? JSON.stringify(metadata) : ''}`;
            }
        )

        this.logger = createLogger({
            level: process.env.LOG_LEVEL || 'debug',
            format: combine(
                timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss.SSS A',
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
                            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
                        }),
                        formatPrint
                    ),
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
                            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
                        }),
                        formatPrint
                    ),
                })

            ]
        })
    }

    commonParams(params) {
        const [context, req, metadata, timestamp] = params;
        const requestId = req?.requestId || uuidv4()
        return {
            requestId,
            context,
            metadata,
            timestamp,
        }
    }

    log(message:string, params) {
        const paramLogs = this.commonParams(params)
        const logObject = Object.assign({
            message
        }, paramLogs)

        this.logger.info(logObject)
    }

    error(message:string, params) {
        const paramLogs = this.commonParams(params)
        const logObject = Object.assign({
            message
        }, paramLogs)
        this.logger.error(logObject)
    }
}

export default new WinstonLogger()