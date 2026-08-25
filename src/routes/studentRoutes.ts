import { Router } from 'express';
import { StudentController } from '../controler/StudentController';
import { authMiddleware } from '../Security/authMiddleware';
import { requireRole } from '../Security/roleMiddleware';

const router = Router();
const controller = new StudentController();

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', controller.getAll.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
