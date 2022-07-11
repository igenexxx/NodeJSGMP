import { injectable } from 'inversify';
import { Op } from 'sequelize';

import type { CreateUserModel, RemoveUserModel, UpdateUserModel } from '../interfaces/User';
import type { SuggestUserModel } from '../interfaces/User';
import { User } from '../models/User';

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
}