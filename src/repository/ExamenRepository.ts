import pool from '../configuration/database';
import { Examen } from '../model/Examen';


export class ExamenRepository { 
    async delete(id: number): Promise<boolean> { 
      const query = 'DELETE FROM examen WHERE id = $1 RETURNING id;';
      const result = await pool.query(query, [id]);
      
      return result.rowCount !== null && result.rowCount > 0; 
    }

    async update(id: number, data: Partial<Examen>): Promise<Examen | null> {
      const keys = Object.keys(data);
      if (keys.length === 0) return null;

      const setClause = keys.map((key, index) => `"${key}" = $${index + 2}`).join(', ');
      const values = [id, ...Object.values(data)];

      const query = `UPDATE examen SET ${setClause} WHERE id = $1 RETURNING *;`;
      const result = await pool.query<Examen>(query, values);
      return result.rows[0] || null;
    }
    
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
    async findAll(): Promise<Examen[]> { 
      const recup = await pool.query<Examen>('SELECT * FROM examen'); 
      return recup.rows; 
    }
}
