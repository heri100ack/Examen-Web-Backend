import { StudentRepository } from '../repository/StudentRepository'
import {CompteEleve} from '../model/Compte'
export class StudentService { 
    private studentRepository = new StudentRepository;
    async Save (Compte:Omit<CompteEleve, 'id'>):Promise <Omit<CompteEleve, 'passwordHash'>>{ 
        return this.studentRepository.create(Compte);
    }
    async getAll ():Promise <Omit<CompteEleve, 'passwordHash'>[]>{ 
        return this.studentRepository.findAll();
    }
    async update (Compte:Partial<Omit<CompteEleve, 'id'>>,compteId: number):Promise <Omit<CompteEleve, 'passwordHash'>| null>{ 
        return this.studentRepository.update(compteId,Compte);
    }
    async delete (CompteId:number ):Promise <boolean>{
        return this.studentRepository.delete(CompteId);
    }
}