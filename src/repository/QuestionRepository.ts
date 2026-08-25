import pool from '../configuration/database';
import { Question } from '../model/Question';

export class QuestionRepository { 
    async findByExamenId(id: number): Promise<Question[]> {

    const recup = await pool.query(
      'SELECT * FROM question WHERE examen_id = $1', 
      [id]
    ); 
    return recup.rows||null;
  }
  
}