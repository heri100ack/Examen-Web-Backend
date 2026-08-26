import { Router } from 'express';
import { StudentControler } from '../controler/StudentControler';
import { authMiddleware } from '../Security/AuthMiddleware';
import { requireRole } from '../Security/roleMiddleware';

const router = Router();
const studentControler = new StudentControler;

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', compteControler.getAll);
router.post('/', compteControler.create);
router.put('/:id', compteControler.update);
router.delete('/:id', compteControler.delete);

export default router;