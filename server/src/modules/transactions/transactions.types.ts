export type TargetType = "user" | "team";

export type TransactionStatus = "pending" | "confirmed" | "rejected";

export interface CreateTransactionBody {
    target_type: TargetType;
    target_id: number;
    amount: number;
    reason?: string;
}

export interface TransactionRow {
    id: number;
    creator_user_id: number;
    target_type: TargetType;
    target_id: number;
    amount: string;
    status: TransactionStatus;
    created_at: string;
    confirmed_at: string | null;
    rejected_at: string | null;
    reason: string | null;
    external_id: string;
    refund_of_id: number | null;
}

export interface TransactionBody {
    user_id: number;
    target_type: 'user' | 'team';
    target_id: number;
    amount: number;
    reason?: string;
    refund_of_id?: number;
}

export interface Team {
    id: number;
    name: string;
    ownerUserId: number;
    createdAt: string;
    disbandedAt?: string;
}

export interface Membership {
    userId: number;
    teamId: number;
    role: "member" | "owner";
    joinedAt: string;
}
