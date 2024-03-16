import React from 'react';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';

type EndGameModalProps = {
  isWinner: boolean;
};

const EndGameModal: React.FC<EndGameModalProps> = ({ isWinner }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">
          {isWinner ? 'Congratulations! You won!' : 'Game Over'}
        </h2>
        <p className="text-lg mb-8">
          {isWinner
            ? 'You are the champion! Well done!'
            : 'Better luck next time!'}
        </p>
        <div className="flex justify-center gap-x-4">
          <MyButton
            text="Return to Lobby"
            onClick={() => {
              navigate('/lobby');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EndGameModal;
