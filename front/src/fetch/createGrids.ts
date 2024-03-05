import axiosInstance from "../axios/axios";

type PieceType = 'line' | 'square' | 'l' | 'reverse_l' | 't' | 'z' | 'reverse_z'
interface PieceService {
  id: number
  x: number
  y: number
  type: PieceType
  status: 'falling' | 'landed' | 'undestroyable'
  shape: number[][]
  GRID_WIDTH: number
  GRID_HEIGHT: number
  grid?: Grid
}
interface Grid {
  id: string;
  piecesList: PieceService[]
  currentPiece: PieceService | undefined
  userId: number
  width: number
  height: number
  gameStatus: 'waiting' | 'pending' | 'ended'
  grid: number[][]
}
const createGrids = async (gameId: string | undefined) => {
  try {
    if (!gameId) {
      throw new Error('Game ID is undefined');
    }
    const { status, data } = await axiosInstance.post('grid/create', {
       gameId
    });
    data.forEach((grid: Grid) => (
      console.log(`grid ${grid.id}'s have been created`)
    ));
    if (status !== 200) {
      throw new Error('Failed to create grids');
    }
    return data;
  } catch (error) {
    return null;
  }
};

export default createGrids;
