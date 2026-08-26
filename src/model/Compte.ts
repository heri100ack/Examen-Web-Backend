

export type Role = 'ADMIN' | 'STUDENT';

export interface BaseCompte {
  id: number;
  nom: string;
  email: string;
  passwordHash: string;
}


export interface CompteAdmin extends BaseCompte {
  role: 'ADMIN';
}
export interface CompteEleve extends BaseCompte {
  role: 'STUDENT';
  groupeId: number;
  debutAnnee: Date;
  finAnnee: Date;
}
export type CreationCompte = Omit<CompteAdmin, 'id'> | Omit<CompteEleve, 'id'>;

export type Compte = CompteAdmin | CompteEleve;

export type AuthentificationCompte = Omit<Compte, 'passwordHash'>;


export interface CreateStudentDTO {
  nom: string;
  email: string;
  password: string; 
  groupeId: number;
  role: 'STUDENT';
  debutAnnee?: Date;
  finAnnee?: Date;
}
export interface comptePourBDD  {
    nom: string;
  email: string;
  groupeId: number;
  role: 'STUDENT';
  debutAnnee?: Date;
  finAnnee?: Date;
  passwordHash: String;
  };
export interface Login {
  email: string;
  password: string;
}
