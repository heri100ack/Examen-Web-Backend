import { ResponsesEtudiant } from './ResponsesEtudiant';
export interface Soumission {
  id: number;
  userId: number;      
  examenId: number;    
  dateSoumission: Date; 
}
export type CreateSoumissionDTO = Omit<Soumission, 'id'>;

export interface SoumissionAvecReponses extends Soumission {
  reponses: ResponsesEtudiant[];
}