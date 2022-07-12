import { Group } from './Group';
import { User } from './User';

User.belongsToMany(Group, { through: 'UserGroup', onDelete: 'cascade' });
Group.belongsToMany(User, { through: 'UserGroup', onDelete: 'cascade' });
