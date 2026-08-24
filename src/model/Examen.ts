import { QuestionAvecReponses, QuestionPublique } from "./Question";


   export interface Examen {
     id: number;
     matiereId: number;   
     titre: string;
     dateCreation: Date;
     dateDebut: Date;
     dateFin: Date;
     createdBy: number;  
     GroupeId : number ;
   }
   
  export interface ExamenAvecQuestionsEtLesReponses extends Examen {
    questions: QuestionAvecReponses[];
  }

  export interface ExamenPublique extends Examen {
    questions: QuestionPublique[];
  }