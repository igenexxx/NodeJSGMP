import express from 'express';

import { groupRoutePath, groupRoutes } from './routes/group';
import { userRoutePath, userRoutes } from './routes/user';
import { ErrorHandlers } from './services';
import { authMiddleware } from './services/auth.service';
import { allRequestsLogger } from './services/error-handlers.service';
import { executionTimeLogger } from './services/performance.service';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(authMiddleware({ secret: process.env.SECRET as string, bypassUrls: [`${userRoutePath}/login`] }));
app.use(allRequestsLogger);
app.use(userRoutePath, executionTimeLogger(userRoutes));
app.use(groupRoutePath, executionTimeLogger(groupRoutes));
app.use('*', ErrorHandlers.notFound);
app.use(ErrorHandlers.errorLogger);
app.use(ErrorHandlers.handleErrors);

export { app };
