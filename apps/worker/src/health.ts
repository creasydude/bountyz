import { getQueueMetrics, bountyTimersQueue, connection } from './queue';

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  redis: {
    connected: boolean;
    latency?: number;
  };
  queue: {
    name: string;
    metrics: {
      waiting: number;
      active: number;
      completed: number;
      failed: number;
      delayed: number;
      paused: number;
    };
  };
  uptime: number;
}

// Check Redis health
async function checkRedisHealth(): Promise<{ connected: boolean; latency?: number }> {
  try {
    const start = Date.now();
    await connection.ping();
    const latency = Date.now() - start;
    return { connected: true, latency };
  } catch (error) {
    return { connected: false };
  }
}

// Get comprehensive health status
export async function getHealthStatus(): Promise<HealthStatus> {
  const [redisHealth, metrics] = await Promise.all([
    checkRedisHealth(),
    getQueueMetrics(),
  ]);

  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  
  if (!redisHealth.connected) {
    status = 'unhealthy';
    console.warn('[Health] Status changed to unhealthy - Redis disconnected');
  } else if (metrics.failed > 0 || metrics.paused > 0) {
    status = 'degraded';
    console.warn(`[Health] Status changed to degraded - Failed: ${metrics.failed}, Paused: ${metrics.paused}`);
  }

  return {
    status,
    timestamp: new Date().toISOString(),
    redis: redisHealth,
    queue: {
      name: 'bounty-timers',
      metrics,
    },
    uptime: process.uptime(),
  };
}

// Log queue metrics periodically
export async function logQueueMetrics(): Promise<void> {
  try {
    const metrics = await getQueueMetrics();
    console.log(`[Queue Metrics] Waiting: ${metrics.waiting}, Active: ${metrics.active}, Completed: ${metrics.completed}, Failed: ${metrics.failed}, Delayed: ${metrics.delayed}`);
  } catch (error) {
    console.error('Failed to log queue metrics:', error);
  }
}

// Start periodic metrics logging
export function startMetricsLogging(intervalMs: number = 30000): NodeJS.Timeout {
  return setInterval(logQueueMetrics, intervalMs);
}
