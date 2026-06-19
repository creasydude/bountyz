export interface User {
  id: number;
  privyId: string;
  walletAddress?: string;
  username?: string;
  avatarUrl?: string;
  cooldownUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bounty {
  id: number;
  creatorId: number;
  doerId?: number;
  title: string;
  description: string;
  rewardAmount: string;
  status: BountyStatus;
  challengeDeadline?: Date;
  autoApproveDeadline?: Date;
  safetyLockDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type BountyStatus =
  | 'OPEN'
  | 'CHALLENGE_10M'
  | 'ACTIVE'
  | 'AUTO_APPROVE_48H'
  | 'DISPUTED'
  | 'COMPLETED';

export interface CreateBountyInput {
  title: string;
  description: string;
  rewardAmount: string;
}

export interface UpdateBountyInput {
  title?: string;
  description?: string;
  rewardAmount?: string;
  status?: BountyStatus;
}
