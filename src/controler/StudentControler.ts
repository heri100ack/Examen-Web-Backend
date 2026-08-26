import { Request, Response } from 'express';
import { CompteEleve, CreateStudentDTO } from "../model/Compte";
import { StudentService } from "../Service/StudentService";
import { AuthRequest} from '../Security/AuthMiddleware';


export class StudentControler { 
    constructor (private studentService: StudentService){}

    getAll = async (req: Request, res: Response): Promise<void> => {
          try {
            const Listcours : Omit<CompteEleve,"passwordHash">[] = await this.studentService.getAll(); 
            res.status(200).json(Listcours);
          } catch (error) {
            res.status(500).json({ message: "Error when intercepting exams", error });
          }
        };
    
    post = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const studentData: CreateStudentDTO = req.body;
    const { nom, email, password, groupeId, role } = studentData;

    
    if (!nom || !email || !password || !groupeId || role === undefined) {
      res.status(400).json({ message: "Les champs nom, email, password, groupeId et role sont requis." });
      return;
    }

    const newStudent = await this.studentService.Save(studentData);
    res.status(201).json({ message: "Élève créé avec succès", data: newStudent });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Erreur lors de la création de l'élève", error: err.message });
  }
};
    
    update = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const studentId = Number(id);

      if (isNaN(studentId)) {
        res.status(400).json({ message: "ID d'élève invalide." });
        return;
      }

      const updateData: Partial<CompteEleve> = req.body;

      if (Object.keys(updateData).length === 0) {
        res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour." });
        return;
      }

      const updatedStudent = await this.studentService.update(updateData, studentId);

      if (!updatedStudent) {
        res.status(404).json({ message: `Élève ${studentId} introuvable.` });
        return;
      }

      res.status(200).json({ message: "Élève mis à jour avec succès", data: updatedStudent });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'élève", error: err.message });
    }
  };

    
        delete = async (req: Request, res: Response): Promise<void> => {
      try {
        const coursId = Number(req.params.id);
    
        if (isNaN(coursId)) {
          res.status(400).json({ message: "ID d'examen invalide." });
          return;
        }
        
        const isDeleted = await this.studentService.delete(coursId);
    
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