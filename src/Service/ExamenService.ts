import { Examen, ExamenPublique } from '../model/Examen';

export class ExamenService {
    async getAllExams(): Promise<ExamenPublique[]> {
        const examens: ExamenPublique[] = [];
    return examens;
  }

async getExamById(id: number): Promise<Examen | null> {
    return null;
}
}