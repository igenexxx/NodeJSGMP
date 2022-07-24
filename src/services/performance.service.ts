import type { NextFunction, Request, Response } from 'express';
import { performance } from 'perf_hooks';

import type { MiddlewareModel } from '../interfaces/Common';
import { logger } from './winston-logger';

export const executionTimeLogger = (fn: MiddlewareModel) => (req: Request, res: Response, next: NextFunction) => {
  performance.mark('start');

  res.on('finish', () => {
    performance.mark('end');

    logger.info(`${req.method} ${req.originalUrl} ${JSON.stringify(performance.measure('request', 'start', 'end'))}`);
  });

  fn(req, res, next);
};
