import { authenticateUser, authorizeUser, extractRoleFromToken } from './auth';

export function cliAuth(requiredRole: string) {
  return (token: string) => {
    if (!token || !authenticateUser(token)) {
      console.error('Authentication failed!');
      process.exit(1);
    }

    const userRole = extractRoleFromToken(token);
    if (!authorizeUser(userRole, requiredRole)) {
      console.error('Authorization failed!');
      process.exit(1);
    }

    return userRole;
  };
}
