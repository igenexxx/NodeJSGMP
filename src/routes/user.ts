import { Router } from 'express';
import { inject, injectable } from 'inversify';

import { API_PREFIX_V1 } from '../config/router.config';
import { UserController } from '../controllers/user';
import { bodySchema, validator } from '../validators/user';

const router = Router();

@injectable()
class UserRouter {
  constructor(@inject(UserController) private userController: UserController) {
    router.post('/', validator.body(bodySchema), this.userController.create);
    router.get('/', this.userController.getAll);
    router.put('/:id', validator.body(bodySchema), this.userController.update);
    router.get('/suggest', this.userController.suggest);
    router.delete('/:id', this.userController.remove);
    router.post('/login', this.userController.login);
  }

  getRouter() {
    return router;
  }
}

const userRoutePath = `${API_PREFIX_V1}/user`;

export { UserRouter, userRoutePath };
