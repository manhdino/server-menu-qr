'use strict';

import httpResponseStatus from "@/utils/httpResponseStatus";
import { Response } from "express";



class SuccessResponse {
    message: string;
    status: number;
    metadata: object;
    constructor({ message = httpResponseStatus.message.OK, statusCode = httpResponseStatus.code.OK, metadata = {} }) {
        this.message = message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res:Response, headers = {}) {
        return res.status(this.status).json(this)
    }
}


class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}


class Created extends SuccessResponse {
    constructor({ message = httpResponseStatus.message.CREATED, statusCode = httpResponseStatus.code.CREATED, metadata }) {
        super({ message, statusCode, metadata });
    }
}

export default { OK, Created };