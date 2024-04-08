import { userGameGrid } from '../dto/Grid';
import GameGrid from './GameGrid';

const OthersGrid = ({
  usersGamesGrids,
}: {
  usersGamesGrids: userGameGrid[];
}) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center">Others Grid</h2>
      <div className="flex gap-x-24 justify-center items-center w-full">
        {usersGamesGrids.map((userGameGrid: userGameGrid) => (
          <div key={userGameGrid.username}>
            <h3>{userGameGrid.username}</h3>
            <GameGrid userGameGrid={userGameGrid} small={true} />
          </div>
        ))}
      </div>
    </>
  );
};

export default OthersGrid;
