import type { Container } from 'inversify';
import request from 'supertest';

import 'reflect-metadata';
import { loadApp } from '../../app';
import { mockGroupService } from '../../mocks/services/mockGroupService';
import { GroupModule } from '../../modules/group.module';
import { UserModule } from '../../modules/user.module';
import { groupRoutePath } from '../../routes/group';
import { GroupService } from '../../services/group.service';
import { createTestingModule, generateToken } from '../../utils/test.util';
import { GroupController } from '../group';

describe('Group', () => {
  let groupController: GroupController;
  let moduleRef: Container;

  beforeEach(() => {
    moduleRef = createTestingModule(UserModule, GroupModule);
    groupController = moduleRef.get(GroupController);
    process.env['SECRET'] = 'test';
  });

  afterEach(() => {
    moduleRef.unbindAll();
    process.env['SECRET'] = '';
  });

  it('should be defined', () => {
    expect(groupController).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return list of groups', async () => {
      moduleRef.rebind(GroupService).toConstantValue({
        ...mockGroupService,
        getAllGroups: jest.fn().mockImplementation(() => Promise.resolve([{ id: 1, name: 'test' }])),
      });
      moduleRef.rebind(GroupController).toSelf();

      await request(loadApp(moduleRef)).get(`${groupRoutePath}/`).expect(200);
    });
  });

  describe('create()', () => {
    it('should return 201 status', async () => {
      moduleRef.rebind(GroupService).toConstantValue({
        ...mockGroupService,
        createGroup: jest.fn().mockImplementation(() =>
          Promise.resolve({
            id: 1,
            name: 'test',
            get: jest.fn().mockImplementation(() => ({ id: 1 })),
          }),
        ),
      });
      moduleRef.rebind(GroupController).toSelf();

      await request(loadApp(moduleRef)).post(`${groupRoutePath}/`).expect(201);
    });
  });

  describe('update()', () => {
    it('should return 200 status', async () => {
      moduleRef.rebind(GroupService).toConstantValue({
        ...mockGroupService,
        updateGroup: jest.fn().mockImplementation(() => Promise.resolve([{ id: 1 }])),
      });
      moduleRef.rebind(GroupController).toSelf();

      const token = await generateToken('test');

      await request(loadApp(moduleRef))
        .put(`${groupRoutePath}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test',
          permissions: ['READ'],
        })
        .expect(200);
    });

    it('should return 401 if no user info provided', async () => {
      await request(loadApp(moduleRef)).put(`${groupRoutePath}/1`).expect(401);
    });
  });

  describe('remove()', () => {
    it('should return 200 status', async () => {
      moduleRef.rebind(GroupService).toConstantValue({
        ...mockGroupService,
        deleteGroup: jest.fn().mockImplementation(() => Promise.resolve([{ id: 1 }])),
      });
      moduleRef.rebind(GroupController).toSelf();

      const token = await generateToken('test');

      await request(loadApp(moduleRef))
        .delete(`${groupRoutePath}/1`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should return 401 status if unauthorized', async () => {
      await request(loadApp(moduleRef)).delete(`${groupRoutePath}/1`).expect(401);
    });
  });

  describe('getById()', () => {
    it('should return 200 status code', async () => {
      moduleRef.rebind(GroupService).toConstantValue({
        ...mockGroupService,
        getGroupById: jest.fn().mockImplementation(() => Promise.resolve([{ id: 1 }])),
      });
      moduleRef.rebind(GroupController).toSelf();

      const token = await generateToken('test');

      await request(loadApp(moduleRef)).get(`${groupRoutePath}/1`).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 401 status code if unathorized', async () => {
      await request(loadApp(moduleRef)).get(`${groupRoutePath}/1`).expect(401);
    });
  });

  describe('addUsersToGroup()', () => {
    it('should return 200 status code', async () => {
      moduleRef.rebind(GroupService).toConstantValue(mockGroupService);
      moduleRef.rebind(GroupController).toSelf();

      await request(loadApp(moduleRef)).post(`${groupRoutePath}/1/user`).expect(200);
    });
  });
});
