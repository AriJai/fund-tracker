export interface Transaction {
  id: number;
  creatorUserId: number;
  targetType: "user" | "team";
  targetId: number;
  amount: number;
  status: "pending" | "confirmed" | "rejected";
  createdAt: string;
  confirmedAt?: string;
  rejectedAt?: string;
  reason?: string;
  refundOfId?: number;
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
