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
import { AvailableGridColors } from '../dto/Grid';
import CustomizeGrid from '../components/CustomizeGrid';

const PregamePage = ({ user }: { user: User }) => {
  const { gameId, username } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<User[]>([]);
  const [gameOwner, setGameOwner] = useState(false);
  const [gameSpeed, setGameSpeed] =
    useState<AvailableGameSpeed>('intermediate');
  const [gridColor, setGridColor] =
    useState<AvailableGridColors>('bg-gray-600');

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
    socket.on(`gameOwner`, () => {
      setGameOwner(true);
    });
    // socket.emit('joinRoom', { room: gameId, userId: user.id });
    return () => {
      socket.off('gameSpeed');
      socket.off('gameStarted');
      socket.off('gameStart');
      socket.off('playerJoined');
      socket.off('playerLeftRoom');
      socket.off('notOwner');
    };
  }, [gameId, navigate, user.username, user.id, username]);
  const startGame = async () => {
    await createGrids(gameId).then(() => {
      socket.emit('askGameStart', { room: gameId, userId: user.id, gameSpeed });
    });
  };
  return (
    <div className="flex flex-col gap-y-24 justify-center items-center h-screen">
      <h1 className="text-4xl text-red-500 font-bold">Pregame</h1>
      <div
        className="flex justify-center items-center gap-x-12
      h-fit">
        <MyButton onClick={startGame} text="Start Game" disabled={!gameOwner} />
        {!gameOwner && (
          <p className="w-48 text-red-500 text-xs text-center">
            Wait for the game's owner to launch...
          </p>
        )}
        <PlayersList players={players} />
      </div>
      <CustomizeGrid gridColor={gridColor} setGridColor={setGridColor} />
      {gameOwner && (
        <CustomizeGameSpeed
          gameSpeed={gameSpeed}
          gameId={gameId}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default PregamePage;
