import { Student, CreateStudentDTO, UpdateStudentDTO } from '../model/Student';
import pool from '../db';

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    const result = await pool.query('SELECT * FROM students WHERE actif = TRUE');
    return result.rows;
  }

  async findById(id: number): Promise<Student | null> {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(data: CreateStudentDTO): Promise<Student> {
    const result = await pool.query(
        `INSERT INTO students (nom, prenom, cin, score, actif, date_inscription)
         VALUES ($1, $2, $3, $4, TRUE, NOW())
           RETURNING *`,
        [data.nom, data.prenom, data.cin, data.score]
    );
    return result.rows[0];
  }

  async update(id: number, data: UpdateStudentDTO): Promise<Student | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const result = await pool.query(
        `UPDATE students
         SET nom = $1, prenom = $2, cin = $3, score = $4
         WHERE id = $5 RETURNING *`,
        [
          data.nom ?? existing.nom,
          data.prenom ?? existing.prenom,
          data.cin ?? existing.cin,
          data.score ?? existing.score,
          id,
        ]
    );
    return result.rows[0] || null;
  }

  async deactivate(id: number): Promise<Student | null> {
    const result = await pool.query(
        `UPDATE students SET actif = FALSE WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0] || null;
  }
}
