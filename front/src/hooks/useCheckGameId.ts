import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import getGame from '../fetch/getGame';

const useCheckGameId = (user: string) => {
  const { gameId, username } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    const checkGameId = async () => {
      if (!gameId) {
        navigate('/lobby');
        return;
      }
      if (user !== username) {
        navigate('/busy');
        return;
      }

      const { id, status } = await getGame(gameId);
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
