import { promises } from 'node:dns';
import pool from '../configuration/database';
import { CreateSoumissionDTO, Soumission } from '../model/Soumission';

export class SoumissionRepository { 

    async findByUserId(studentId: number): Promise <Soumission[]>{ 

        const recup = await pool.query(
      'SELECT * FROM soumission WHERE student_id = $1', 
      [studentId]
    ); 
    return recup.rows||null;
  }
    async findByUserAndExamen(UserId : number , ExamenId: number ): Promise <Soumission>{ 

        const recup = await pool.query(
      'SELECT * FROM soumission WHERE user_id = $1 AND examen_id = $2', 
      [UserId, ExamenId]
    ); 
    return recup.rows[0]||null;
  }

//    probleme de creation avec ce code 
   async create(data: CreateSoumissionDTO): Promise<Soumission> {
    const query = `
      INSERT INTO soumission (user_id, examen_id, date_soumission)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [data.userId, data.examenId, data.dateSoumission];

    const result = await pool.query<Soumission>(query, values);

    return result.rows[0];
  }


}
