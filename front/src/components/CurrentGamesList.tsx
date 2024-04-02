import { useEffect, useState } from 'react';
import MyButton from './MyButton';
import getAvailableGames from '../fetch/getAvailableGames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { Game } from '../dto/Game';
import { socket } from '../App';
import { User } from '../dto/User';
import { getOwnerName } from '../utils/getOwnerName';

const CurrentGamesList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [owners, setOwners] = useState<User[]>([]);
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getGames = async () => {
      const data = await getAvailableGames();
      setGames(data);
    };
    getGames();
    socket.emit('askGetOwners');
    socket.on('getOwners', (ownersIdsNames) => {
      setOwners([...ownersIdsNames]);
    });
  }, []);

  const joinGame = (gameId: string) => {
    navigate(`/pregame/${gameId}/${user?.username}`);
  };

  return (
    <>
      {games?.length === 0 ? (
        <div>No games available currently</div>
      ) : (
        <div className="flex flex-col gap-y-8">
          {games.map((game, id) => (
            <MyButton
              key={id}
              text={`Join [${getOwnerName(game.userId, owners)}]`}
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
