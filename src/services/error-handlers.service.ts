import type { NextFunction, Request, Response } from 'express';
import status from 'http-status';

import { loggerEmitter } from '../config/inversify.config';
import { logger } from './winston-logger';

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

export class ForbiddenError extends BaseError {
  constructor(message = status[status.FORBIDDEN] as string) {
    super(status.FORBIDDEN, message);
  }
}

export class Unauthorized extends BaseError {
  constructor(message = status[status.UNAUTHORIZED] as string) {
    super(status.UNAUTHORIZED, message);
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
  loggerEmitter.on('log', (log) => {
    (req as Request & { log: string }).log = log;
  });

  next();
};

export const handleErrors = (error: BaseError | Error, req: Request, res: Response, next: NextFunction) => {
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

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${(req as Request & { log: string }).log} ${error}`);

  next(error);
};
