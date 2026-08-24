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
}