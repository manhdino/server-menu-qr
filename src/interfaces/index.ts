import { Request } from "express";

export interface LoggerRequest extends Request{
    startTime: number;
    requestId: string;
  }