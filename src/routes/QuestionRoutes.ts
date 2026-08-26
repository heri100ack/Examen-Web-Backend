import { Router } from 'express';
import * as questionControler from '../controler/QuestionControler';
import { authMiddleware } from '../Security/AuthMiddleware';
import { requireRole } from '../Security/roleMiddleware';

const router = Router();

router.use(authMiddleware, requireRole('ADMIN'));

router.put('/:id', questionControler.updateQuestion);
router.delete('/:id', questionControler.deleteQuestion);

export default router;