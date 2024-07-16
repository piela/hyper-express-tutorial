import { Request, Response } from 'hyper-express';
import { authenticateUser, authorizeUser, extractRoleFromToken } from './auth';

export function authMiddleware(requiredRole: string) {
  return (req: Request, res: Response, next: Function) => {
    const token = req.headers['authorization'];
    if (!token || !authenticateUser(token)) {
      res.status(401).send('Unauthorized');
      return;
    }

    const userRole = extractRoleFromToken(token);
    if (!authorizeUser(userRole, requiredRole)) {
      res.status(403).send('Forbidden');
      return;
    }
    req.locals.user = { role: userRole };
    next();
  };
}
