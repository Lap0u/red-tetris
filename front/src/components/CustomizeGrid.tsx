import { useDispatch } from 'react-redux';
import { AvailableGridColors } from '../dto/Grid';
import GameGrid from './GameGrid';
import { setColor } from '../store/gridColorSlice';

type CustomizeGridProps = {
  gridColor: AvailableGridColors;
  setGridColor: (color: AvailableGridColors) => void;
};

const CustomizeGrid = ({ gridColor, setGridColor }: CustomizeGridProps) => {
  const dispatch = useDispatch();

  const grid = Array.from({ length: 20 }, () =>
    Array.from({ length: 10 }, () => 0)
  );
  return (
    <div className="flex flex-col justify-center items-center gap-y-12">
      <div
        className={gridColor === 'bg-gray-600' ? 'border-4 border-sky-400' : ''}
        onClick={() => {
          dispatch(setColor('bg-gray-600'));
          setGridColor('bg-gray-600');
        }}>
        <div className="p-2">
          <GameGrid small={true} grid={grid} gridColor={'bg-gray-600'} />
        </div>
      </div>
      <div
        className={
          gridColor === 'bg-emerald-400' ? 'border-4 border-sky-400' : ''
        }
        onClick={() => {
          dispatch(setColor('bg-emerald-400'));

          setGridColor('bg-emerald-400');
        }}>
        <div className="p-2">
          <GameGrid small={true} grid={grid} gridColor={'bg-emerald-400'} />
        </div>
      </div>
      <div
        className={gridColor === 'bg-teal-300' ? 'border-4 border-sky-400' : ''}
        onClick={() => {
          dispatch(setColor('bg-teal-300'));

          setGridColor('bg-teal-300');
        }}>
        <div className="p-2">
          <GameGrid small={true} grid={grid} gridColor={'bg-teal-300'} />
        </div>
      </div>
    </div>
  );
};

export default CustomizeGrid;
