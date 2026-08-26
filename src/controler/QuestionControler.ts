import { Request, Response } from 'express';
import { QuestionService } from '../Service/QuestionService';
import { AuthRequest } from '../Security/AuthMiddleware';

export class QuestionControler {
  constructor(private questionService: QuestionService) {}

  updateQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const questionId = Number(id);

      if (isNaN(questionId)) {
        res.status(400).json({ message: "L'identifiant de la question est invalide." });
        return;
      }

      const updateData = req.body;

      if (!updateData || Object.keys(updateData).length === 0) {
        res.status(400).json({ message: 'Les données de mise à jour sont requises.' });
        return;
      }

      const updatedQuestion = await this.questionService.updateQuestion(questionId, updateData);

      if (!updatedQuestion) {
        res.status(404).json({ message: 'Question non trouvée.' });
        return;
      }

      res.status(200).json(updatedQuestion);
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la question.', error: error.message });
    }
  };

  deleteQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const questionId = Number(id);

      if (isNaN(questionId)) {
        res.status(400).json({ message: "L'identifiant de l'question est invalide." });
        return;
      }

      const deleted = await this.questionService.deleteQuestion(questionId);

      if (!deleted) {
        res.status(404).json({ message: 'Question non trouvée.' });
        return;
      }

      res.status(200).json({ message: 'Question supprimée avec succès.' });
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: 'Erreur lors de la suppression de la question.', error: error.message });
    }
  };
}