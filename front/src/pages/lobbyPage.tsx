import createGame from '../fetch/createGame';
import MyButton from '../components/MyButton';
import CurrentGamesList from '../components/CurrentGamesList';
import { useNavigate } from 'react-router-dom';
import { User } from '../dto/User';
import { useEffect } from 'react';
import { socket } from '../App';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Lobby = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const handleCreateGame = async () => {
    createGame(user.id).then((gameId) => {
      socket.emit('joinRoom', { room: gameId, userId: user?.id });
      // navigate(`/pregame/${gameId}/${user.username}`);
    });
  };
  const handlePlayerCanJoin = (roomId: string) => {
    navigate(`/pregame/${roomId}/${user.username}`);
  };
  useEffect(() => {
    socket.on(`roomFull`, () => {
      toast.error('Room is full', {
        toastId: 'room-full',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      return;
    });
    socket.emit('leaveGame', { userId: user.id });
    socket.on('playerCanJoin', handlePlayerCanJoin);
    return () => {
      socket.off('playerCanJoin', handlePlayerCanJoin);
      socket.off('leaveGame');
      socket.off('roomFull');
    };
  }, [user.id]);
  return (
    <div className="text-red-500 text-4xl flex justify-center items-center gap-x-48 h-screen">
      <MyButton onClick={handleCreateGame} text="Create Game" />
      <CurrentGamesList />
      <ToastContainer limit={2} />
    </div>
  );
};

export default Lobby;
