import { Container } from 'inversify';

import { UserController } from '../controllers/user';
import { UserService } from '../services/user.service';

const myContainer = new Container();
myContainer.bind<UserService>(UserService).to(UserService);
myContainer.bind<UserController>(UserController).to(UserController);

export { myContainer };
