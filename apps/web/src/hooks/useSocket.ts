'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { getSocket, connectSocket, disconnectSocket, joinBountyRoom, leaveBountyRoom } from '@/lib/socket-client';
import { BountyUpdateEvent, TimerUpdateEvent, SOCKET_EVENTS } from '@bountyz/shared';

interface UseSocketOptions {
  bountyId?: number;
  onBountyUpdate?: (event: BountyUpdateEvent) => void;
  onTimerUpdate?: (event: TimerUpdateEvent) => void;
  autoConnect?: boolean;
}

export function useSocket({
  bountyId,
  onBountyUpdate,
  onTimerUpdate,
  autoConnect = true,
}: UseSocketOptions = {}) {
  const socketRef = useRef(getSocket());
  const [isConnected, setIsConnected] = useState(socketRef.current.connected);

  useEffect(() => {
    const socket = socketRef.current;

    // Handle connection state changes
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on(SOCKET_EVENTS.CONNECT, handleConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT, handleDisconnect);

    if (autoConnect) {
      connectSocket();
    }

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, handleConnect);
      socket.off(SOCKET_EVENTS.DISCONNECT, handleDisconnect);
    };
  }, [autoConnect]);

  // Handle bounty room joining
  useEffect(() => {
    const socket = socketRef.current;
    
    if (bountyId && isConnected) {
      joinBountyRoom(bountyId);
    }

    return () => {
      if (bountyId) {
        leaveBountyRoom(bountyId);
      }
    };
  }, [bountyId, isConnected]);

  // Handle bounty update events
  useEffect(() => {
    const socket = socketRef.current;

    if (onBountyUpdate) {
      socket.on(SOCKET_EVENTS.BOUNTY_UPDATE, onBountyUpdate);
    }

    if (onTimerUpdate) {
      socket.on(SOCKET_EVENTS.TIMER_UPDATE, onTimerUpdate);
    }

    return () => {
      if (onBountyUpdate) {
        socket.off(SOCKET_EVENTS.BOUNTY_UPDATE, onBountyUpdate);
      }
      if (onTimerUpdate) {
        socket.off(SOCKET_EVENTS.TIMER_UPDATE, onTimerUpdate);
      }
    };
  }, [onBountyUpdate, onTimerUpdate]);

  const emit = useCallback((event: string, data: any) => {
    socketRef.current.emit(event, data);
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    emit,
    joinBountyRoom,
    leaveBountyRoom,
  };
}
