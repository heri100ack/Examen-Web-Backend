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
    async update(id: number, data: Partial<Question>): Promise<Question> {
    const { texte, type, points } = data;
    const query = `
      UPDATE questions 
      SET 
        texte = COALESCE($1, texte), 
        type = COALESCE($2, type), 
        points = COALESCE($3, points)
      WHERE id = $4
      RETURNING *;
    `;
    const values = [texte, type, points, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM questions WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
  
