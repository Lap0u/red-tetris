import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getGame from '../fetch/getGame';

const useCheckGameId = (user: string) => {
  const { gameId, username } = useParams();
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
    };
    checkGameId();
  }, [gameId, navigate, user, username]);
};

export default useCheckGameId;
