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

  describe('getAll()', () => {
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

  describe('create', () => {
    it('should return 201 and user date', async () => {
      moduleRef.rebind(UserService).toConstantValue({
        ...mockUserService,
        createUser: jest.fn().mockImplementation(() =>
          Promise.resolve({
            login: 'test_1',
            get: jest.fn().mockImplementation(() => ({ id: 1 })),
          }),
        ),
      });
      moduleRef.rebind(UserController).toSelf();

      await request(loadApp(moduleRef))
        .post(`${userRoutePath}/`)
        .send({ login: 'test_1', age: 20, password: 'a12345678' })
        .expect(201);
    });

    it('should return 400 bad request if short password', async () => {
      await request(loadApp(moduleRef))
        .post(`${userRoutePath}/`)
        .send({ login: 'test_1', age: 20, password: '123' })
        .expect(400);
    });
  });

  describe('remove()', () => {
    it('should return 200 ok if id is provided', async () => {
      moduleRef.rebind(UserService).toConstantValue(mockUserService);
      moduleRef.rebind(UserController).toSelf();

      await request(loadApp(moduleRef)).delete(`${userRoutePath}/1`).expect(200);
    });
  });

  describe('suggest()', () => {
    it('should return 200 ok if id is provided', async () => {
      moduleRef.rebind(UserService).toConstantValue({
        ...mockUserService,
        suggest: jest.fn().mockImplementation(() => Promise.resolve([{ id: 1, login: 'test' }])),
      });
      moduleRef.rebind(UserController).toSelf();

      await request(loadApp(moduleRef)).get(`${userRoutePath}/suggest`).expect(200);
    });
  });

  describe('login()', () => {
    it('should return 200 status code and auth token', () => {
      moduleRef.rebind(UserService).toConstantValue({
        ...mockUserService,
        getToken: jest.fn().mockImplementation(() => Promise.resolve('mock_token 1234567890')),
      });
      moduleRef.rebind(UserController).toSelf();

      return request(loadApp(moduleRef))
        .post(`${userRoutePath}/login`)
        .send({ login: 'test', password: 'test12345678' })
        .expect(200);
    });
  });
});
