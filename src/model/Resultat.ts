export interface Resultat {
  idExamen: number; 
  EtudiantId: number; 
  note: number;   
  total: number; 
  examenTitre: string; 
}
export interface ResultatFormatRecuperation extends Resultat{ 
  EtudiantNom: String; 
}