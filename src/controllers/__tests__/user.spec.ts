import request from 'supertest';

import { app } from '../../app';
import { myContainer } from '../../config/inversify.config';
import { mockUserService } from '../../mocks/services/mockUserService';
import { userRoutePath } from '../../routes/user';
import { UserService } from '../../services/user.service';
import { UserController } from '../user';

describe('User', () => {
  let userController: UserController;

  beforeEach(() => {
    userController = myContainer.get(UserController);
    myContainer.rebind(UserService).toConstantValue({
      ...mockUserService,
      getAllUsers: jest.fn().mockResolvedValue([{ id: 1, login: 'test', age: 20, password: 'test' }]),
    });
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return list of users', async () => {
    const response = await request(app).get(userRoutePath).send();

    expect(response.status).toBe(200);
  });
});
