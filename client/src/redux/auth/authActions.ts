import axios from 'axios';
import type { Dispatch } from 'redux';
import { setCredentials } from './authSlice';
import { registerApi, loginApi } from './authAPI';

// Define a helper function to register the user
export const registerUser = (username: string, password: string) => async (dispatch: Dispatch) => {
  try {
    const response = await registerApi({ username, password });

    const { token, user } = response;

    // Store the token in localStorage
    localStorage.setItem('authToken', token);

    dispatch(setCredentials({ token: token, user: user }));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error('Registration failed:', error.response?.data || error.message);
    } else {
        console.error('An unkown error occurred: ', error);
    }
    throw new Error('Registration failed');
  }
};


// Define a helper function for login
export const loginUser = (username: string, password: string) => async (dispatch: Dispatch) => {
  try {
    const response = await loginApi({ username, password });

    // After successful login, store the token and user info in Redux
    const { token, user } = response;
    dispatch(setCredentials({ token, user }));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.data || error.message);
    } else {
        console.error('An unkown error occurred: ', error);
    }
    throw new Error('Login failed');
  }
};

