import type { Request, Response } from 'express';
import type { ValidatedRequest } from 'express-joi-validation';

import type { SuggestRequestQueryModel, UserModel } from '../interfaces/User';
import { User } from '../models/User';
import type { UserRequestSchemaModel } from '../validators/user';

const db: { users: UserModel[] } = {
  users: [
    {
      id: '1',
      password: '1u23',
      age: 5,
      login: 'Sasha',
      isDeleted: false,
    },
    {
      id: '2',
      password: '1e23',
      age: 25,
      login: 'Senya',
      isDeleted: false,
    },
    {
      id: '3',
      password: '1c23',
      age: 35,
      login: 'Sonya',
      isDeleted: false,
    },
    {
      id: '4',
      password: '12b3',
      age: 15,
      login: 'Sergey',
      isDeleted: false,
    },
    {
      id: '4',
      password: '123a',
      age: 25,
      login: 'Sveta',
      isDeleted: false,
    },
  ],
};

const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    if (users.length) {
      res.status(200).json({ users });
    } else {
      res.status(404).json({ message: 'Users not found' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const create = async (req: ValidatedRequest<UserRequestSchemaModel>, res: Response) => {
  const { login, age, password }: UserModel = req.body;

  const user: UserModel = {
    login,
    password,
    age: +age,
    isDeleted: false,
  };

  await User.create(user);

  res.status(201).json({ id: user.id, message: 'User successfully created' });
};

const update = (req: Request, res: Response) => {
  const { login, age, password }: UserModel = req.body;

  const userToUpdate = db.users.find((user) => user.id === req.params.id);

  if (userToUpdate) {
    const updatedUser: UserModel = {
      ...userToUpdate,
      login,
      password,
      age,
    };

    res.status(200).json({ id: updatedUser.id, message: 'User successfully updated' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const remove = (req: Request, res: Response) => {
  db.users = db.users.map((user) => (user.id === req.params.id ? { ...user, isDeleted: true } : user));

  res.status(200).json({ message: 'User has been mark for deletion' });
};

const suggest = (req: Request, res: Response) => {
  const { loginSubstring, limit = 5 }: SuggestRequestQueryModel = req.query;

  const suggestedUsers = loginSubstring
    ? [
        ...db.users.filter(({ login }) => login.toLowerCase().includes(loginSubstring.toLowerCase())).slice(0, limit),
      ].sort((a, b) => (a.login > b.login ? 1 : -1))
    : [];

  res.status(200).json({ users: suggestedUsers });
};

export { getAll, create, update, remove, suggest };
