import api from "../../services/axios";
import type { AddFundsPayload, GetBalanceResponse } from "./transactionsTypes";


/**
 * API-layer function.
 * Get the user's current balance.
 */
export const getBalanceApi = async (
  userId: string
): Promise<GetBalanceResponse> => {
  try {
    const response = await api.get<GetBalanceResponse>(`/transactions/users/${userId}/balance`);
    return response.data;
  } catch (err) {
    console.error("API call failed:", err);
    throw err;
  }
};

export const addFundsApi = async (
  data: AddFundsPayload
) => {
  try {
    const response = await api.post("/transactions", data);
    return response.data;
  } catch (err) {
    console.error("API call failed:", err);
    throw err;
  }
};