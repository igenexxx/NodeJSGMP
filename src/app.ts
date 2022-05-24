import express from 'express';

import { userRoutes } from './routes/user';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use('/api/1.0/user', userRoutes);

export { app };
