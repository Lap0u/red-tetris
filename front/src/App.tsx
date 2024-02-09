import socketIO from 'socket.io-client';
import WelcomePage from './pages/welcomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import ProtectedRoute from './components/ProtectedRoute';
import Lobby from './pages/lobbyPage';
import GamePage from './pages/gamePage';

export const socket = socketIO.connect('http://localhost:3334');
const App = () => {
  const user = useSelector((state: RootState) => state.users.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:gameUrl"
          element={
            <ProtectedRoute user={user}>
              <GamePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/lobby"
          element={
            <ProtectedRoute user={user}>
              <Lobby />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
