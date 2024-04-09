import React from 'react';
import MyButton from '../components/MyButton';
import { useNavigate } from 'react-router-dom';

const BusyGame: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl text-red-500 font-bold">
        The game you are looking for is already running or over
      </h1>
      <img src="busy.png" alt="404" />
      <MyButton
        onClick={() => navigate('/lobby')}
        text={'Return to homepage'}
      />
    </div>
  );
};

export default BusyGame;
