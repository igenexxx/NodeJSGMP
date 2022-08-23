import type { NextFunction, Request, Response } from 'express';
import type { ValidatedRequest } from 'express-joi-validation';
import status from 'http-status';
import { inject, injectable } from 'inversify';

import type { GroupModel } from '../interfaces/Group';
import type { UserGroupModel } from '../interfaces/UserGroup';
import { NotFoundError } from '../services/error-handlers.service';
import { GroupService } from '../services/group.service';
import type { GroupRequestSchemaModel } from '../validators/group';

@injectable()
export class GroupController {
  constructor(@inject(GroupService) private groupService: GroupService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await this.groupService.getAllGroups();

      res.json(groups);
    } catch (e) {
      next(e);
    }
  };

  create = async (req: ValidatedRequest<GroupRequestSchemaModel>, res: Response, next: NextFunction) => {
    const { name, permissions }: GroupModel = req.body;

    try {
      const group = await this.groupService.createGroup({ name, permissions });

      res.status(status.CREATED).json({ groupId: group.get('id'), message: 'Group successfully created' });
    } catch (e) {
      next(e);
    }
  };

  update = async (req: ValidatedRequest<GroupRequestSchemaModel>, res: Response, next: NextFunction) => {
    const { name, permissions }: GroupModel = req.body;

    try {
      const [affectedCount] = await this.groupService.updateGroup({ name, permissions, id: req.params.id });

      if (!affectedCount) {
        next(new NotFoundError());
      }

      res.status(status.OK).json({ message: 'Group successfully updated' });
    } catch (e) {
      next(e);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.groupService.deleteGroup(req.params.id);

      res.status(status.OK).json({ message: 'Group successfully deleted' });
    } catch (e) {
      next(e);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await this.groupService.getGroupById(req.params.id);

      res.json({ group });
    } catch (e) {
      next(e);
    }
  };

  addUsersToGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { userIds }: UserGroupModel = req.body;
    const groupId = req.params.id;

    try {
      await this.groupService.addUsersToGroup(userIds, groupId);

      res.status(200).json({ message: 'Users successfully added to group' });
    } catch (e) {
      next(e);
    }
  };
}
