import { useEffect, useState } from 'react';
import MyButton from './MyButton';
import getAvailableGames from '../utils/getAvailableGames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

const CurrentGamesList = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const getGames = async () => {
      const data = await getAvailableGames();
      setGames(data);
    };
    getGames();
  }, []);
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();
  if (user === null) return null;
  const joinGame = (gameId: number) => {
    navigate(`/pregame/${gameId}/${user?.username}`);
  };
  return (
    <>
      {games.length === 0 ? (
        <div>No games available currently</div>
      ) : (
        <div className="flex flex-col gap-y-8">
          {games.map((game, id) => (
            <MyButton
              key={id}
              text={`Join ${id}`}
              onClick={() => {
                joinGame(game.id);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CurrentGamesList;
