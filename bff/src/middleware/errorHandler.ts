import { Request, Response, NextFunction } from 'express';

export class ServiceUnavailableError extends Error {
  constructor(service: string) {
    super(`Service unavailable: ${service}`);
    this.name = 'ServiceUnavailableError';
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err.stack);
  if (err.name === 'ServiceUnavailableError') {
    res.status(503).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'Internal server error' });
}
