import type { Express } from 'express';
import express from 'express';
import type { Container } from 'inversify';

import { groupRoutePath, GroupRouter } from './routes/group';
import { userRoutePath, UserRouter } from './routes/user';
import { ErrorHandlers } from './services';

const loadApp = (container: Container): Express => {
  const app = express();

  app.disable('x-powered-by');
  // app.use(cors());
  app.use(express.json());
  // app.use(authMiddleware({ secret: process.env.SECRET as string, bypassUrls: [`${userRoutePath}/login`] }));
  // app.use(allRequestsLogger);
  app.use(userRoutePath, container.get(UserRouter).getRouter());
  app.use(groupRoutePath, container.get(GroupRouter).getRouter());
  app.use('*', ErrorHandlers.notFound);
  app.use(ErrorHandlers.errorLogger);
  app.use(ErrorHandlers.handleErrors);

  return app;
};

export { loadApp };
