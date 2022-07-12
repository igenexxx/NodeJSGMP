import { injectable } from 'inversify';

import type { GroupModel } from '../interfaces/Group';
import { Group } from '../models';

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
}
