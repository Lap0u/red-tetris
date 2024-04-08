import React from 'react';
import MyButton from '../components/MyButton';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl text-red-500 font-bold">Page Not Found</h1>
      <img src="404-tetris.png" alt="404" />
      <MyButton
        onClick={() => navigate('/lobby')}
        text={'Return to homepage'}
      />
    </div>
  );
};

export default NotFoundPage;
