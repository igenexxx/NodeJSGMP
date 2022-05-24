import { Router } from 'express';

import { create, remove, suggest, update } from '../controllers/user';
import { querySchema, validator } from '../validators/user';

const router = Router();

router.post('/', validator.body(querySchema), create);
router.put('/:id', validator.body(querySchema), update);
router.get('/suggest', suggest);
router.delete('/:id', remove);

export { router as userRoutes };
