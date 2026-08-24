   export interface Reponse {
  id: number;
  questionId: number; 
  texte: string;
  estCorrecte: boolean;
}

export type ReponsePublique = Omit<Reponse, 'estCorrecte'>;

export function toReponsePublique(r: Reponse): ReponsePublique {
  const { estCorrecte, ...rest } = r;
  return rest;
}

export function toReponsesPubliques(reponses: Reponse[]): ReponsePublique[] {
  return reponses.map(toReponsePublique);
}