import { io } from 'socket.io-client';
import WelcomePage from './pages/welcomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import ProtectedRoute from './components/ProtectedRoute';
import Lobby from './pages/lobbyPage';
import GamePage from './pages/gamePage';
import PregamePage from './pages/pregamePage';

export const socket = io('http://localhost:3334');
const App = () => {
  const user = useSelector((state: RootState) => state.users.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="pregame/:gameId/:username"
          element={
            <ProtectedRoute user={user}>
              <PregamePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="game/:gameUrl/:username"
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
