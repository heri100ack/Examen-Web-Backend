import { Cours } from "../model/Cours";
import { CoursRepository } from "../repository/CoursRepository";

export class CoursService { 
    private coursRepository = new CoursRepository ;

    async getAllCours():Promise <Cours[]>{ 
        return this.coursRepository.findAll();
    }
    async createCours(data: Omit<Cours, 'id'>): Promise<Cours> {
    if (!data.nom || data.nom.trim() === '') {
      throw new Error("Le nom du cours ne peut pas être vide.");
    }

    return await this.coursRepository.create(data);
  }
    async updateCours(id: number, data: Partial<Cours>): Promise<Cours | null> {
    if (data.nom !== undefined && data.nom.trim() === '') {
        throw new Error("Le nom du cours ne peut pas être vide.");
    }

    return await this.coursRepository.update(id, data);
    }
    async deleteCours(coursId: number) : Promise <boolean>{ 
        return this.coursRepository.delete(coursId);
    }
}