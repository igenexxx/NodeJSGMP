import { Router } from 'express';
import { inject, injectable } from 'inversify';

import { API_PREFIX_V1 } from '../config/router.config';
import { UserController } from '../controllers/user';
import { bodySchema, validator } from '../validators/user';

const router = Router();

@injectable()
class UserRouter {
  constructor(@inject(UserController) private userController: UserController) {
    router.post('/', validator.body(bodySchema), userController.create);
    router.get('/', userController.getAll);
    router.put('/:id', validator.body(bodySchema), userController.update);
    router.get('/suggest', userController.suggest);
    router.delete('/:id', userController.remove);
    router.post('/login', userController.login);
  }

  getRouter() {
    return router;
  }
}

const userRoutePath = `${API_PREFIX_V1}/user`;

export { UserRouter, userRoutePath };
