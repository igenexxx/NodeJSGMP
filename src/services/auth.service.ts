import { verify } from 'jsonwebtoken';

import type { MiddlewareModel } from '../interfaces/Common';
import { ForbiddenError, Unauthorized } from './error-handlers.service';

export const authMiddleware: (options: { secret: string; bypassUrls?: string[] }) => MiddlewareModel =
  ({ secret, bypassUrls }) =>
  (req, res, next) => {
    if (req.headers.authorization && !bypassUrls?.some((url) => req.path.startsWith(url))) {
      const [, token] = req.headers.authorization.split(' ');

      if (token) {
        verify(token, secret, (err, decoded) => {
          if (err) {
            next(new ForbiddenError(err.message));
          } else if (typeof decoded === 'object') {
            req.user = decoded?.login;
            next();
          }
        });
      }
    } else {
      next();
    }
  };

export const authCheckMiddleware: MiddlewareModel = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(new Unauthorized('You are not authorized'));
  }
};
