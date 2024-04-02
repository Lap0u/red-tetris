import { Socket } from 'socket.io-client';
import { AvailableGameSpeed } from '../dto/AvailableGameSpeed';

export const handleGameSpeed = (
  socket: Socket | null,
  gameId: string | undefined,
  userId: number,
  gameSpeed: AvailableGameSpeed
) => {
  if (socket === null) return gameSpeed;
  socket.emit('askSetGameSpeed', {
    room: gameId,
    userId: userId,
    gameSpeed,
  });
  return gameSpeed;
};
