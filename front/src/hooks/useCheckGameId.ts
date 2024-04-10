import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import getGame from '../fetch/getGame';
import { User } from '../dto/User';

const useCheckGameId = (user: User) => {
  const { gameId, username } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    const checkGameId = async () => {
      if (!gameId) {
        navigate('/lobby');
        return;
      }
      if (user.username !== username) {
        navigate('/busy');
        return;
      }
      const { game, sockets } = await getGame(gameId);
      const { id, status } = game;
      console.log('socketssss', sockets, user.socketId);
      if (sockets === undefined || !sockets.includes(user.socketId))
        navigate('/busy');
      if (!id) {
        navigate('/lobby');
      }
      if (status === 'finished') {
        navigate('/busy');
      }
      if (status === 'waiting' && location.pathname.includes('/game/')) {
        navigate('/lobby');
      }
      if (status === 'playing' && !location.pathname.includes('/game/')) {
        navigate(`/busy`);
      }
    };
    checkGameId();
  }, [gameId, navigate, user, username, location.pathname]);
};

export default useCheckGameId;
