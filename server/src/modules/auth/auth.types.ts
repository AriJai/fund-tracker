import { Request } from 'express';

export type User = {
    id: string;
    username: string;
};

export interface UserRow {
  id: string;
  username: string;
  password: string; // hashed password
}

export interface AuthRequest {
  username: string;
  password: string;
}

// AuthResponse
type AuthErrorResponse = {
    message: string;
};
interface AuthSuccessResponse {
  message: string;
  user: User;
}
export type AuthResponse = AuthErrorResponse | AuthSuccessResponse;

// JWT payload
export interface AccessTokenPayload {
  userId: string;
}

// AuthRequest
export interface AuthenticatedRequest extends Request {
  user?: AccessTokenPayload;
}