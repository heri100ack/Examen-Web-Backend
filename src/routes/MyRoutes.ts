import { Router } from 'express';
import { MyControler } from '../controler/MyControler';
import { MyService } from '../Service/MyService';
import { authMiddleware } from '../Security/AuthMiddleware';
import { requireRole } from '../Security/roleMiddleware';


const router = Router();

const myService = new MyService();
const myControler = new MyControler(myService);

router.use(authMiddleware, requireRole('STUDENT'));

router.get('/exams', myControler.getMyExams);
router.get('/exams/:id', myControler.getMyExamById);
router.post('/exams/:id/submit', myControler.submitExam);
router.get('/results', myControler.getMyResults);

export default router;




