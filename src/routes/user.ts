import { Router } from 'express';

import { myContainer } from '../config/inversify.config';
import { API_PREFIX_V1 } from '../config/router.config';
import { UserController } from '../controllers/user';
import { bodySchema, validator } from '../validators/user';

const router = Router();

const userController = myContainer.get(UserController);

router.post('/', validator.body(bodySchema), userController.create);
router.get('/', userController.getAll);
router.put('/:id', validator.body(bodySchema), userController.update);
router.get('/suggest', userController.suggest);
router.delete('/:id', userController.remove);
router.post('/login', userController.login);

const userRoutePath = `${API_PREFIX_V1}/user`;

export { router as userRoutes, userRoutePath };
