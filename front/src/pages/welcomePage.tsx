import React, { useEffect, useState } from 'react';
import createUser from '../fetch/createUser';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/MyButton';
import Cookies from 'js-cookie';
import { User } from '../dto/User';
import { socket } from '../App';

const WelcomePage = ({ user }: { user: User | null }) => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the lobby if the user exists
    if (user !== null) {
      navigate('/lobby');
    }
  }, [user, navigate]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleButtonClick = async () => {
    const user = await createUser(username, socket.id);
    dispatch(setUser(user));
    Cookies.set('userId', user.id);
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
