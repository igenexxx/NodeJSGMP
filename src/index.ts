import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { processErrorHandler } from './services/error-handlers.service';
const port = process.env.PORT || 3000;

processErrorHandler();

console.log('env:', process.env.NODE_ENV);

app.listen(port, () => console.log(`Server has been started on port ${port}`));
