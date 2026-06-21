import { bountyTimersQueue, closeQueue, getQueueMetrics, queueScheduler } from './queue';
import express from 'express';
import { getHealthStatus } from './health';
import { bountyTimerWorker } from './worker';
import { startSocketServer, stopSocketServer } from './socket-server';
import profileRoutes from './routes/profile';

console.log('bountyZ Worker starting...');

// Store shutdown flag
let isShuttingDown = false;

// Graceful shutdown handler
async function gracefulShutdown(signal: string) {
  if (isShuttingDown) {
    console.log('Shutdown already in progress...');
    return;
  }
  
  isShuttingDown = true;
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
  
  try {
    // Stop socket server
    await stopSocketServer();
    
    // Close queue and connection
    await closeQueue();
    console.log('✓ Worker shut down gracefully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}

// Register shutdown handlers
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

// Create Express app for health endpoint
const app = express();
const PORT = process.env.WORKER_PORT || 3001;

// Middleware
app.use(express.json());

// API Routes
app.use('/api/profile', profileRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const health = await getHealthStatus();
    const statusCode = health.status === 'healthy' ? 200 : 
                      health.status === 'degraded' ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: 'Health check failed' });
  }
});

// Initialize worker
async function initWorker() {
  try {
    console.log('Initializing BullMQ queue...');
    
    // Check queue metrics to verify connection
    const metrics = await getQueueMetrics();
    console.log('✓ Queue initialized successfully');
    console.log('Queue metrics:', metrics);
    
    // Start HTTP server for health checks
    app.listen(PORT, () => {
      console.log(`✓ Health endpoint listening on port ${PORT}`);
    });
    
    // Start Socket.io server
    await startSocketServer();
    
    console.log('\n✅ bountyZ Worker is ready!');
    console.log('Waiting for jobs...');
    
  } catch (error) {
    console.error('Failed to initialize worker:', error);
    process.exit(1);
  }
}

// Start the worker
initWorker();
