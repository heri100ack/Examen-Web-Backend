import { Response } from 'express';
import { AuthRequest } from '../Security/authMiddleware';
import { MyService } from '../Service/MyService';
import { CreateSoumissionDTO } from '../model/Soumission';

export class MyControler {
  
  constructor(private myService: MyService) {}

  getMyExams = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'STUDENT') {
      res.status(403).json({ message: 'Accès réservé aux étudiants.' });
      return;
    }
    if (!req.user.groupeId) {
      res.status(400).json({ message: 'L\'étudiant n\'est rattaché à aucun groupe.' });
      return;
    }
    const exams = await this.myService.getExamsDisponibles(req.user.id,req.user.groupeId);
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

  getMyExamById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const groupeId = Number(req.user?.groupeId);
      const exam = await this.myService.getMyExamById(groupeId);

      if (!exam) {
        res.status(404).json({ message: 'Examen introuvable.' });
        return;
      }

      res.status(200).json(exam);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };

  submitExam = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const examId = Number(id);
      
      if (isNaN(examId)) {
        res.status(400).json({ message: "L'identifiant de l'examen est invalide." });
        return;
      }

      const { reponses } = req.body;

      if (!Array.isArray(reponses) || reponses.length === 0) {
        res.status(400).json({ message: 'La liste des réponses est requise et ne peut pas être vide.' });
        return;
      }

      const soumissionData: CreateSoumissionDTO = {
        userId: req.user!.id, 
        examenId: examId,
        dateSoumission: new Date(),
      };

      
      const result = await this.myService.submitExamen(soumissionData, examId);

      res.status(201).json(result);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ message: error.message });
    }
  };


  getMyResults = async (req: AuthRequest, res: Response): Promise<void> => {

    try {
      const results = await this.myService.getMyResults(req.user!.id);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };
}