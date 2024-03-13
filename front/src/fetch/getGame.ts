import axiosInstance from "../axios/axios";

const getGame = async (id: string) => {
  try {
    const { status, data } = await axiosInstance.get(`game/${id}`);
    if (status !== 200) {
      throw new Error("Failed to get a game");
    }
    return data.id;
  }
  catch (error) {
    return null;
  }
};

export default getGame;

