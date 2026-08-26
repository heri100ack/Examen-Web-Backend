import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../model/Compte';

export interface UserPayload {
  id: number;
  role: Role;
  groupeId?: number;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token manquant ou mal formé.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'votre_cle_par_defaut_dev';

  try {
    const payload = jwt.verify(token, secret) as UserPayload;

    req.user = {
      id: payload.id,
      role: payload.role,
      groupeId: payload.groupeId,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
}