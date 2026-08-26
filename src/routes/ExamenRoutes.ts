import { Router } from 'express';
import * as examenControler from '../controler/ExamenControler';
import { authMiddleware } from '../Security/AuthMiddleware';
import { requireRole } from '../Security/roleMiddleware';

const router = Router();

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', examenControler.getExams);
router.post('/', examenControler.createExam);

router.get('/:id', examenControler.getExamById);
router.put('/:id', examenControler.updateExam);
router.delete('/:id', examenControler.deleteExam);

router.get('/:id/questions', examenControler.getQuestions);
router.post('/:id/questions', examenControler.addQuestion);

router.get('/:id/results', examenControler.getExamResults);

export default router;