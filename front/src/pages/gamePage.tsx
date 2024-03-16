import { useEffect, useState, useRef } from 'react';
import GameGrid from '../components/GameGrid';
import { socket } from '../App';
import { useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { User } from '../dto/User';
import { userGameGrid } from '../dto/Grid';
import OthersGrid from '../components/OthersGrid';
import useCheckGameId from '../hooks/useCheckGameId';
import EndGameModal from '../components/EndGameModal';

const GamePage = ({ user }: { user: User }) => {
  const { gameId } = useParams();
  const gameAreaRef = useRef<HTMLDivElement>(null); // Create a ref for the game area div
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useCheckGameId();

  const [grid, setGrid] = useState<userGameGrid>({
    username: '',
    grid: [],
    playerDead: false,
  });
  const [othersGrid, setOthersGrid] = useState<userGameGrid[]>([]);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  useEffect(() => {
    console.log(open, isWinner);
    socket.on('gameEnd', (userId: number) => {
      if (user.id === userId && othersGrid.length > 0) {
        setIsWinner(true)
      }
      setOpen(true)
    });

    socket.on('myNewGrid', ({ completeGrid, playerId, username }) => {
      if (user?.id === playerId) {
        setGrid(() => {
          const newGrid = { username, grid: completeGrid, playerDead: false };
          return newGrid;
        });
      } else {
        setOthersGrid((prev) => {
          const index = prev.findIndex((p) => p.username === username);
          if (index === -1) {
            const newGrid = {
              username,
              grid: completeGrid,
              playerDead: false,
            };
            return [...prev, newGrid];
          }
          const newGrids = [...prev];
          newGrids[index] = { ...prev[index], grid: completeGrid };
          return newGrids;
        });
      }
    });
    socket.on('playerDead', ({ username }) => {
      console.log('someoneDied', user?.username, username);
      if (user?.username === username)
        setGrid((prev) => {
          const newGame = { ...prev, playerDead: true };
          console.log('newGame', newGame);
          return newGame;
        });
      else {
        setOthersGrid((prev) => {
          const index = prev.findIndex((p) => p.username === username);
          const newGrids = [...prev];
          newGrids[index] = { ...prev[index], playerDead: true };
          return newGrids;
        });
      }
    });
    return () => {
      socket.off('myNewGrid', setGrid);
      socket.off('playerDead', setGrid);
      socket.off('gameEnd', setIsWinner);
    };
  }, [user?.id, user?.username]);

  useEffect(() => {
    // Function to handle keydown events
    const keyDownEvent = (event: KeyboardEvent) => {
      const response = { room: gameId, userId: user?.id, key: event.code };
      console.log('response', response);
      socket.emit('keyPress', response);
    };

    // Attach the event listener to the window or specific element
    const gameArea = gameAreaRef.current;
    gameArea?.addEventListener('keydown', keyDownEvent);

    // Ensure the div is focused
    gameArea?.focus();

    // Clean up the event listener
    return () => {
      gameArea?.removeEventListener('keydown', keyDownEvent);
    };
  }, [gameId, user?.id]); // Ensure useEffect is called again if gameId or user.id changes

  return (
    <div>
      <div
        ref={gameAreaRef} // Use the ref here
        className="w-full h-full flex justify-center items-center gap-x-8"
        style={{ outline: 'none' }} // Optional: Remove focus outline for aesthetics
      >
        <OthersGrid usersGamesGrids={othersGrid} />
        <GameGrid userGameGrid={grid} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <>
          <EndGameModal isWinner={isWinner} />
        </>
      </Modal>
    </div>
  );
};

export default GamePage;
