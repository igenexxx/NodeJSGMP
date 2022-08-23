import { injectable } from 'inversify';
import { Op } from 'sequelize';

import type {
  CreateUserModel,
  LoginUserModel,
  RemoveUserModel,
  SuggestUserModel,
  UpdateUserModel,
} from '../interfaces/User';
import { User } from '../models';

@injectable()
export class UserService {
  async getAllUsers() {
    return await User.findAll();
  }

  async createUser({ login, password, age }: CreateUserModel) {
    const user: CreateUserModel = {
      login,
      password,
      age: +age,
    };

    return await User.create(user);
  }

  async updateUser({ login, password, age, id }: UpdateUserModel) {
    return await User.update({ login, password, age }, { where: { id } });
  }

  async removeUser({ id }: RemoveUserModel) {
    return await User.update({ isDeleted: true }, { where: { id } });
  }

  async suggest({ loginSubstring, limit = 0 }: SuggestUserModel) {
    return await User.findAll({
      where: {
        login: {
          [Op.like]: `%${loginSubstring}%`,
        },
      },
      limit,
      order: ['login'],
    });
  }

  async validateUser({ login, password }: LoginUserModel) {
    return await User.findOne({ where: { login, password } });
  }
}
