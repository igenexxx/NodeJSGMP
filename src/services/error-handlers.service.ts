import type { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { interfaces } from 'inversify';

import { getMethods } from '../utils/objects.util';
import { logger } from './winston-logger';
import Context = interfaces.Context;
import EventEmitter from 'events';

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

class LogEmitter extends EventEmitter {}
export const loggerEmitter = new LogEmitter();

export const allRequestsLogger = (req: Request, res: Response, next: NextFunction) => {
  loggerEmitter.on('log', (log) => {
    (req as Request & { log: string }).log = log;
  });

  next();
};

export const loggerActivator = <T extends new (...args: any) => any>(context: Context, instance: InstanceType<T>) => {
  const methods = getMethods(instance);
  const handler = {
    apply(target: { apply: (arg0: any, arg1: any) => any; name: string }, thisArgument: any, argumentsList: any) {
      loggerEmitter.emit('log', instance.constructor.name, target.name, argumentsList);

      return target.apply(thisArgument, argumentsList);
    },
  };

  methods.forEach((method) => {
    // @ts-ignore
    instance[method] = new Proxy(instance[method], handler);
  });

  return instance;
};
