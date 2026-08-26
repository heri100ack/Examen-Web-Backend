import { Request, Response } from 'express';
import { Login } from '../model/Compte';
import { AuthService } from '../Service/AuthService';

export class AuthControler {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const credentials: Login = req.body;

    if (!credentials.email || !credentials.password) {
      res.status(400).json({ message: 'Email et mot de passe requis.' });
      return;
    }

    try {
      const result = await this.authService.login(credentials);
      res.status(200).json(result);
    } catch (err) {
      const error = err as Error;
      res.status(401).json({ message: error.message });
    }
  };
}