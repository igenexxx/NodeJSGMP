import express from 'express';

import { userRoutePath, userRoutes } from './routes/user';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(userRoutePath, userRoutes);

export { app };
