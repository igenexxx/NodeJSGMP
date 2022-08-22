import { ContainerModule } from 'inversify';

import { GroupController } from '../controllers/group';
import { loggerActivator } from '../services/error-handlers.service';
import { GroupService } from '../services/group.service';

export class GroupModule extends ContainerModule {
  constructor() {
    super((bind) => {
      bind<GroupService>(GroupService).toSelf().onActivation(loggerActivator);
      bind<GroupController>(GroupController).toSelf();
    });
  }
}
