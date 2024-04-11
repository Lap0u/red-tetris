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
        console.log('user.username !== username');
        navigate('/busy');
        return;
      }
      const { game, sockets } = await getGame(gameId);
      const { id, status } = game;
      console.log('socketssss', sockets, user.socketId);
      if (sockets === undefined || !sockets.includes(user.socketId)) {
        console.log('sockets === undefined');
        navigate('/busy');
      }
      else if (!id) {
        navigate('/lobby');
      }
      else if (status === 'finished') {
        console.log('status === finished');
        navigate('/busy');
      }
      else if (status === 'waiting' && location.pathname.includes('/game/')) {
        navigate('/lobby');
      }
      else if (status === 'playing' && !location.pathname.includes('/game/')) {
        console.log('status === playing');
        navigate(`/busy`);
      }
      return;
    };
    checkGameId();
  }, [gameId, navigate, user, username, location.pathname]);
};

export default useCheckGameId;
