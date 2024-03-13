import axiosInstance from "../axios/axios";

const createGame = async (id: number) => {
  try {
    const { status, data } = await axiosInstance.post('game/new', { userId: id });
    if (status !== 200) {
      throw new Error("Failed to create game");
    }
    return data.id;
  }
  catch (error) {
    return null;
  }
};

export default createGame;
