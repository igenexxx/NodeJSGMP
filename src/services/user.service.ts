import bcrypt from 'bcryptjs';
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
import { signJWT } from '../utils/auth.util';

@injectable()
export class UserService {
  async getAllUsers() {
    return await User.findAll();
  }

  async createUser({ login, password, age }: CreateUserModel) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user: CreateUserModel = {
      login,
      password: passwordHash,
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

  async getToken({ login, password }: LoginUserModel) {
    const candidate = await User.findOne({ where: { login } });

    if (candidate) {
      const passwordResult = await bcrypt.compare(password, candidate.get('password'));

      return passwordResult ? await signJWT(candidate.get('login'), process.env.SECRET as string) : null;
    }
  }
}
