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
  const [playerScore, setPlayerScore] = useState<number>(0);
  const handleClose = () => setOpen(false);
  useCheckGameId(user);

  const [grid, setGrid] = useState<userGameGrid>({
    username: '',
    grid: [],
    playerDead: false,
  });
  const [othersGrid, setOthersGrid] = useState<userGameGrid[]>([]);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [owner, setOwner] = useState<User>();
  useEffect(() => {
    const handleGameEnd = ({
      userId,
      score,
      owner,
    }: {
      userId: number;
      score: number;
      owner: User;
    }) => {
      if (user.id === userId) {
        setIsWinner(true);
        setPlayerScore(score);
      }
      setOwner(owner);
      setOpen(true);
    };

    const handleNewGrid = ({
      completeGrid,
      playerId,
      username,
      invisible,
    }: {
      completeGrid: number[][];
      playerId: number;
      username: string;
      invisible: boolean;
    }) => {
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
              invisible: invisible,
            };
            return [...prev, newGrid];
          }
          const newGrids = [...prev];
          newGrids[index] = { ...prev[index], grid: completeGrid, invisible };
          return newGrids;
        });
      }
    };
    const handlePlayerDead = ({
      username,
      score,
    }: {
      username: string;
      score: number;
    }) => {
      if (user?.username === username) {
        setGrid((prev) => {
          const newGame = { ...prev, playerDead: true };
          return newGame;
        });
        setPlayerScore(score);
      } else {
        setOthersGrid((prev) => {
          const index = prev.findIndex((p) => p.username === username);
          const newGrids = [...prev];
          newGrids[index] = { ...prev[index], playerDead: true };
          return newGrids;
        });
      }
    };
    const handleIndestructibleSent = ({
      nbIndestructible,
    }: {
      nbIndestructible: number;
    }) => {
      socket.emit('setIndestructible', { nbIndestructible });
    };
    socket.on('gameEnd', handleGameEnd);
    socket.on('myNewGrid', handleNewGrid);
    socket.on('playerDead', handlePlayerDead);
    socket.on('indestructibleSent', handleIndestructibleSent);
    return () => {
      socket.off('myNewGrid', handleNewGrid);
      socket.off('playerDead', handlePlayerDead);
      socket.off('gameEnd', handleGameEnd);
      socket.off('indestructibleSent', handleIndestructibleSent);
    };
  }, [othersGrid, user?.id, user?.username]);

  useEffect(() => {
    // Function to handle keydown events
    const keyDownEvent = (event: KeyboardEvent) => {
      const response = { room: gameId, userId: user?.id, key: event.code };
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
      <h1 className="text-center text-4xl text-white">Game</h1>
      <div
        ref={gameAreaRef} // Use the ref here
        className="w-full h-full flex justify-center items-center gap-x-8"
        tabIndex={-1} // Make the div focusable
        style={{ outline: 'none' }} // Optional: Remove focus outline for aesthetics
      >
        {othersGrid.length !== 0 && <OthersGrid usersGamesGrids={othersGrid} />}
        <GameGrid userGameGrid={grid} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="flex justify-center items-center h-full bg-gray-900 bg-opacity-75">
          <EndGameModal
            isWinner={isWinner}
            score={playerScore}
            owner={owner}
            user={user}
          />
        </div>
      </Modal>
    </div>
  );
};

export default GamePage;
