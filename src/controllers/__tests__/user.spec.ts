import request from 'supertest';

import 'reflect-metadata';
import { app } from '../../app';
import { container } from '../../config/inversify.config';
import { mockUserService } from '../../mocks/services/mockUserService';
import { userRoutePath } from '../../routes/user';
import { UserService } from '../../services/user.service';
import { UserController } from '../user';

describe('User', () => {
  let userController: UserController;

  beforeEach(() => {
    userController = container.get<UserController>(UserController);
    console.log(userController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return list of users', async () => {
    const testApp = request(app);

    container.rebind(UserService).toConstantValue(mockUserService);

    const response = await testApp.get(userRoutePath).send();

    expect(response.status).toBe(200);
    // const userService = container.get<UserService>(UserService);
    // console.log(userService);
    // expect(true).toBe(false);
  });
});
