// Timer values in milliseconds
export const TIMER_VALUES = {
  CHALLENGE_10M: 10 * 60 * 1000, // 10 minutes
  COOLDOWN_6H: 6 * 60 * 60 * 1000, // 6 hours
  AUTO_APPROVE_48H: 48 * 60 * 60 * 1000, // 48 hours
  SAFETY_LOCK_96H: 96 * 60 * 60 * 1000, // 96 hours
} as const;

// Timer values in seconds for display
export const TIMER_DISPLAY = {
  CHALLENGE_10M: 10 * 60, // 10 minutes
  COOLDOWN_6H: 6 * 60 * 60, // 6 hours
  AUTO_APPROVE_48H: 48 * 60 * 60, // 48 hours
  SAFETY_LOCK_96H: 96 * 60 * 60, // 96 hours
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

// Gas price thresholds (in gwei)
export const GAS_THRESHOLDS = {
  LOW: 20,
  MEDIUM: 50,
  HIGH: 100,
} as const;
