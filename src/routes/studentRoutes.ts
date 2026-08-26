import { Router } from 'express';
import { StudentControler } from '../controler/StudentControler';
import { authMiddleware } from '../Security/AuthMiddleware';
import { requireRole } from '../Security/roleMiddleware';

const router = Router();
const studentControler = new StudentControler();

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', StudentControler.getAll);
router.get('/id', StudentControler.getById);
router.post('/', StudentControler.create);
router.put('/:id', StudentControler.update);

export default router;