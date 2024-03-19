import { useEffect, useState, useRef } from 'react';
import GameGrid from '../components/GameGrid';
import { socket } from '../App';
import { useParams } from 'react-router-dom';
// import getGame from '../fetch/getGame';
import { User } from '../dto/User';
import { Grid, userGameGrid } from '../dto/Grid';
import OthersGrid from '../components/OthersGrid';
import useCheckGameId from '../hooks/useCheckGameId';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const GamePage = ({ user }: { user: User }) => {
  const colorGrid = useSelector(
    (state: RootState) => state.gridColor.gridColor
  );
  console.log('colorGrid', colorGrid);

  const { gameId } = useParams();
  const gameAreaRef = useRef<HTMLDivElement>(null); // Create a ref for the game area div

  useCheckGameId();

  const [grid, setGrid] = useState<Grid>(
    Array.from({ length: 20 }, () => Array.from({ length: 10 }, () => 0))
  );
  const [othersGrid, setOthersGrid] = useState<userGameGrid[]>([]);
  useEffect(() => {
    socket.on('myNewGrid', ({ completeGrid, playerId, username }) => {
      console.log('myNewGrid', completeGrid, playerId, username, user?.id);
      if (user?.id === playerId) {
        setGrid(completeGrid);
      } else {
        setOthersGrid((prev) => {
          const index = prev.findIndex((p) => p.username === username);
          if (index === -1) {
            return [...prev, { username, grid: completeGrid }];
          }
          prev[index].grid = completeGrid;
          return prev;
        });
      }
    });
    return () => {
      socket.off('myNewGrid', setGrid);
    };
  }, [user?.id]);

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
    <div
      ref={gameAreaRef} // Use the ref here
      className="w-full h-full flex justify-center items-center gap-x-8"
      style={{ outline: 'none' }} // Optional: Remove focus outline for aesthetics
    >
      <OthersGrid usersGamesGrids={othersGrid} />
      <GameGrid grid={grid} gridColor={colorGrid} />
    </div>
  );
};

export default GamePage;
