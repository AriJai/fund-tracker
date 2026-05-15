import axios from 'axios';
import { getCurrentBalance } from './transactionsSlice';
import { addFundsApi, getBalanceApi } from './transactionsAPI';
import type { AddFundsPayload, getBalanceThunk, setBalancePayload } from './transactionsTypes';
import { createAsyncThunk, type Dispatch } from '@reduxjs/toolkit';

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

export const addFunds = createAsyncThunk(
    "transactions/addFunds",
    async (payload: AddFundsPayload) => {
        try {
            const response = await addFundsApi(payload);
            return response;
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Add funds failed:", err.message);
            } else {
                console.error("Add funds failed:", err);
            }
            throw err; // allows component to catch via .unwrap()
        }
    }
);