import { Worker, Job } from 'bullmq';
import { connection } from './queue';
import { emitBountyUpdate, emitTimerEvent } from './socket-server';

// Bounty timer job data interface
export interface BountyTimerJobData {
  bountyId: number;
  action: 'challenge_10m' | 'cooldown_6h' | 'auto_approve_48h' | 'safety_lock_96h';
  userId: number;
  timestamp: number;
}

// Process bounty timer jobs
const bountyTimerWorker = new Worker(
  'bounty-timers',
  async (job: Job<BountyTimerJobData>) => {
    console.log(`[Worker] Processing job ${job.id} for bounty ${job.data.bountyId}`);
    
    const { bountyId, action, userId, timestamp } = job.data;
    
    switch (action) {
      case 'challenge_10m':
        console.log(`[Worker] 10-minute challenge started for bounty ${bountyId}`);
        emitBountyUpdate(bountyId, 'CHALLENGE_10M', { userId });
        emitTimerEvent(bountyId, 'challenge_10m', 600000); // 10 minutes in ms
        // TODO: Implement 10-minute challenge logic
        break;
        
      case 'cooldown_6h':
        console.log(`[Worker] 6-hour cooldown started for user ${userId}`);
        emitBountyUpdate(bountyId, 'COOLDOWN', { userId });
        emitTimerEvent(bountyId, 'cooldown_6h', 21600000); // 6 hours in ms
        // TODO: Implement 6-hour cooldown logic
        break;
        
      case 'auto_approve_48h':
        console.log(`[Worker] 48-hour auto-approval started for bounty ${bountyId}`);
        emitBountyUpdate(bountyId, 'AUTO_APPROVE_48H', { userId });
        emitTimerEvent(bountyId, 'auto_approve_48h', 172800000); // 48 hours in ms
        // TODO: Implement 48-hour auto-approval logic
        break;
        
      case 'safety_lock_96h':
        console.log(`[Worker] 96-hour safety lock started for bounty ${bountyId}`);
        emitBountyUpdate(bountyId, 'SAFETY_LOCK', { userId });
        emitTimerEvent(bountyId, 'safety_lock_96h', 345600000); // 96 hours in ms
        // TODO: Implement 96-hour safety lock logic
        break;
        
      default:
        console.warn(`[Worker] Unknown action: ${action}`);
    }
    
    return { success: true, bountyId, action };
  },
  {
    connection,
    concurrency: 5,
  }
);

// Handle worker events
bountyTimerWorker.on('completed', (job) => {
  console.log(`[Worker] Job ${job.id} completed for bounty ${job.data.bountyId}`);
});

bountyTimerWorker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});

bountyTimerWorker.on('error', (err) => {
  console.error('[Worker] Worker error:', err.message);
});

export { bountyTimerWorker };
