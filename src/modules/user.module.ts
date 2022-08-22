import { ContainerModule } from 'inversify';

import { UserController } from '../controllers/user';
import { UserRouter } from '../routes/user';
import { loggerActivator } from '../services/error-handlers.service';
import { UserService } from '../services/user.service';

export class UserModule extends ContainerModule {
  constructor() {
    super((bind) => {
      bind<UserService>(UserService).toSelf().inSingletonScope().onActivation(loggerActivator);
      bind<UserController>(UserController).toSelf().inSingletonScope();
      bind<UserRouter>(UserRouter).toSelf().inSingletonScope();
    });
  }
}
