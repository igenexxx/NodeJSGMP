import type { Request, Response } from 'express';
import type { ValidatedRequest } from 'express-joi-validation';
import { inject, injectable } from 'inversify';

import type { SuggestRequestQueryModel, UserModel } from '../interfaces/User';
import { UserService } from '../services/user.service';
import type { UserRequestSchemaModel } from '../validators/user';

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();

      if (users.length) {
        res.status(200).json({ users });
      } else {
        res.status(404).json({ message: 'Users not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  create = async (req: ValidatedRequest<UserRequestSchemaModel>, res: Response) => {
    const { login, age, password }: UserModel = req.body;

    try {
      const user = await this.userService.createUser({ login, age, password });

      res.status(201).json({ userId: user.get('id'), message: 'User successfully created' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  update = async (req: Request, res: Response) => {
    const { login, age, password }: UserModel = req.body;

    try {
      const [affectedCount] = await this.userService.updateUser({ login, age, password, id: req.params.id });

      if (!affectedCount) {
        res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User successfully updated' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.userService.removeUser({ id: req.params.id });

      res.status(200).json({ message: 'User successfully updated' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  suggest = async (req: Request, res: Response) => {
    const { loginSubstring = '', limit = 0 }: SuggestRequestQueryModel = req.query;

    try {
      const users = await this.userService.suggest({ loginSubstring, limit });

      res.status(200).json({ users });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
}
