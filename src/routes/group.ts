import { Router } from 'express';

import { myContainer } from '../config/inversify.config';
import { API_PREFIX_V1 } from '../config/router.config';
import { GroupController } from '../controllers/group';
import { authCheckMiddleware } from '../services/auth.service';
import { bodySchema, validator } from '../validators/group';

const router = Router();

const groupController = myContainer.get(GroupController);

router.post('/', validator.body(bodySchema), groupController.create);
router.get('/', groupController.getAll);
router.get('/:id', authCheckMiddleware, groupController.getById);
router.put('/:id', authCheckMiddleware, validator.body(bodySchema), groupController.update);
router.delete('/:id', authCheckMiddleware, groupController.remove);
router.post('/:id/user', groupController.addUsersToGroup);

const groupRoutePath = `${API_PREFIX_V1}/group`;

export { router as groupRoutes, groupRoutePath };
