import { Request, Response } from 'express';
import { Login } from '../model/Compte';
import * as authService from '../Service/AuthService';

export async function login(req: Request, res: Response): Promise<void> {
  const credentials: Login = req.body;

  if (!credentials.email || !credentials.password) {
    res.status(400).json({ message: 'Email et mot de passe requis.' });
    return;
  }

  try {
    const result = await authService.login(credentials);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}