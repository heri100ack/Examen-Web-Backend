import { Request, response, Response } from 'express';
import { Examen } from '../model/Examen';
import { ExamenService } from '../Service/ExamenService';
import { CreateQuestion, QuestionAvecReponses } from '../model/Question';

export class ExamenControler { 
  constructor(private examenService: ExamenService) {}

 getAllExams = async (req: Request, res: Response): Promise<void> => {
  try {

    const examens : Examen[] = await this.examenService.getAllExamens(); 
    res.status(200).json(examens);
  } catch (error) {
    res.status(500).json({ message: "Error when intercepting exams", error });
  }
};

 getExamById = async (req: Request, res: Response): Promise<void> => {
  try {
    const examId = Number(req.params.id);
    const Exam = await this.examenService.getExamById(examId);
    res.status(200).json({Exam});
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

 createExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { matiereId, titre, dateDebut, dateFin, groupeId } = req.body as Omit<Examen, 'id' | 'dateCreation'>;

    if (!titre || !matiereId || !groupeId || !dateDebut || !dateFin) {
      res.status(400).json({ message: "Title, subject ID, group ID, and dates are required." });
      return;
    }

    if (new Date(dateDebut) > new Date(dateFin)) { 
      res.status(422).json({ message: "Les dates ne coïncident pas." });
      return;
    }

    res.status(201).json({ message: "Exam created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating exam", error });
  }
};

  updateExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const examId = Number(req.params.id);

    if (isNaN(examId)) {
      res.status(400).json({ message: "ID invalide" });
      return;
    }

   const updateData = req.body as Partial<Examen>;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour." });
      return;
    }
    const updatedExam = await this.examenService.updateExam(examId, updateData);
    res.status(200).json({ 
      message: `Exam ${examId} updated successfully`,
      data: updatedExam
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating exam", error });
  }
};

  deleteExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const examId = Number(req.params.id);

    if (isNaN(examId)) {
      res.status(400).json({ message: "ID d'examen invalide." });
      return;
    }
    
    const isDeleted = await this.examenService.deleteExam(examId);

    if (!isDeleted) {
      res.status(404).json({ message: `Examen ${examId} introuvable.` });
      return;
    }

    res.status(200).json({ message: `Examen ${examId} supprimé avec succès.` });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'examen", error });
  }
};

  // router.get('/:id/questions', examenControler.getQuestions);
  // router.post('/:id/questions', examenControler.addQuestion);
  // router.get('/:id/results', examenControler.getExamResults);

  getAllQuestionOfExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const examenId = Number(req.params.id); 
    const questions = await this.examenService.getAllQuestions(examenId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error when intercepting exams", error });
  }
  };

  postQuestionOfExam = async (
  req: Request<{ examenId: string }, {}, Omit <QuestionAvecReponses,'id'>>,
  res: Response
): Promise<void> => {
  try {
    const examenId = Number(req.params.examenId);
    const { texte, type, points ,reponses } = req.body;

    if (isNaN(examenId) || !points || !type || !texte) {
      res.status(400).json({ message: "L'ID de l'examen, le texte, le type et les points sont requis." });
      return;
    }

    const nouvelleQuestion = { 
      examenId, 
      texte,
      type,
      points,
      reponses
    };
    
    await this.examenService.AddQuestion(nouvelleQuestion);
    
    res.status(201).json({ message: "Question créée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
};

  getExamResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const examenId = Number(req.params.id); 
    const questions = await this.examenService.getAllResuslts(examenId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error when intercepting exams", error });
  }
};
 
}
