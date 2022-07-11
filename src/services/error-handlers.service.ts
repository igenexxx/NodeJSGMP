import type { NextFunction, Request, Response } from 'express';
import status from 'http-status';

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

export const handleErrors = (error: BaseError | Error, req: Request, res: Response, next: NextFunction) => {
  // TODO: substitute with separate middleware
  console.log(error);

  if (error instanceof BaseError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }

  res.status(status.INTERNAL_SERVER_ERROR).json({ message: status[status.INTERNAL_SERVER_ERROR] });

  next();
};
