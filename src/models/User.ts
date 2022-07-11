import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BOOLEAN, INTEGER, Model, STRING, UUID, UUIDV4 } from 'sequelize';

import { sequelize } from '../initialization';
import type { UserModel } from '../interfaces/User';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserModel {
  declare age: number;
  declare id: CreationOptional<string>;
  declare isDeleted: CreationOptional<boolean>;
  declare login: string;
  declare password: string;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
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
      defaultValue: false,
    },
  },
  { modelName: 'user', sequelize },
);

export { User };
