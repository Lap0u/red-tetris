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
  const { gameId, username } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<User[]>([]);
  const [gameOwner, setGameOwner] = useState(false);
  const [gameSpeed, setGameSpeed] =
    useState<AvailableGameSpeed>('intermediate');
  useCheckGameId(user);
  useEffect(() => {
    if (user.username !== username) {
      navigate('/lobby');
    }
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
    socket.on(`playerLeftRoom`, (playerId) => {
      setPlayers((prev) => prev.filter((player) => player.id !== playerId));
    });
    socket.on('playerLeftPreGame', (playerId) => {
      setPlayers((prev) => prev.filter((player) => player.id !== playerId));
    });
    socket.on(`roomFull`, () => {
      alert('Room is full');
      navigate('/lobby');
    });
    socket.on(`gameOwner`, () => {
      setGameOwner(true);
    });
    socket.emit('joinRoom', { room: gameId, userId: user.id });
    return () => {
      socket.off('gameSpeed');
      socket.off('gameStarted');
      socket.off('gameStart');
      socket.off('playerJoined');
      socket.off('playerLeftRoom');
      socket.off('roomFull');
      socket.off('notOwner');
    };
  }, [gameId, navigate, user.username, user.id, username]);
  const startGame = async () => {
    await createGrids(gameId).then(() => {
      socket.emit('askGameStart', { room: gameId, userId: user.id, gameSpeed });
    });
  };
  return (
    <div className="w-screen h-screen gap-x-32 flex justify-center items-center">
      {gameOwner && (
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
          disabled={!gameOwner}
        />
        {!gameOwner && (
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
