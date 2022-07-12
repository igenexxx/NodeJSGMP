import { injectable } from 'inversify';
import { Op } from 'sequelize';

import { sequelize } from '../initialization';
import type { GroupModel } from '../interfaces/Group';
import { Group, User } from '../models';

@injectable()
export class GroupService {
  async getGroupById(id: string) {
    return await Group.findOne({ where: { id } });
  }

  async getAllGroups() {
    return await Group.findAll();
  }

  async createGroup(group: Omit<GroupModel, 'id'>) {
    const { name, permissions } = group;

    return await Group.create({ name, permissions });
  }

  async updateGroup(group: Partial<GroupModel>) {
    return await Group.update(group, { where: { id: group.id } });
  }

  async deleteGroup(id: string) {
    return await Group.destroy({ where: { id } });
  }

  async addUsersToGroup(userIds: string[], groupId: string) {
    try {
      return await sequelize.transaction(async (t) => {
        const users = await User.findAll({ where: { id: { [Op.in]: userIds } }, transaction: t });
        const group = await Group.findByPk(groupId, { transaction: t });

        // How to manage m2m relations in a proper way?
        await Promise.allSettled(users.map((user) => (user as any).addGroup(group, { transaction: t })));
      });
    } catch (e) {
      console.log(e);
    }
  }
}
