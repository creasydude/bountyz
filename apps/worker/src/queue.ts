import { Queue, QueueScheduler } from 'bullmq';
import IORedis from 'ioredis';

// Validate Redis URL is set
if (!process.env.REDIS_URL) {
  console.error('ERROR: REDIS_URL environment variable is not set');
  console.error('Please set REDIS_URL to your Redis connection string');
  console.error('Example: REDIS_URL=redis://default:password@host:port');
  process.exit(1);
}

// Redis connection configuration
const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Handle Redis connection events
connection.on('error', (err) => {
  console.error('Redis connection error:', err.message);
});

connection.on('connect', () => {
  console.log('✓ Connected to Redis');
});

connection.on('ready', () => {
  console.log('✓ Redis is ready');
});

// Queue scheduler for repeat jobs
const queueScheduler = new QueueScheduler('bounty-timers', { connection });

// Main bounty timers queue
const bountyTimersQueue = new Queue('bounty-timers', {
  connection,
  defaultJobOptions: {
    removeOnComplete: false,
    repeat: {
      jobId: 'persist',
    },
  },
});

// Queue metrics interface
export interface QueueMetrics {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  paused: number;
}

// Get queue metrics
export async function getQueueMetrics(): Promise<QueueMetrics> {
  const [waiting, active, completed, failed, delayed, paused] = await Promise.all([
    bountyTimersQueue.getWaitingCount(),
    bountyTimersQueue.getActiveCount(),
    bountyTimersQueue.getCompletedCount(),
    bountyTimersQueue.getFailedCount(),
    bountyTimersQueue.getDelayedCount(),
    bountyTimersQueue.isPaused(),
  ]);

  return {
    waiting,
    active,
    completed,
    failed,
    delayed,
    paused: paused ? 1 : 0,
  };
}

// Graceful shutdown
export async function closeQueue(): Promise<void> {
  console.log('Closing BullMQ queue...');
  await bountyTimersQueue.close();
  await queueScheduler.close();
  await connection.quit();
  console.log('✓ BullMQ queue closed');
}

// Export queue name constant
export const QUEUE_NAME = 'bounty-timers';

// Export queue and connection for use in other modules
export { bountyTimersQueue, connection, queueScheduler };
