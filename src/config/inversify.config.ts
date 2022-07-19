import EventEmitter from 'events';
import { Container, interfaces } from 'inversify';

import { GroupController } from '../controllers/group';
import { UserController } from '../controllers/user';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import Context = interfaces.Context;
import { getMethods } from '../utils/objects.util';

const myContainer = new Container();
class LogEmitter extends EventEmitter {}
const loggerEmitter = new LogEmitter();

const loggerActivator = <T extends new (...args: any) => any>(context: Context, instance: InstanceType<T>) => {
  const methods = getMethods(instance);
  let handler = {
    apply: function (
      target: { apply: (arg0: any, arg1: any) => any; name: string },
      thisArgument: any,
      argumentsList: any,
    ) {
      loggerEmitter.emit('log', instance.constructor.name, target.name, argumentsList);

      return target.apply(thisArgument, argumentsList);
    },
  };

  methods.forEach((method) => {
    // @ts-ignore
    instance[method] = new Proxy(instance[method], handler);
  });

  return instance;
};

myContainer.bind<UserService>(UserService).to(UserService).onActivation(loggerActivator);
myContainer.bind<GroupService>(GroupService).to(GroupService).onActivation(loggerActivator);
myContainer.bind<UserController>(UserController).to(UserController);
myContainer.bind<GroupController>(GroupController).to(GroupController);

export { myContainer, loggerEmitter };
