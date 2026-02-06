import api from "../../services/axios";
import type { TransactionResponse } from "./transactionsTypes";


/**
 * API-layer function.
 * Get the user's current balance.
 */
export const getBalanceApi = async (
  userId: string
): Promise<TransactionResponse> => {
  const response = await api.get<TransactionResponse>(`/transactions/getBalance/${userId}`);
  return response.data;
};