import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { setBalancePayload } from "./transactionsTypes";
import { addFunds } from "./transactionsActions";

interface TransactionState {
    balance: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    balance: null,
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        getCurrentBalance: (state, action: PayloadAction<setBalancePayload>) => {
            state.balance = action.payload.balance;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFunds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFunds.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload.balance ?? state.balance;
            })
            .addCase(addFunds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to add funds";
            });
    },
});

export const { getCurrentBalance } = transactionSlice.actions;
export default transactionSlice.reducer;
