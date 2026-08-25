import { Request, Response } from 'express';
import { Examen, ExamenPublique } from '../model/Examen';
import { ExamenService } from '../Service/ExamenService';
<<<<<<< HEAD
import { CreateQuestion, Question } from '../model/Question';

export class ExamenControler { 
  constructor(private examenService: ExamenService) {}

 getAllExams = async (req: Request, res: Response): Promise<void> => {
=======

export class ExamenControler {
  private examenService = new ExamenService();

async getAllExams(req: Request, res: Response): Promise<void> {
>>>>>>> 0938a08bb83e18e85534ae6679cd005376a1f4c8
  try {
    const examens: ExamenPublique[] = []; 
    res.status(200).json(examens);
  } catch (error) {
    res.status(500).json({ message: "Error when intercepting exams", error });
  }
};

<<<<<<< HEAD
 getExamById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
=======
async getExamById(req: Request<{ id: string }>, res: Response): Promise<void> {
>>>>>>> 0938a08bb83e18e85534ae6679cd005376a1f4c8
  try {
    const examId = Number(req.params.id);
    res.status(200).json({ id: examId });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

<<<<<<< HEAD
 createExam = async (
=======
async createExam(
>>>>>>> 0938a08bb83e18e85534ae6679cd005376a1f4c8
  req: Request<{}, {}, Omit<Examen, 'id' | 'dateCreation'>>, 
  res: Response
): Promise<void> {
  try {
    const { matiereId, titre, dateDebut, dateFin, createdBy, groupeId } = req.body;

    if (!titre || !matiereId || !groupeId) {
      res.status(400).json({ message: "Title, subject ID, and group ID are required." });
      return;
    }
    res.status(201).json({ message: "Exam created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating exam", error });
  }
};

<<<<<<< HEAD
  updateExam = async (
=======
async updateExam(
>>>>>>> 0938a08bb83e18e85534ae6679cd005376a1f4c8
  req: Request<{ id: string }, {}, Partial<Examen>>, 
  res: Response
): Promise<void> {
  try {
    const examId = Number(req.params.id);
    const updateData = req.body;
    res.status(200).json({ message: "Exam " + examId + " updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating exam", error });
  }
};

<<<<<<< HEAD
  deleteExam = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
=======
async deleteExam(req: Request<{ id: string }>, res: Response): Promise<void> {
>>>>>>> 0938a08bb83e18e85534ae6679cd005376a1f4c8
  try {
    const examId = Number(req.params.id);
    res.status(200).json({ message: "Examen " + examId + " deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exam", error });
  }
<<<<<<< HEAD
};
  // router.get('/:id/questions', examenControler.getQuestions);
  // router.post('/:id/questions', examenControler.addQuestion);
  
  // router.get('/:id/results', examenControler.getExamResults);

  getAllQuestionOfExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const examenId = req.params.id; 
    const questions = await this.examenService.getAllQuestions(examenId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error when intercepting exams", error });
  }
};

  createQuestionOfExam = async (req: Request <{ examenId: number },{},CreateQuestion>,
    res: Response): Promise<void> => {
  try {
    const { examenId } = req.params.id;
    const { texte, type, points } = req.body;
    const nouvelleQuestion = { 
      examenId, 
      texte ,
      type ,
      points 
    }
    
    if (!examenId || !points || !type || !texte) {
      res.status(400).json({ message: "L'ID de l'examen, le type et les points sont requis." });
      return;
    }
    await this.examenService.AddQuestion(nouvelleQuestion);
    
    res.status(201).json({ message: "Question créée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
}; 

  getExamResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const examenId = req.params.id; 
    const questions = await ExamenService.getAllResuslts(examenId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error when intercepting exams", error });
  }
};
 
}
=======
}

}

export const examenControler = new ExamenControler();
>>>>>>> 0938a08bb83e18e85534ae6679cd005376a1f4c8
