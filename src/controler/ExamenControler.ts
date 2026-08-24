import { Request, Response } from 'express';
import { Examen, ExamenAvecQuestionsEtLesReponses, ExamenPublique } from '../model/Examen';

export const getAllExams = async (req: Request, res: Response): Promise<void> => {
  try {
    const examens: ExamenPublique[] = []; 
    res.status(200).json(examens);
  } catch (error) {
    res.status(500).json({ message: "Error when intercepting exams", error });
  }
};

export const getExamById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const examId = Number(req.params.id);
    res.status(200).json({ id: examId });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

