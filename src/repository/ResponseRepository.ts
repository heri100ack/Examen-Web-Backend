
import pool from '../configuration/database';
import {Reponse} from '../model/Response';
export class ResponseRepository{ 
    async findByQuestionId(id: number): Promise<Reponse[]> {
    const recup = await pool.query(
      'SELECT * FROM response WHERE question_id = $1', 
      [id]
    ); 
    return recup.rows||null;
  }
    async findCorrectAnswerByQuestionId(QuestionId : number): Promise<Reponse>{ 
        const recup = await pool.query(
      'SELECT * FROM response WHERE question_id = $1 AND is_correct = $2', 
      [QuestionId,true]
    ); 
    return recup.rows[0]||null;
    }
}