import { verify } from 'jsonwebtoken';

import type { MiddlewareModel } from '../interfaces/Common';
import { ForbiddenError } from './error-handlers.service';

export const authMiddleware: (secret: string) => MiddlewareModel = (secret) => (req, res, next) => {
  if (req.headers.authorization) {
    const [, token] = req.headers.authorization.split(' ');

    if (token) {
      verify(token, secret, (err, decoded) => {
        if (err) {
          next(new ForbiddenError(err.message));
        } else if (typeof decoded === 'object') {
          req.user = decoded?.login;
          next();
        }

        next();
      });
    }
  }

  next();
};
