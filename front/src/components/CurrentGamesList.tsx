import { useEffect, useState } from 'react';
import MyButton from './MyButton';
import getAvailableGames from '../fetch/getAvailableGames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { Game } from '../dto/Game';
import { socket } from '../App';
import { User } from '../dto/User';

const CurrentGamesList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [owners, setOwners] = useState<User[]>([]);
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();

  const handlePlayerCanJoin = (roomId: string) => {
    navigate(`/pregame/${roomId}/${user?.username}`);
  };

  useEffect(() => {
    const getGames = async () => {
      console.log('getGames called');
      getAvailableGames().then((data) => {
        console.log('then data', data);
        setGames(data);
        socket.emit('askGetOwners');
      });
    };
    getGames();
    socket.on('getOwners', (ownersIdsNames) => {
      setOwners([...ownersIdsNames]);
    });
    socket.on('gameListUpdate', getGames);
    socket.on('playerCanJoin', handlePlayerCanJoin);

    return () => {
      socket.off('playerCanJoin', handlePlayerCanJoin);
      socket.off('gameListUpdate', getGames);
      socket.off('getOwners');
    };
  }, []);

  const joinGame = (gameId: string) => {
    socket.emit('joinRoom', { room: gameId, userId: user?.id });
    // navigate(`/pregame/${gameId}/${user?.username}`);
  };

  const getOwnerName = (gameUserId: number) => {
    const ownerIndex = owners.findIndex(
      (owner: User) => owner.id === gameUserId
    );
    return owners[ownerIndex]?.username;
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
