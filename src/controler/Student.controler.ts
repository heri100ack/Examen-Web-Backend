import {Request ,Response ,Express } from "express";
import {StudentService} from "../Service/StudentService" ;

export class StudentControler { 
    private studentService : StudentService ; 
    private setupChemin(app: Express): void {
    app.get('/students', (req, res) => this.getAll(req, res));
    app.get('/students/:id', (req, res) => this.getById(req, res));
    app.post('/students', (req, res) => this.create(req, res));
    app.put('/students/:id', (req, res) => this.update(req, res));
    app.patch('/students/:id', (req, res) => this.patch(req, res));
    app.delete('/students/:id', (req, res) => this.delete(req, res));
  }
    constructor (app: Express){ 
        this.studentService = new StudentService() ; 
        this.setupChemin(app);
    }
    
    private async getAll(req: Request, res: Response) {
    try {
      const students = await this.studentService.FindAllStudent();
      res.status(200).json(students);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const student = await this.studentService.getStudentById(id);
      res.status(200).json(student);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private async create(req: Request, res: Response) {
    try {
      const student = await this.studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const student = await this.studentService.updateStudent(id, req.body);
      res.status(200).json(student);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private async patch(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      const student = await this.studentService.updateStudent(id, req.body);
      res.status(200).json(student);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string, 10);
      await this.studentService.deleteStudent(id);
      res.status(204).send();
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): void {
    const message = error instanceof Error ? error.message : 'Internal server error';

    if (message.includes('not found')) {
      res.status(404).json({ error: message });
    } else if (
      message.includes('already exists') ||
      message.includes('required') ||
      message.includes('Invalid')
    ) {
      res.status(400).json({ error: message });
    } else {
      res.status(500).json({ error: message });
    }
  }
}