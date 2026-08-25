export interface Student {
    id: number;
    nom: string;
    prenom: string;
    cin: string;
    score: number;
    actif: boolean;
    dateInscription: Date;
}

export type CreateStudentDTO = Omit<Student, 'id' | 'dateInscription' | 'actif'>;
export type UpdateStudentDTO = Partial<Omit<Student, 'id' | 'dateInscription'>>;
