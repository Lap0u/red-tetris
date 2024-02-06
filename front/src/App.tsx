import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import GameGrid from './components/GameGrid';
import startGame from './utils/startGame';
import createUser from './utils/createUser';

const socket = socketIO.connect('http://localhost:3334');
const App = () => {
  const [newGrid, setNewGrid] = useState<number[][]>([]);
  useEffect(() => {
    socket.on('newGrid', (grid: number[][]) => {
      setNewGrid(grid);
    });
  }, [socket]);


  return (
    <div className='text-red-500 text-4xl flex flex-col gap-y-4'>
      <GameGrid grid={newGrid} />
      <button onClick={startGame}>startGame</button>
      <button onClick={() => socket.emit('grid', {})}>newGrid</button>
      <button onClick={() => createUser('clement')}>create user</button>
    </div>
  )
}

export default App
