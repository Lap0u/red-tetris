import React, { useState } from 'react';
import createUser from '../utils/createUser';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleButtonClick = async () => {
    const user = await createUser(username);
    dispatch(setUser(user));
    navigate('/lobby');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/red-tetris-logo.png"
        alt="Tetris logo"
        className="object-cover mb-32"
      />
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter your username"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={handleButtonClick}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
        Enter tetris' world
      </button>
    </div>
  );
};

export default WelcomePage;
