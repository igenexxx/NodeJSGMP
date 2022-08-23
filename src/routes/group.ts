import { Router } from 'express';
import { inject, injectable } from 'inversify';

import { API_PREFIX_V1 } from '../config/router.config';
import { GroupController } from '../controllers/group';
import { authCheckMiddleware } from '../services/auth.service';
import { bodySchema, validator } from '../validators/group';

const router = Router();

@injectable()
class GroupRouter {
  constructor(@inject(GroupController) private groupController: GroupController) {
    router.post('/', validator.body(bodySchema), this.groupController.create);
    router.get('/', this.groupController.getAll);
    router.get('/:id', authCheckMiddleware, this.groupController.getById);
    router.put('/:id', authCheckMiddleware, validator.body(bodySchema), this.groupController.update);
    router.delete('/:id', authCheckMiddleware, this.groupController.remove);
    router.post('/:id/user', this.groupController.addUsersToGroup);
  }

  getRouter() {
    return router;
  }
}

const groupRoutePath = `${API_PREFIX_V1}/group`;

export { GroupRouter, groupRoutePath };
