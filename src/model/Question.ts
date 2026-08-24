import { Reponse, ReponsePublique } from './Response';

export interface Question {
  id: number;
  examenId: number; 
  texte: string;
  type: string;
  points: number;
}

export interface QuestionAvecReponses extends Question {
  reponses: Reponse[];
}

export interface QuestionPublique extends Question {
  reponses: ReponsePublique[];
}