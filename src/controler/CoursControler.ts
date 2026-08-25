import { Request, Response } from 'express';
import { Cours } from '../model/Cours';
import { CoursService } from '../Service/CoursService';

export class CoursControle { 

    constructor (private coursService: CoursService ){}

    // GET/POST        /api/courses         
    // PUT/DELETE /api/courses/:id

    getAll = async (req: Request, res: Response): Promise<void> => {
      try {
        const Listcours : Cours[] = await this.coursService.getAllCours(); 
        res.status(200).json(Listcours);
      } catch (error) {
        res.status(500).json({ message: "Error when intercepting exams", error });
      }
    };

    post = async (
    req: Request<{}, {}, Omit<Cours, 'id'>>, 
    res: Response
  ): Promise<void> => {
    try {
      const { nom, createdBy, description } = req.body;

      if (!nom || !createdBy || !description) {
        res.status(400).json({ message: "Les champs nom, createdBy et description sont requis." });
        return;
      }

      const newCours = await this.coursService.createCours({ nom, createdBy, description });
      res.status(201).json({ message: "Cours créé avec succès", data: newCours });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du cours", error });
    }
  };

    update = async (
    req: Request<{ id: string }, {}, Partial<Cours>>, 
    res: Response
  ): Promise<void> => {
    try {
      const coursId = Number(req.params.id);

      if (isNaN(coursId)) {
        res.status(400).json({ message: "ID de cours invalide." });
        return;
      }

      const updateData = req.body;

      if (Object.keys(updateData).length === 0) {
        res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour." });
        return;
      }

      const updatedCours = await this.coursService.updateCours(coursId, updateData);

      if (!updatedCours) {
        res.status(404).json({ message: `Cours ${coursId} introuvable.` });
        return;
      }

      res.status(200).json({ message: "Cours mis à jour avec succès", data: updatedCours });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour du cours", error });
    }
  };

    delete = async (req: Request, res: Response): Promise<void> => {
  try {
    const coursId = Number(req.params.id);

    if (isNaN(coursId)) {
      res.status(400).json({ message: "ID d'examen invalide." });
      return;
    }
    
    const isDeleted = await this.coursService.deleteCours(coursId);

    if (!isDeleted) {
      res.status(404).json({ message: `Examen ${coursId} introuvable.` });
      return;
    }

    res.status(200).json({ message: `Examen ${coursId} supprimé avec succès.` });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'examen", error });
  }
};
}