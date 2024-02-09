import createGame from '../utils/createGame';
import MyButton from '../components/MyButton';
import CurrentGamesList from '../components/CurrentGamesList';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();
  if (user === null) return null;
  const handleCreateGame = async () => {
    const gameId = await createGame(user?.id);
    navigate(`/${gameId}[${user?.id}]`);
  };
  return (
    <div className="text-red-500 text-4xl flex justify-center items-center gap-x-48 h-screen">
      <MyButton onClick={handleCreateGame} text="Create Game" />
      <CurrentGamesList />
    </div>
  );
};

export default Lobby;
