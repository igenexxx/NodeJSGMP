import { Container } from 'inversify';

import { GroupModule } from '../modules/group.module';
import { UserModule } from '../modules/user.module';

const container = new Container();

container.load(new UserModule(), new GroupModule());

export { container };
