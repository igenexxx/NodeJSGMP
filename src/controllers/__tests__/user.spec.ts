import request from 'supertest';

import 'reflect-metadata';
import { app } from '../../app';
import { mockUserService } from '../../mocks/services/mockUserService';
import { UserModule } from '../../modules/user.module';
import { userRoutePath } from '../../routes/user';
import { UserService } from '../../services/user.service';
import { createTestingModule } from '../../utils/test.util';
import { UserController } from '../user';

describe('User', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    const moduleRef = createTestingModule(UserModule);

    moduleRef.rebind(UserService).toConstantValue(mockUserService);
    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    console.log(userService);
    console.log(userController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return list of users', async () => {
    const response = await request(app).get(userRoutePath).send();

    expect(response.status).toBe(200);
  });
});
