import React, { useState } from 'react';
import createUser from '../utils/createUser';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/MyButton';
import { socket } from '../App';

const WelcomePage = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleButtonClick = async () => {
    const user = await createUser(username, socket.id);
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
      <MyButton onClick={handleButtonClick} text="Enter tetris' world" />
    </div>
  );
};

export default WelcomePage;
