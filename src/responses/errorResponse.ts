'use strict';

import httpResponseStatus from "@/utils/httpResponseStatus";


class ErrorResponse extends Error {
    message: string;
    status: number;
    constructor(message:string, status:number) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = httpResponseStatus.message.CONFLICT, statusCode = httpResponseStatus.code.CONFLICT) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = httpResponseStatus.message.BAD_REQUEST, statusCode = httpResponseStatus.code.BAD_REQUEST) {
        super(message, statusCode);
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(message = httpResponseStatus.message.UNAUTHORIZED, statusCode = httpResponseStatus.code.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = httpResponseStatus.message.NOT_FOUND, statusCode = httpResponseStatus.code.NOT_FOUND) {
        super(message, statusCode);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = httpResponseStatus.message.FORBIDDEN, statusCode = httpResponseStatus.code.FORBIDDEN) {
        super(message, statusCode);
    }
}
class GoneError extends ErrorResponse {
    constructor(message = httpResponseStatus.message.GONE, statusCode = httpResponseStatus.code.GONE) {
        super(message, statusCode);
    }
}


export default {
    ConflictRequestError,
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    ForbiddenError,
    GoneError,
};
