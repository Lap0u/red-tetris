import { userGameGrid } from '../dto/Grid';
import { getCellColor } from '../utils/getCellColor';

const GameGrid = ({
  userGameGrid,
  small = false,
}: {
  userGameGrid: userGameGrid;
  small?: boolean;
}) => {
  const gridHeight = 20;
  const gridWidth = 10;
  const cellSize = small ? 'w-2 h-2' : 'w-8 h-8';
  const bannerSize = small ? 'text-xl px-12 py-2' : 'text-6xl px-12 py-2';

  return (
    <div className="flex flex-col relative justify-center items-center h-full w-full">
      {userGameGrid.playerDead === true ? (
        <h2
          className={`${bannerSize} -rotate-[30deg] bg-red-500 absolute text-teal-500 opacity-70`}>
          Dead
        </h2>
      ) : null}
      {!userGameGrid.invisible ? (
        <>
          {userGameGrid.grid.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => (
                <div
                  key={y + '-' + x}
                  className={`${cellSize} border ${getCellColor(cell)}`}
                />
              ))}
              {Array.from({ length: gridWidth - row.length }).map((_, x) => (
                <div
                  key={'empty-' + y + '-' + x}
                  className={`${cellSize} border bg-gray-500`}
                />
              ))}
            </div>
          ))}
          {Array.from({ length: gridHeight - userGameGrid.grid.length }).map(
            (_, y) => (
              <div key={'row-' + y} className="flex">
                {Array.from({ length: gridWidth }).map((_, x) => (
                  <div
                    key={'empty-' + y + '-' + x}
                    className={`${cellSize} border bg-gray-500`}
                  />
                ))}
              </div>
            )
          )}
        </>
      ) : (
        <>
          {Array.from({ length: gridHeight }).map((_, y) => (
            <div key={'invisible-' + y} className="flex">
              {Array.from({ length: gridWidth }).map((_, x) => (
                <div
                  key={'invisible-cell-' + y + '-' + x}
                  className={`${cellSize} border bg-gray-400 opacity-50`}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GameGrid;
