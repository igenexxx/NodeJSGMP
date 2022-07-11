import { Container } from 'inversify';

import { GroupController } from '../controllers/group';
import { UserController } from '../controllers/user';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';

const myContainer = new Container();

myContainer.bind<UserService>(UserService).to(UserService);
myContainer.bind<GroupService>(GroupService).to(GroupService);
myContainer.bind<UserController>(UserController).to(UserController);
myContainer.bind<GroupController>(GroupController).to(GroupController);

export { myContainer };
