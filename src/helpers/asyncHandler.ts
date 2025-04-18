import { NextFunction, Request, Response } from "express";

const asyncHandler = fn => {
    return (req:Request, res:Response, next:NextFunction) => {
        fn(req, res, next).catch(next);
    }
}

export default asyncHandler