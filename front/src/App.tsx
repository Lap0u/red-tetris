import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import GameGrid from './components/GameGrid';

const socket = socketIO.connect('http://localhost:3334');
const App = () => {
  const [newGrid, setNewGrid] = useState<number[][]>([]);
  useEffect(() => {
    socket.on('newGrid', (grid: number[][]) => {
      setNewGrid(grid);
    });
  }, [socket]);


  return (
    <div className='text-red-500 text-4xl'>
      <GameGrid grid={newGrid} />
      <button onClick={() => socket.emit('grid', 'left')}>newGrid</button>
    </div>
  )
}

export default App
