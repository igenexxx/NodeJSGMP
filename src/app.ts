import express from 'express';

import { groupRoutePath, groupRoutes } from './routes/group';
import { userRoutePath, userRoutes } from './routes/user';
import { ErrorHandlers } from './services';
import { allRequestsLogger } from './services/error-handlers.service';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
// @ts-ignore
app.use(allRequestsLogger);
app.use(userRoutePath, userRoutes);
app.use(groupRoutePath, groupRoutes);
app.use('*', ErrorHandlers.notFound);
// @ts-ignore
app.use(ErrorHandlers.errorLogger);
app.use(ErrorHandlers.handleErrors);

export { app };
