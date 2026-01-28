import api from '../../services/axios';
import type { AuthRequest, AuthResponse } from './authTypes';

/**
 * API-layer function.
 * Register a user.
 */
export const registerApi = async (
  data: AuthRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};


/**
 * API-layer function.
 * Login a user.
 */
export const loginApi = async (
  data: AuthRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

/**
 * API-layer function.
 * Finds a verified user
 */
export const getUserApi = async (): Promise<AuthResponse> => {
  const response = await api.get('/auth/user');
  return response.data;
};


/**
 * API-layer function.
 * Logout a user.
 */
export const logoutApi = async (): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/logout');
  return response.data
};
