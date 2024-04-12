import { socket } from '../App';
import { AvailableGameSpeed } from '../dto/AvailableGameSpeed';
import { handleGameSpeed } from '../utils/handleGameSpeed';

type CustomizeGameSpeedProps = {
  gameSpeed: AvailableGameSpeed;
  gameId: string | undefined;
  userId: number;
};

const CustomizeGameSpeed = ({
  gameSpeed,
  gameId,
  userId,
}: CustomizeGameSpeedProps) => {
  return (
    <div className="flex gap-x-12 justify-center items-center">
      <div
        onClick={() => handleGameSpeed(socket, gameId, userId, 'beginner')}
        className={
          gameSpeed === 'beginner'
            ? 'p-4 bg-pink-300 hover:cursor-pointer rounded-xl'
            : 'p-4 hover:cursor-pointer'
        }>
        Beginner
      </div>
      <div
        onClick={() => handleGameSpeed(socket, gameId, userId, 'intermediate')}
        className={
          gameSpeed === 'intermediate'
            ? 'p-4 bg-pink-300 hover:cursor-pointer rounded-xl'
            : 'p-4 hover:cursor-pointer'
        }>
        Intermediate
      </div>
      <div
        onClick={() => handleGameSpeed(socket, gameId, userId, 'expert')}
        className={
          gameSpeed === 'expert'
            ? 'p-4 bg-pink-300 hover:cursor-pointer rounded-xl'
            : 'p-4 hover:cursor-pointer'
        }>
        Expert
      </div>
      <div
        onClick={() => handleGameSpeed(socket, gameId, userId, 'le X')}
        className={
          gameSpeed === 'le X'
            ? 'p-4 bg-pink-300 hover:cursor-pointer rounded-xl'
            : 'p-4 hover:cursor-pointer'
        }>
        Le X
      </div>
    </div>
  );
};

export default CustomizeGameSpeed;
