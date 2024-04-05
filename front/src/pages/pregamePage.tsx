import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyButton from '../components/MyButton';
import PlayersList from '../components/PlayersList';
import { User } from '../dto/User';
import { socket } from '../App';
import useCheckGameId from '../hooks/useCheckGameId';
import { AvailableGameSpeed } from '../dto/AvailableGameSpeed';
import CustomizeGameSpeed from '../components/CustomizeGameSpeed';
import createGrids from '../fetch/createGrids';

const PregamePage = ({ user }: { user: User }) => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<User[]>([]);
  const [notGameOwner, setNotGameOwner] = useState(false);
  const [gameSpeed, setGameSpeed] =
    useState<AvailableGameSpeed>('intermediate');
  useCheckGameId();

  useEffect(() => {
    socket.emit('informGameCreated');
    socket.on('gameSpeed', (gameSpeed) => {
      setGameSpeed(gameSpeed);
    });
    socket.on('gameStarted', () => {
      navigate(`/game/${gameId}/${user.username}`);
    });
    socket.on(`gameStart`, () => {
      socket.emit('playerReady', { room: gameId, userId: user.id });
    });
    socket.on(`playerJoined`, (players) => {
      setPlayers(players);
    });
    socket.on(`roomFull`, () => {
      alert('Room is full');
      navigate('/lobby');
    });
    socket.on(`notOwner`, () => {
      setNotGameOwner(true);
    });
    socket.emit('joinRoom', { room: gameId, userId: user.id });
  }, [gameId, navigate, user.username, user.id]);
  const startGame = async () => {
    await createGrids(gameId).then(() => {
      socket.emit('askGameStart', { room: gameId, userId: user.id, gameSpeed });
    });
  };
  return (
    <div className="w-screen h-screen gap-x-32 flex justify-center items-center">
      {!notGameOwner && (
        <CustomizeGameSpeed
          gameSpeed={gameSpeed}
          gameId={gameId}
          userId={user.id}
        />
      )}
      <div
        className="flex flex-col justify-center items-center
      h-fit gap-y-4">
        <MyButton
          onClick={startGame}
          text="Start Game"
          disabled={notGameOwner}
        />
        {notGameOwner && (
          <p className="w-48 text-red-500 text-xs text-center">
            Wait for the game's owner to launch...
          </p>
        )}
      </div>
      <PlayersList players={players} />
    </div>
  );
};

export default PregamePage;
