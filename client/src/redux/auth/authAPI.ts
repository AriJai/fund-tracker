import axios from '../../services/axios';
import type { AuthRequest, AuthResponse } from './authTypes';

// Register a user
export const registerApi = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Login a user
export const loginApi = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>('/auth/login', data);
  return response.data;
};
