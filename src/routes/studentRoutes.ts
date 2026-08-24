import { Router } from 'express';
import { CompteControler } from '../controler/CompteControler';
import { authMiddleware } from '../Security/authMiddleware';
import { requireRole } from '../Security/roleMiddleware';

const router = Router();
const compteControler = new CompteControler(/* ... */);

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', compteControler.getAll);
router.post('/', compteControler.create);
router.put('/:id', compteControler.update);
router.delete('/:id', compteControler.delete);

export default router;