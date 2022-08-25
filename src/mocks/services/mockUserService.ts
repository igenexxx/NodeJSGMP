import type { UserService } from '../../services/user.service';

type MockUserServiceModel = { [key in keyof UserService]: jest.Mock };

export const mockUserService: MockUserServiceModel = {
  getAllUsers: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  removeUser: jest.fn(),
  suggest: jest.fn(),
  getToken: jest.fn(),
};
