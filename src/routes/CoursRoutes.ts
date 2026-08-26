import { Router } from 'express';
import * as studentControler from '../controler/MyControler';
import { authMiddleware } from '../Security/AuthMiddleware';
import { requireRole } from '../Security/roleMiddleware';

const router = Router();

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', studentControler.getStudents);
router.post('/', studentControler.createStudent);
router.put('/:id', studentControler.updateStudent);
router.delete('/:id', studentControler.deactivateStudent);

export default router;