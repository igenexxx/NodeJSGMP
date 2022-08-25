import type { NextFunction, Request, Response } from 'express';
import type { ValidatedRequest } from 'express-joi-validation';
import { inject, injectable } from 'inversify';

import type { SuggestRequestQueryModel, UserModel } from '../interfaces/User';
import { NotFoundError } from '../services/error-handlers.service';
import { UserService } from '../services/user.service';
import type { UserRequestSchemaModel } from '../validators/user';

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();

      if (users.length) {
        res.status(200).json({ users });
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e);
    }
  };

  create = async (req: ValidatedRequest<UserRequestSchemaModel>, res: Response, next: NextFunction) => {
    const { login, age, password }: UserModel = req.body;

    try {
      const user = await this.userService.createUser({ login, age, password });

      res.status(201).json({ userId: user.get('id'), message: 'User successfully created' });
    } catch (e) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { login, age, password }: UserModel = req.body;

    try {
      const [affectedCount] = await this.userService.updateUser({ login, age, password, id: req.params.id });

      if (!affectedCount) {
        next(new NotFoundError());
      }

      res.status(200).json({ message: 'User successfully updated' });
    } catch (e) {
      next(e);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.removeUser({ id: req.params.id });

      res.status(200).json({ message: 'User successfully updated' });
    } catch (e) {
      next(e);
    }
  };

  suggest = async (req: Request, res: Response, next: NextFunction) => {
    const { loginSubstring = '', limit = 0 }: SuggestRequestQueryModel = req.query;

    try {
      const users = await this.userService.suggest({ loginSubstring, limit });

      res.status(200).json({ users });
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password }: UserModel = req.body;

    try {
      const token = await this.userService.getToken({ login, password });

      if (token) {
        res.status(200).json({ token, message: 'User successfully logged in' });
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e);
    }
  };
}
