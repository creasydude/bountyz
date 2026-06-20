import { Server } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import express from 'express';
import { SOCKET_EVENTS } from '@bountyz/shared';

// Create Express app
const app = express();
const server = createServer(app);

// Socket.io server configuration
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  // TODO: Implement proper JWT validation with Privy
  // For now, accept all connections in development
  if (process.env.NODE_ENV === 'development' || token) {
    socket.data.userId = socket.handshake.auth.userId || 'anonymous';
    next();
  } else {
    next(new Error('Authentication required'));
  }
});

// Connection handler
io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);
  
  // Join room based on bounty ID
  socket.on(SOCKET_EVENTS.JOIN_BOUNTY, (bountyId: number) => {
    if (typeof bountyId !== 'number' || bountyId <= 0) {
      socket.emit('error', { message: 'Invalid bounty ID' });
      return;
    }
    socket.join(`bounty:${bountyId}`);
    console.log(`[Socket] Client ${socket.id} joined bounty:${bountyId}`);
  });
  
  // Leave room
  socket.on(SOCKET_EVENTS.LEAVE_BOUNTY, (bountyId: number) => {
    if (typeof bountyId !== 'number' || bountyId <= 0) {
      socket.emit('error', { message: 'Invalid bounty ID' });
      return;
    }
    socket.leave(`bounty:${bountyId}`);
    console.log(`[Socket] Client ${socket.id} left bounty:${bountyId}`);
  });
  
  // Handle disconnect
  socket.on('disconnect', (reason) => {
    console.log(`[Socket] Client disconnected: ${socket.id} (${reason})`);
  });
  
  // Handle errors
  socket.on('error', (error) => {
    console.error(`[Socket] Error for client ${socket.id}:`, error);
  });
});

// Export functions to emit events
export function emitBountyUpdate(bountyId: number, status: string, data?: any) {
  const event = {
    bountyId,
    status,
    timestamp: Date.now(),
    data,
  };
  
  io.to(`bounty:${bountyId}`).emit(SOCKET_EVENTS.BOUNTY_UPDATE, event);
  console.log(`[Socket] Emitted bounty:update for bounty ${bountyId}`);
}

export function emitTimerEvent(bountyId: number, timerType: string, remainingTime: number) {
  const event = {
    bountyId,
    timerType,
    remainingTime,
    timestamp: Date.now(),
  };
  
  io.to(`bounty:${bountyId}`).emit(SOCKET_EVENTS.TIMER_UPDATE, event);
  console.log(`[Socket] Emitted timer:update for bounty ${bountyId}`);
}

// Start server function
export function startSocketServer(port: number = parseInt(process.env.SOCKET_PORT || '3001', 10)): Promise<HttpServer> {
  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`✓ Socket.io server listening on port ${port}`);
      resolve(server);
    });
  });
}

// Graceful shutdown
export async function stopSocketServer(): Promise<void> {
  return new Promise((resolve) => {
    io.close(() => {
      server.close(() => {
        console.log('✓ Socket.io server stopped');
        resolve();
      });
    });
  });
}

export { io, server, app };
