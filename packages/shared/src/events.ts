// Socket.io Event Types

export interface BountyUpdateEvent {
  bountyId: number;
  status: string;
  timestamp: number;
  data?: any;
}

export interface TimerUpdateEvent {
  bountyId: number;
  timerType: TimerType;
  remainingTime: number;
  timestamp: number;
}

export type TimerType = 'challenge_10m' | 'cooldown_6h' | 'auto_approve_48h' | 'safety_lock_96h';

// Socket event names
export const SOCKET_EVENTS = {
  // Client -> Server
  JOIN_BOUNTY: 'join:bounty',
  LEAVE_BOUNTY: 'leave:bounty',
  
  // Server -> Client
  BOUNTY_UPDATE: 'bounty:update',
  TIMER_UPDATE: 'timer:update',
  
  // Connection events
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  RECONNECT: 'reconnect',
} as const;

// Bounty status constants
export const BOUNTY_STATUS = {
  OPEN: 'OPEN',
  CHALLENGE_10M: 'CHALLENGE_10M',
  ACTIVE: 'ACTIVE',
  AUTO_APPROVE_48H: 'AUTO_APPROVE_48H',
  DISPUTED: 'DISPUTED',
  COMPLETED: 'COMPLETED',
} as const;

export type BountyStatus = typeof BOUNTY_STATUS[keyof typeof BOUNTY_STATUS];
