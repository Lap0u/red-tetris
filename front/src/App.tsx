import socketIO from 'socket.io-client';
import WelcomePage from './pages/welcomePage';

export const socket = socketIO.connect('http://localhost:3334');
const App = () => {
  return <WelcomePage />;
};

export default App;
