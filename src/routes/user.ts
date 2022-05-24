import { Router } from 'express';

import { create, remove, suggest, update } from '../controllers/user';

const router = Router();

router.post('/', create);
router.put('/:id', update);
router.get('/suggest', suggest);
router.delete('/:id', remove);

export { router as userRoutes };
