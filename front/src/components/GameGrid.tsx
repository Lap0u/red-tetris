import { AvailableGridColors, Grid } from '../dto/Grid';
import { getCellColor } from '../utils/getCellColor';

const GameGrid = ({
  grid,
  small = false,
  gridColor = '600',
}: {
  grid: Grid;
  small?: boolean;
  gridColor: AvailableGridColors;
}) => {
  const gridHeight = 20;
  const gridWidth = 10;
  const cellSize = small ? 'w-2 h-2' : 'w-8 h-8'; // Adjusted to keep as string for class concatenation

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={y + '-' + x}
              className={`${cellSize} border ${getCellColor(cell, gridColor)}`}
            />
          ))}
          {Array.from({ length: gridWidth - row.length }).map((_, x) => (
            <div
              key={'empty-' + y + '-' + x}
              className={`${cellSize} border ${gridColor}`}
            />
          ))}
        </div>
      ))}
      {Array.from({ length: gridHeight - grid.length }).map((_, y) => (
        <div key={'row-' + y} className="flex">
          {Array.from({ length: gridWidth }).map((_, x) => (
            <div
              key={'empty-' + y + '-' + x}
              className={`${cellSize} border ${gridColor}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
