import express from 'express';

import { groupRoutePath, groupRoutes } from './routes/group';
import { userRoutePath, userRoutes } from './routes/user';
import { ErrorHandlers } from './services';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(ErrorHandlers.allRequestsLogger);
app.use(userRoutePath, userRoutes);
app.use(groupRoutePath, groupRoutes);
app.use(ErrorHandlers.handleErrors);

export { app };
