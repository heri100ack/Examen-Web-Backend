

import  pool  from '../db';
import { Compte ,CompteEleve } from '../model/Compte';

export class StudentRepository {
  async findAll(): Promise<Omit<CompteEleve,'passwordHash'>[]> {
    const recup = await pool.query('SELECT * FROM compte WHERE Role = $1',['STUDENT']);
    return recup.rows;
  }
  async findById(id: number): Promise<Omit<CompteEleve,'passwordHash'>> {
    const recup = await pool.query(
      'SELECT * FROM student WHERE id = $1', 
      [id]
    ); 
    return recup.rows[0]||null;
  }
  async create(data: Omit<CompteEleve, 'id'>): Promise<Omit<CompteEleve, 'passwordHash'>> {
  const query = `
    INSERT INTO student (
      nom, 
      email, 
      password_hash, 
      role, 
      groupe_id, 
      debut_annee, 
      fin_annee
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING 
      id, 
      nom, 
      email, 
      role, 
      groupe_id AS "groupeId", 
      debut_annee AS "debutAnnee", 
      fin_annee AS "finAnnee";
  `;

  const values = [
    data.nom,
    data.email,
    data.passwordHash,
    data.role,
    data.groupeId,
    data.debutAnnee,
    data.finAnnee
  ];

  const recup = await pool.query<Omit<CompteEleve, 'passwordHash'>>(query, values);
  return recup.rows[0];
}

  async update(
  id: number, 
  data: Partial<Omit<CompteEleve, 'id'>>
): Promise<Omit<CompteEleve, 'passwordHash'> | null> {
  const query = `
    UPDATE compte
    SET 
      nom = COALESCE($1, nom),
      email = COALESCE($2, email),
      groupe_id = COALESCE($3, groupe_id),
      debut_annee = COALESCE($4, debut_annee),
      fin_annee = COALESCE($5, fin_annee)
    WHERE id = $6 
    RETURNING 
      id, 
      nom, 
      email, 
      role, 
      groupe_id AS "groupeId", 
      debut_annee AS "debutAnnee", 
      fin_annee AS "finAnnee";
  `;

  const values = [
    data.nom ?? null,
    data.email ?? null,
    data.groupeId ?? null,
    data.debutAnnee ?? null,
    data.finAnnee ?? null,
    id
  ];

  const result = await pool.query<Omit<CompteEleve, 'passwordHash'>>(query, values);

   if (!result.rows[0]) {
    return null;
  }

  return result.rows[0];
}

  async delete(id: number): Promise<boolean> {
    const recup = await pool.query(
      'DELETE * FROM student WHERE id =$1 RETURNING id',
      [id]
    )
    return recup.rowCount !== null && recup.rowCount > 0; 
  } 
  
}
