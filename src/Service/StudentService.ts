import { StudentRepository } from '../repository/StudentRepository';
import { CreateStudentDTO, UpdateStudentDTO } from '../model/Student';

export class StudentService {
    private repo = new StudentRepository();

    getAll() {
        return this.repo.findAll();
    }

    getById(id: number) {
        return this.repo.findById(id);
    }

    create(data: CreateStudentDTO) {
        return this.repo.create(data);
    }

    update(id: number, data: UpdateStudentDTO) {
        return this.repo.update(id, data);
    }

    deactivate(id: number) {
        return this.repo.deactivate(id);
    }
}
