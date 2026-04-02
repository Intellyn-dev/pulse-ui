export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidProductName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 200;
}

export function sanitizeSearchQuery(query: string): string {
  return query.trim().replace(/[<>'"]/g, '');
}
