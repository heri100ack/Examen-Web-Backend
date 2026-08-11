import { promises } from "node:dns";
import { Student , CreateStudentDTO,UpdateStudentDTO}  from "../model/Student"; 
import {StudentRepository} from "../repository/StudentRepository";
import { error } from "node:console";
import { throws } from "node:assert";

export class StudentService{ 
    private studentRepository : StudentRepository;

    constructor(){ 
        this.studentRepository = new StudentRepository ;
    }
    async FindAllStudent (): Promise<Student[]>{ 
        return this.studentRepository.findAll();
    }
    async getStudentById (id : number ): Promise<Student> { 
        const student = await this.studentRepository.findById(id);
        if (!student) {
                        throw new Error(`Étudiant avec l'ID ${id} introuvable`);
            }
        return student;
    }
    async createStudent(data: CreateStudentDTO): Promise<Student>{
        const student = await this.studentRepository.findByCIN(data.CIN);
        if (student){ 
            throw new Error("T es deja inscrit!");
        }
        const newStudent = await this.studentRepository.create(data);
        return newStudent;

    } 
    async updateStudent (id: number , data: UpdateStudentDTO): Promise<Student>{ 
        const student = await this.studentRepository.findById(id);
        if (!student){ 
            throw new Error("il n a jms eu d etudiants avec cette id ");
        }
        const alterStudent = await this.studentRepository.update(id,data);
        if (!alterStudent){ 
            throw new Error("il n a jms eu d etudiants avec cette id ")
        }
        return alterStudent;
    }
    async deleteStudent (id: number ):Promise<Student>{
        const student = await this.studentRepository.findById(id);
        if (!student){ 
            throw new Error("il n a jms eu d etudiants avec cette id ");
        }  
        const deleteStudent = await this.studentRepository.delete(id);
        if (!deleteStudent){ 
            throw new Error("il n a jms eu d etudiants avec cette id ")
        }
        return deleteStudent;   
    }
}