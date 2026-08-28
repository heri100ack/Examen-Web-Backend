import pool from '../configuration/database';

import {ResponsesEtudiant} from '../model/ResponsesEtudiant'
export class ResponsesEtudiantRepository { 
    async findBySoumissionId(SoumissionId: number ):Promise <ResponsesEtudiant[]>{ 
        const recup = await pool.query(
      'SELECT * FROM response_etudiant WHERE soumission_id = $1', 
      [SoumissionId]
    ); 
    return recup.rows||null;
    }
    async CreateReponsesBySoumissionId(soumissionId: number,reponses: Omit<ResponsesEtudiant,'id'>): Promise<ResponsesEtudiant> {
  
      const query = `
        INSERT INTO reponse_etudiant (soumission_id, question_id, reponse_id)
        VALUES ($1, $2, $3);
      `;
      const recup = await pool.query(query,[soumissionId,reponses.questionId,reponses.reponseId]);

      return recup.rows[0]|| null ; 
    
  }
}