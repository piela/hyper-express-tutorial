export function authenticateUser(token: string): boolean {
  // Przykładowa logika autentykacji, np. sprawdzanie tokenu JWT
  return token === "valid-token";
}

export function authorizeUser(role: string, requiredRole: string): boolean {
  // Przykładowa logika autoryzacji
  return role === requiredRole;
}

export function extractRoleFromToken(token: string): string {
  // Przykładowa funkcja ekstrakcji roli użytkownika z tokenu
  return token === "valid-token" ? "user" : "guest";
}
