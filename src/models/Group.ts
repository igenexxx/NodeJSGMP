import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { ARRAY, Model, STRING, UUID, UUIDV4 } from 'sequelize';

import { sequelize } from '../initialization';
import type { GroupModel, PermissionModel } from '../interfaces/Group';

class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> implements GroupModel {
  declare id: CreationOptional<string>;
  declare name: string;
  declare permissions: PermissionModel[];
}

Group.init(
  {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    name: {
      type: STRING,
      unique: true,
    },
    permissions: {
      type: process.env.NODE_ENV !== 'development' ? STRING : ARRAY(STRING),
    },
  },
  { modelName: 'group', sequelize },
);

export { Group };
