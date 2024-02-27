import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import getGame from '../fetch/getGame';

const useCheckGameId = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    const checkGameId = async () => {
      if (!gameId) {
        navigate('/lobby');
        return;
      }
      const game = await getGame(gameId);
      if (!game) {
        navigate('/lobby');
      }
    };
    checkGameId();
  }, [gameId, navigate]);

  return ;
}

export default useCheckGameId
