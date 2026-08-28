import { QuestionAvecReponses, QuestionPublique } from "./Question";
import { Reponse } from "./Response";


   export interface Examen {
     id: number;
     matiereId: number;   
     titre: string;
     description : string ;
     dateCreation: Date;
     dateDebut: Date;
     dateFin: Date;
     createdBy: number;  
     groupeId : number ;
   }
   
  export interface ExamenAvecQuestionsEtLesReponses extends Examen {
    questions: QuestionAvecReponses[];
  }

  export interface ExamenPublique extends Examen {
    questions: QuestionPublique[];
  }

  export interface ExamenAvecQuestions {
  examen: Examen;
  questions: {
    id: number;
    examenId: number;
    texte: string;
    type: string;
    points: number;
    reponses: Reponse[];
  }[];
}