import type { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import type { SuggestRequestQueryModel, UserModel } from '../models/User';

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

const create = (req: Request, res: Response) => {
  const { login, age, password }: UserModel = req.body;

  if (!(login && password && age)) {
    res.status(400).json({ message: 'Please provide all required fields' });

    return;
  }

  const user: UserModel = {
    id: uuidv4(),
    login,
    password,
    age,
    isDeleted: false,
  };

  db.users = [...db.users, user];

  res.status(201).json({ id: user.id, message: 'User successfully created' });
};

const update = (req: Request, res: Response) => {
  const { login, age, password }: UserModel = req.body;

  const userToUpdate = db.users.find((user) => user.id === req.params.id);

  if (userToUpdate) {
    const updatedUser: UserModel = {
      ...userToUpdate,
      ...(login && { login }),
      ...(age && { age }),
      ...(password && { password }),
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

export { create, update, remove, suggest };
