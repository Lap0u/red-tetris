import axiosInstance from '../axios/axios';

const getScore = async () => {
  try {
    const { status, data } = await axiosInstance.get('score');
    if (status !== 200) {
      throw new Error('Failed to get scores');
    }
    return data;
  } catch (error) {
    return null;
  }
};

export default getScore;
