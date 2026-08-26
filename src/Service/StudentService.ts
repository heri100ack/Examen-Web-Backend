import { StudentRepository } from '../repository/StudentRepository'
import {CompteEleve, CreateStudentDTO} from '../model/Compte'
import bcrypt from 'bcryptjs';

export class StudentService { 
    private studentRepository = new StudentRepository;
    async Save (Compte:CreateStudentDTO):Promise <Omit<CompteEleve, 'passwordHash'>>{ 
        const { password, ...autresDonnees } = Compte;

        const passwordHash = await bcrypt.hash(password, 10);

        const comptePourBDD = {
            ...autresDonnees,
            passwordHash
        };

        return await this.studentRepository.create(comptePourBDD);
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