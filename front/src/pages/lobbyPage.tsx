import createGame from '../fetch/createGame';
import MyButton from '../components/MyButton';
import CurrentGamesList from '../components/CurrentGamesList';
import { useNavigate } from 'react-router-dom';
import { User } from '../dto/User';
import { useEffect } from 'react';
import { socket } from '../App';

const Lobby = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const handleCreateGame = async () => {
    const gameId = await createGame(user.id);
    navigate(`/pregame/${gameId}/${user.username}`);
  };
  useEffect(() => {
    socket.emit('leaveGame', { userId: user.id });
    return () => {
      socket.off('leaveGame');
    };
  }, [user.id]);
  return (
    <div className="text-red-500 text-4xl flex justify-center items-center gap-x-48 h-screen">
      <MyButton onClick={handleCreateGame} text="Create Game" />
      <CurrentGamesList />
    </div>
  );
};

export default Lobby;
