import React, { FC, useEffect } from 'react';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import createGame from '../fetch/createGame';
import { socket } from '../App';
import { User } from '../dto/User';

type EndGameModalProps = {
  isWinner: boolean;
  score: number;
  owner: User | undefined;
  user: User;
  oldGameId: string | undefined;
};

const EndGameModal: React.FC<EndGameModalProps> = ({
  isWinner,
  score,
  owner,
  user,
  oldGameId,
}) => {
  const navigate = useNavigate();
  const handleRestart = async () => {
    if (!owner) return;
    createGame(owner.id).then((newGameId) => {
      socket.emit('joinRoom', { room: newGameId, userId: user?.id });

      socket.emit('redirectRestartPlayers', { oldGameId, newGameId });
      navigate(`/pregame/${newGameId}/${user.username}`);
    });
  };
  const handleRedirectRestart = (newGameId: string) => {
    socket.emit('joinRoom', { room: newGameId, userId: user?.id });

    navigate(`/pregame/${newGameId}/${user.username}`);
  };

  useEffect(() => {
    socket.on('redirectRestart', handleRedirectRestart);
    return () => {
      socket.off('redirectRestart', handleRedirectRestart);
    };
  }, []);
  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-4">
        {isWinner ? 'Congratulations! You won!' : 'Game Over'}
      </h2>
      <p className="text-lg mb-8">
        {isWinner
          ? 'You are the champion! Well done!'
          : 'Better luck next time!'}
      </p>
      <p>You scored {score} points</p>
      <div className="flex justify-center gap-x-4">
        {owner && user.socketId === owner.socketId && (
          <MyButton text="Restart Game" onClick={handleRestart} />
        )}
        <MyButton
          text="Return to Lobby"
          onClick={() => {
            navigate('/lobby');
          }}
        />
        <MyButton
          text="Highscores"
          onClick={() => {
            navigate('/score');
          }}
        />
      </div>
    </div>
  );
};

export default EndGameModal;
