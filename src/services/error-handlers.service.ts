import type { NextFunction, Request, Response } from 'express';
import expressWinston from 'express-winston';
import status from 'http-status';
import winston from 'winston';

import { loggerEmitter } from '../config/inversify.config';

class BaseError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = status[status.NOT_FOUND] as string) {
    super(status.NOT_FOUND, message);
  }
}

export class ServerError extends BaseError {
  constructor(message = status[status.INTERNAL_SERVER_ERROR] as string) {
    super(status.INTERNAL_SERVER_ERROR, message);
  }
}

export const processErrorHandler = () => {
  process.on('unhandledRejection', (reason: Error | any) => {
    console.log(`Unhandled Rejection: ${reason.message || reason}`);

    throw new Error(reason.message || reason);
  });

  process.on('uncaughtException', (error: Error) => {
    console.log(`Uncaught Exception: ${error.message}`);

    throw new BaseError(500, error.message);
  });
};

export const allRequestsLogger = (req: Request, res: Response, next: NextFunction) => {
  loggerEmitter.on('log', console.log);

  next();
};

export const handleErrors = (error: BaseError | Error, req: Request, res: Response, next: NextFunction) => {
  // TODO: substitute with separate middleware
  console.log('HANDLE ERRORS', error);

  if (error instanceof BaseError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: status[status.INTERNAL_SERVER_ERROR] });
  }
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
};

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  meta: false,
  metaField: '',
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
});
