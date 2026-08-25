import { Request, Response } from 'express';
import { StudentService } from '../service/StudentService';

export class StudentController {
    private service = new StudentService();

    async getAll(req: Request, res: Response) {
        const students = await this.service.getAll();
        res.json(students);
    }

    async create(req: Request, res: Response) {
        const student = await this.service.create(req.body);
        res.status(201).json(student);
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const updated = await this.service.update(id, req.body);
        if (!updated) {
            res.status(404).json({ message: 'Étudiant introuvable' });
            return;
        }
        res.json(updated);
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const deactivated = await this.service.deactivate(id);
        if (!deactivated) {
            res.status(404).json({ message: 'Étudiant introuvable' });
            return;
        }
        res.json({ message: 'Étudiant désactivé', student: deactivated });
    }
}
