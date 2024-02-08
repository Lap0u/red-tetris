import createGame from '../utils/createGame';
import MyButton from '../components/MyButton';
import CurrentGamesList from '../components/CurrentGamesList';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const GamePage = () => {
  const user = useSelector((state: RootState) => state.users.user);
  if (user === null) return null;
  return (
    <div className="text-red-500 text-4xl flex justify-center items-center gap-x-48 h-screen">
      <MyButton onClick={() => createGame(user?.id)} text="Create Game" />
      <CurrentGamesList />
    </div>
  );
};

export default GamePage;
