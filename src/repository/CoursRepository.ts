import pool from '../configuration/database';
import { Cours } from '../model/Cours';
export class CoursRepository { 

    async findAll(): Promise<Cours[] > { 
      const recup = await pool.query('SELECT * FROM Cours'); 
      return recup.rows; 
    }
    async create(data: Omit<Cours, 'id'>): Promise<Cours> {
    const { nom, createdBy, description } = data;
    
    const query = `
      INSERT INTO cours (nom, created_by, description)
      VALUES ($1, $2, $3)
      RETURNING id, nom, created_by AS "createdBy", description;
    `;
    
    const values = [nom, createdBy, description];
    const result = await pool.query<Cours>(query, values);
    
    return result.rows[0];
    
  }

    async update(id: number, data: Partial<Cours>): Promise<Cours | null> {
  const keys = Object.keys(data);
  if (keys.length === 0) return null;

  const setClause = keys
    .map((key, index) => {
      const dbColumn = key === 'createdBy' ? 'created_by' : key;
      return `"${dbColumn}" = $${index + 2}`;
    })
    .join(', ');

  const values = [id, ...Object.values(data)];

  const query = `
    UPDATE cours 
    SET ${setClause} 
    WHERE id = $1 
    RETURNING id, nom, created_by AS "createdBy", description;
  `;

  const result = await pool.query<Cours>(query, values);
  return result.rows[0] || null;
    }

    async delete(id: number): Promise<boolean> { 
      const query = 'DELETE FROM cours WHERE id = $1 RETURNING id;';
      const result = await pool.query(query, [id]);
      
      return result.rowCount !== null && result.rowCount > 0; 
    }
}