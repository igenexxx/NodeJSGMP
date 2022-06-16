import type { InferAttributes, InferCreationAttributes } from 'sequelize';
import { BOOLEAN, INTEGER, Model, STRING } from 'sequelize';

import { sequelize } from '../loaders/database.loader';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {}

User.init(
  {
    login: {
      type: STRING,
    },
    password: {
      type: STRING,
    },
    age: {
      type: INTEGER,
    },
    isDeleted: {
      type: BOOLEAN,
    },
  },
  { modelName: 'user', sequelize },
);

export { User };
