import type { Dispatch } from "@reduxjs/toolkit";

// Request type
export type TransactionRequest = {
    userId: string;
}

// Response type
export type TransactionResponse = {
    balance: number;
}

// Action Payload
export type setBalancePayload = {
    balance: number;
}

export type getBalanceThunk = (
    userId: string,
) => (dispatch: Dispatch) => Promise<void>