import pool from '../configuration/database';
import { CreateQuestion, Question } from '../model/Question';

export class QuestionRepository { 
    async findByExamenId(id: number): Promise<Question[]> {

    const recup = await pool.query(
      'SELECT * FROM question WHERE examen_id = $1', 
      [id]
    ); 
    return recup.rows||null;
  }
    async findById(id: number): Promise<Question>{
      const recup = await pool.query(
      'SELECT * FROM question WHERE id = $1', 
      [id]
    ); 
    return recup.rows[0]||null;
  }
    async Save(nouvelleQuestion: CreateQuestion): Promise<Question> {
    const { examenId, texte, type, points } = nouvelleQuestion;

    const recup = await pool.query(
      'INSERT INTO question (examen_id, texte, type, points) VALUES ($1, $2, $3, $4) RETURNING *',
      [examenId, texte, type, points]
    );

    return recup.rows[0];
  }
}
  
