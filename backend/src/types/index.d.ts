import { Request } from 'express';

// Define o formato do payload do JWT
export interface AuthPayload {
  userId: number;
  email: string;
}

// abre o namespace global do Express para adicionar o tipo user ao Request
declare global {
  namespace Express {
    export interface Request {
      user?: AuthPayload;
    }
  }
}