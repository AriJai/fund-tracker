import axios from 'axios';
import { getCurrentBalance } from './transactionsSlice';
import { getBalanceApi } from './transactionsAPI';
import type { getBalanceThunk, setBalancePayload } from './transactionsTypes';
import type { Dispatch } from '@reduxjs/toolkit';

export const getBalance: getBalanceThunk = (userId) => async (dispatch: Dispatch) => {
    try {
        const response = await getBalanceApi(userId)
        const { balance } = response;
        // Type guard
        if (typeof balance !== 'number') {
            throw new Error('Invalid data from the API');
        }
        const payload: setBalancePayload = { balance };
        
        dispatch(getCurrentBalance(payload));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Balance request failed:', error.response?.data || error.message);
        } else {
            console.error('An unknown error occurred: ', error);
        }
        throw new Error('Balance request failed');
    }
};
