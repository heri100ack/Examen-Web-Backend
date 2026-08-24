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

export const createExam = async (
  req: Request<{}, {}, Omit<Examen, 'id' | 'dateCreation'>>, 
  res: Response
): Promise<void> => {
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

export const updateExam = async (
  req: Request<{ id: string }, {}, Partial<Examen>>, 
  res: Response
): Promise<void> => {
  try {
    const examId = Number(req.params.id);
    const updateData = req.body;
    res.status(200).json({ message: "Exam " + examId + " updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating exam", error });
  }
};
