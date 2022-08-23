import type { GroupService } from '../../services/group.service';

type MockGroupServiceModel = { [key in keyof GroupService]: jest.Mock };

export const mockGroupService: MockGroupServiceModel = {
  getAllGroups: jest.fn(),
  createGroup: jest.fn(),
  updateGroup: jest.fn(),
  deleteGroup: jest.fn(),
  getGroupById: jest.fn(),
  addUsersToGroup: jest.fn(),
};
