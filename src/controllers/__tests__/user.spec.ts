import type { Container } from 'inversify';
import request from 'supertest';

import 'reflect-metadata';
import { loadApp } from '../../app';
import { mockUserService } from '../../mocks/services/mockUserService';
import { GroupModule } from '../../modules/group.module';
import { UserModule } from '../../modules/user.module';
import { userRoutePath } from '../../routes/user';
import { UserService } from '../../services/user.service';
import { createTestingModule } from '../../utils/test.util';
import { UserController } from '../user';

describe('User', () => {
  let userController: UserController;
  let moduleRef: Container;

  beforeEach(() => {
    moduleRef = createTestingModule(UserModule, GroupModule);
    userController = moduleRef.get(UserController);
  });

  afterEach(() => {
    moduleRef.unbindAll();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return list of users', async () => {
    moduleRef.rebind(UserService).toConstantValue({
      ...mockUserService,
      getAllUsers: jest
        .fn()
        .mockImplementation(() => Promise.resolve([{ id: 1, login: 'test', age: 20, password: 'test' }])),
    });
    moduleRef.rebind(UserController).toSelf();

    await request(loadApp(moduleRef)).get(`${userRoutePath}/`).expect(200);
  });

  it('should return 404 status code', async () => {
    moduleRef.rebind(UserService).toConstantValue({
      ...mockUserService,
      getAllUsers: jest.fn().mockImplementation(() => Promise.resolve([])),
    });
    moduleRef.rebind(UserController).toSelf();

    await request(loadApp(moduleRef)).get(`${userRoutePath}/`).expect(404);
  });
});
