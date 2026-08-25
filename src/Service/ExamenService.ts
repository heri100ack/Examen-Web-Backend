import { Examen, ExamenPublique, ExamenAvecQuestionsEtLesReponses } from '../model/Examen';

export class ExamenService {
async getAllExams(): Promise<ExamenPublique[]> {
        const examens: ExamenPublique[] = [];
    return examens;
  }

async getExamById(id: number): Promise<Examen | null> {
    return null;
}

async createExam(data: Omit<Examen, 'id' | 'dateCreation'>): Promise<Examen> {
    const newExam: Examen = { id: Date.now(),...data, dateCreation: new Date()
    };
    return newExam;
}

async updateExam(id: number, updateData: Partial<Examen>): Promise<Examen | null> {
    return null;
}

async deleteExam(id: number): Promise<boolean> {
    return true;
}

async getFullExam(id: number): Promise<ExamenAvecQuestionsEtLesReponses | null> {
    return null;
}

}

export const examenService = new ExamenService();