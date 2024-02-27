import createGame from '../fetch/createGame';
import MyButton from '../components/MyButton';
import CurrentGamesList from '../components/CurrentGamesList';
import { useNavigate } from 'react-router-dom';
import { User } from '../dto/User';

const Lobby = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  // if (user === null) return null;
  const handleCreateGame = async () => {
    const gameId = await createGame(user.id);
    navigate(`/pregame/${gameId}/${user.username}`);
  };
  return (
    <div className="text-red-500 text-4xl flex justify-center items-center gap-x-48 h-screen">
      <MyButton onClick={handleCreateGame} text="Create Game" />
      <CurrentGamesList />
    </div>
  );
};

export default Lobby;
