import cors from 'cors';
import express from 'express';

import { container } from './config/inversify.config';
import { groupRoutePath, GroupRouter } from './routes/group';
import { userRoutePath, UserRouter } from './routes/user';
import { ErrorHandlers } from './services';
import { authMiddleware } from './services/auth.service';
import { allRequestsLogger } from './services/error-handlers.service';
import { executionTimeLogger } from './services/performance.service';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(authMiddleware({ secret: process.env.SECRET as string, bypassUrls: [`${userRoutePath}/login`] }));
app.use(allRequestsLogger);
app.use(userRoutePath, executionTimeLogger(container.get(UserRouter).getRouter));
app.use(groupRoutePath, executionTimeLogger(container.get(GroupRouter).getRouter()));
app.use('*', ErrorHandlers.notFound);
app.use(ErrorHandlers.errorLogger);
app.use(ErrorHandlers.handleErrors);

export { app };
