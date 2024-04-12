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
  return (
    <div className="flex justify-center items-center gap-x-12">
      <div
        className={
          gridColor === 'bg-gray-600'
            ? 'text-white p-4  bg-gray-600 hover:cursor-pointer rounded-xl'
            : ' p-4 hover:cursor-pointer'
        }
        onClick={() => {
          dispatch(setColor('bg-gray-600'));
          setGridColor('bg-gray-600');
        }}>
        Default
      </div>
      <div
        className={
          gridColor === 'bg-emerald-400'
            ? 'p-4 bg-emerald-400 hover:cursor-pointer rounded-xl'
            : ' p-4 hover:cursor-pointer'
        }
        onClick={() => {
          dispatch(setColor('bg-emerald-400'));

          setGridColor('bg-emerald-400');
        }}>
        Emerald
      </div>
      <div
        className={
          gridColor === 'bg-teal-300'
            ? 'p-4 bg-teal-300 hover:cursor-pointer rounded-xl'
            : ' p-4 hover:cursor-pointer'
        }
        onClick={() => {
          dispatch(setColor('bg-teal-300'));

          setGridColor('bg-teal-300');
        }}>
        Teal
      </div>
    </div>
  );
};

export default CustomizeGrid;
