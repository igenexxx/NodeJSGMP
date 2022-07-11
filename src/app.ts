import express from 'express';

import { userRoutePath, userRoutes } from './routes/user';
import { ErrorHandlers } from './services';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(userRoutePath, userRoutes);
app.use(ErrorHandlers.handleErrors);

export { app };
