import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { setBalancePayload } from './transactionsTypes.ts';


interface TransactionState {
    balance: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    balance: null,
    loading: false,
    error: null
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        getCurrentBalance: (state, action: PayloadAction<setBalancePayload>) => {
            state.balance = action.payload.balance;
        },
    },
});

export const { getCurrentBalance } = transactionSlice.actions;
export default transactionSlice.reducer;