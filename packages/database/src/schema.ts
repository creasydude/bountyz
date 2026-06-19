import { pgTable, serial, integer, text, varchar, timestamp, decimal, foreignKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  privyId: varchar('privy_id', { length: 255 }).notNull().unique(),
  walletAddress: varchar('wallet_address', { length: 42 }),
  username: varchar('username', { length: 255 }),
  avatarUrl: text('avatar_url'),
  cooldownUntil: timestamp('cooldown_until'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bounties = pgTable('bounties', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id').references(() => users.id).notNull(),
  doerId: integer('doer_id').references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  rewardAmount: decimal('reward_amount', { precision: 18, scale: 8 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  challengeDeadline: timestamp('challenge_deadline'),
  autoApproveDeadline: timestamp('auto_approve_deadline'),
  safetyLockDeadline: timestamp('safety_lock_deadline'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
