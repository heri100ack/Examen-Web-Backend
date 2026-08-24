import pool from '../configuration/database';
import { Examen } from '../model/Examen';
import { Question } from '../model/Question';

export class ExamenRepository { 
    async getExamenById(id: number): Promise<Examen>{ 

        const recup = await pool.query(
      'SELECT * FROM examen WHERE id = $1', 
      [id]
    ); 
    return recup.rows[0]||null;
    }
    async findExamOfGroupe(GroupeId: number ): Promise<Examen[]>{ 

        const recup = await pool.query(
      'SELECT * FROM examen WHERE groupe_id = $1', 
      [GroupeId]
    ); 
    return recup.rows||null;
  }
}
