import React from 'react';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';

type EndGameModalProps = {
  isWinner: boolean;
  score: number;
};

const EndGameModal: React.FC<EndGameModalProps> = ({ isWinner, score }) => {
  const navigate = useNavigate();
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
