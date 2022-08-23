import 'reflect-metadata';
import 'dotenv/config';
import { loadApp } from './app';
import { container } from './config/inversify.config';
import { processErrorHandler } from './services/error-handlers.service';
const port = process.env.PORT || 3000;

processErrorHandler();

console.log('env:', process.env.NODE_ENV);

loadApp(container).listen(port, () => console.log(`Server has been started on port ${port}`));
