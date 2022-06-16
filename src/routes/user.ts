import { Router } from 'express';

import { API_PREFIX_V1 } from '../config/router.config';
import { create, getAll, remove, suggest, update } from '../controllers/user';
import { bodySchema, validator } from '../validators/user';

const router = Router();

router.post('/', validator.body(bodySchema), create);
router.get('/', getAll);
router.put('/:id', validator.body(bodySchema), update);
router.get('/suggest', suggest);
router.delete('/:id', remove);

const userRoutePath = `${API_PREFIX_V1}/user`;

export { router as userRoutes, userRoutePath };
