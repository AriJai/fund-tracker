import axios from 'axios';
import { logout, setCredentials } from './authSlice';
import { registerApi, loginApi, logoutApi, getUserApi } from './authAPI';
import type { LoginThunk, LogoutThunk, RegisterThunk, setCredentialsPayload } from './authTypes';
import type { AppDispatch } from '../../store/store';

/**
 * A helper function for registering new users. 
 * Uses registerApi to send a POST request to the database.
 * Dispatches setCredentials to authenticate the user.
 * Else, throw an AxiosError.
 * @param username String value.
 * @param password String value.
 */
export const registerUser: RegisterThunk = (username, password) => async (dispatch) => {
  try {
    const response = await registerApi({ username, password });
    const { user } = response;
    // Type guard
    if (typeof user.id !== 'string' || typeof user.username !== 'string') {
      throw new Error('Invalid user data from the API');
    }
    const payload: setCredentialsPayload = { user };
    dispatch(setCredentials(payload));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Registration failed:', error.response?.data || error.message);
    } else {
      console.error('An unknown error occurred: ', error);
    }
    throw new Error('Registration failed');
  }
};



/**
 * A helper function for logging in users. 
 * Uses loginApi to send a POST request to the database.
 * Dispatches setCredentials to authenticate the logged-in user.
 * Else, throw an AxiosError.
 * @param username String value.
 * @param password String value.
 */
export const loginUser: LoginThunk = (username, password) => async (dispatch) => {
  try {
    const response = await loginApi({ username, password });
    const { user } = response;
    // Type guard
    if (typeof user.id !== 'string' || typeof user.username !== 'string') {
      throw new Error('Invalid user data from the API');
    }
    const payload: setCredentialsPayload = { user };
    dispatch(setCredentials(payload));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data || error.message);
    } else {
      console.error('An unknown error occurred: ', error);
    }
    throw new Error('Login failed');
  }
};


/**
 * A helper function for fetching a user on reload.
 */
export const fetchCurrentuser = () => async (dispatch: AppDispatch) => {
  try {
    const {user} = await getUserApi();
    if (!user || !user.id) {
      throw new Error('User not found');
    }
    dispatch(setCredentials({ user }))
  } catch (err: unknown) {
    console.log('Failed to fetch current user: ', err);
    dispatch(logout());
  }
}

/**
 * A helper function for logging out users.
 */
export const logoutUser: LogoutThunk = () => async (dispatch) => {
  try {
    await logoutApi();
    dispatch(logout());
  } catch (err) {
    if (err instanceof Error) {
      console.error('Logout failed:', err.message);
    } else {
      console.error('Logout failed:', err);
    }
    throw err;
  }
};