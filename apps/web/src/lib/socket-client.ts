import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '@bountyz/shared';

const SOCKET_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'http://localhost:3001';

// Socket.io client singleton
let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    // Connection event handlers
    socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('[Socket] Connected to worker');
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log('[Socket] Disconnected from worker:', reason);
    });

    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
      console.error('[Socket] Connection error:', error.message);
    });

    socket.on(SOCKET_EVENTS.RECONNECT, (attemptNumber) => {
      console.log('[Socket] Reconnected after', attemptNumber, 'attempts');
    });

    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('[Socket] Reconnection attempt:', attemptNumber);
    });

    socket.on('reconnect_error', (error) => {
      console.error('[Socket] Reconnection error:', error.message);
    });

    socket.on('reconnect_failed', () => {
      console.error('[Socket] Reconnection failed after all attempts');
    });
  }

  return socket;
}

export function connectSocket(): void {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function joinBountyRoom(bountyId: number): void {
  const s = getSocket();
  s.emit(SOCKET_EVENTS.JOIN_BOUNTY, bountyId);
}

export function leaveBountyRoom(bountyId: number): void {
  const s = getSocket();
  s.emit(SOCKET_EVENTS.LEAVE_BOUNTY, bountyId);
}
