import type { Dispatch } from "@reduxjs/toolkit";

// Response types
export type GetBalanceResponse = {
    balance: number;
}



// Action Payload
export type setBalancePayload = {
    balance: number;
}

// DashboardPage
export type TargetType = "user" | "team"

export interface AddFundsFormState {
    targetType: "user" | "team";
    targetId: number;
    amount: string;
    reason: string;
}

export type AddFundsPayload = {
    target_type: TargetType;
    target_id: number;
    amount: number;
    reason: string | null;
};

export interface AddFundsFormProps {
    onSubmit: (data: {
        target_type: TargetType,
        target_id: number;
        amount: number;
        reason: string | null;
    }) => Promise<void> | void;
}

export type getBalanceThunk = (
    userId: string,
) => (dispatch: Dispatch) => Promise<void>

export type addFundsThunk = (
    payload: AddFundsPayload
) => (dispatch: Dispatch) => Promise<void>