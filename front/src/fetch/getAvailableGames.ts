import axiosInstance from "../axios/axios";

const getAvailableGames = async () => {
  try {
    const { status, data } = await axiosInstance.get('game/available');
    if (status !== 200) {
      throw new Error("Failed to get available games");
    }
    return data;
  }
  catch (error) {
    return null;
  }

};

export default getAvailableGames;
