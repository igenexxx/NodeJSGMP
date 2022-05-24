import { Router } from 'express';

import { create, remove, suggest, update } from '../controllers/user';
import { bodySchema, validator } from '../validators/user';

const router = Router();

router.post('/', validator.body(bodySchema), create);
router.put('/:id', validator.body(bodySchema), update);
router.get('/suggest', suggest);
router.delete('/:id', remove);

export { router as userRoutes };
