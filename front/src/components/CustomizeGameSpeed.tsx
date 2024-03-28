import { socket } from '../App';
import { AvailableGameSpeed } from '../dto/AvailableGameSpeed';

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
  const handleGameSpeed = (gameSpeed: AvailableGameSpeed) => {
    console.log('test', gameSpeed, gameId, userId);
    socket.emit('askSetGameSpeed', {
      room: gameId,
      userId: userId,
      gameSpeed,
    });
  };
  return (
    <div className="flex flex-col gap-y-12 justify-center items-center">
      <div
        onClick={() => handleGameSpeed('beginner')}
        className={
          gameSpeed === 'beginner'
            ? 'p-4 bg-pink-300 hover:cursor-pointer rounded-xl'
            : 'p-4 hover:cursor-pointer'
        }>
        Beginner
      </div>
      <div
        onClick={() => handleGameSpeed('intermediate')}
        className={
          gameSpeed === 'intermediate'
            ? 'p-4 bg-pink-300 hover:cursor-pointer rounded-xl'
            : 'p-4 hover:cursor-pointer'
        }>
        Intermediate
      </div>
      <div
        onClick={() => handleGameSpeed('expert')}
        className={
          gameSpeed === 'expert'
            ? 'p-4 bg-pink-300 hover:cursor-pointer rounded-xl'
            : 'p-4 hover:cursor-pointer'
        }>
        Expert
      </div>
      <div
        onClick={() => handleGameSpeed('le X')}
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
