export type Grid = number[][];
export type userGameGrid = {
  username: string;
  grid: Grid;
  playerDead: boolean;
  invisible?: boolean;
};

export type AvailableGridColors =
  | 'bg-gray-600'
  | 'bg-emerald-400'
  | 'bg-teal-300';
