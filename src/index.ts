import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
const port = process.env.PORT || 3000;

console.log('env:', process.env.NODE_ENV);

app.listen(port, () => console.log(`Server has been started on port ${port}`));
