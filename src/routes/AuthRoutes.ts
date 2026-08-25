import { Router } from 'express';
import * as authControler from '../controler/AuthControler';

const router = Router();
router.post('/login', authControler.login);

export default router;