import { io } from 'socket.io-client';
import WelcomePage from './pages/welcomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import ProtectedRoute from './components/ProtectedRoute';
import Lobby from './pages/lobbyPage';
import GamePage from './pages/gamePage';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { setUser } from './store/usersSlice';
import getUser from './fetch/getUser';
import PregamePage from './pages/pregamePage';
import { User } from './dto/User';
import Highscore from './pages/highscorePage';

export const socket = io('http://localhost:3334');
const App = () => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      setIsAuthLoading(true);
      const userCookie = Cookies.get('userId');
      console.log('userCookie', userCookie);
      if (userCookie) {
        const user = await getUser(userCookie);
        console.log('user', user);
        if (!user) {
          Cookies.remove('userId');
          setIsAuthLoading(false);
          return;
        }
        dispatch(setUser(user));
      }
      setIsAuthLoading(false);
    };
    checkUser();
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.users.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="pregame/:gameId/:username"
          element={
            <ProtectedRoute isAuthLoading={isAuthLoading} user={user}>
              <PregamePage user={user as User} />
            </ProtectedRoute>
          }
        />
        <Route
          path="score"
          element={
            <ProtectedRoute isAuthLoading={isAuthLoading} user={user}>
              <Highscore />
            </ProtectedRoute>
          }
        />
        <Route
          path="game/:gameId/:username"
          element={
            <ProtectedRoute isAuthLoading={isAuthLoading} user={user}>
              <GamePage user={user as User} />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<WelcomePage user={user} />} />
        <Route
          path="/lobby"
          element={
            <ProtectedRoute isAuthLoading={isAuthLoading} user={user}>
              <Lobby user={user as User} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
