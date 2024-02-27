import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getGame from '../fetch/getGame';
import MyButton from '../components/MyButton';
import PlayersList from '../components/PlayersList';
import { User } from '../dto/User';
import { socket } from '../App';

const PregamePage = ({ user }: { user: User }) => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<User[]>([]);
  const [notGameOwner, setNotGameOwner] = useState(false);

  useEffect(() => {
    const checkGameId = async () => {
      if (!gameId) {
        navigate('/lobby');
        return;
      }
      const game = await getGame(gameId);
      if (!game) {
        navigate('/lobby');
      }
    };
    checkGameId();
    socket.on(`gameStart`, () => {
      navigate(`/game/${gameId}/${user.username}`);
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
  const startGame = () => {
    socket.emit('askGameStart', { room: gameId, userId: user.id });
  };
  return (
    <div className="w-screen h-screen gap-x-32 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center
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
