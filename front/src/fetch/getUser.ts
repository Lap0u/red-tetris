import axiosInstance from "../axios/axios";

const getUser = async (id: string) => {
  try {
    const { status, data } = await axiosInstance.get(`user/${id}`);
    if (status !== 200) {
      throw new Error('Failed to get a user');
    }
    return data;
  } catch (error) {
    return null;
  }
};

export default getUser;
