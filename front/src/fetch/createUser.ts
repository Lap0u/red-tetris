import axiosInstance from "../axios/axios";

const createUser = async (username: string, socketId: string | undefined) => {
  try {
    if (!socketId) {
      console.error('socketId is undefined');
      return null;
    }
    const { status, data } = await axiosInstance.post('user/create', {
       username: username, socketId: socketId
    });
    if (status === 400) {
      return { message: 'Username is empty' };
    }
    if (status === 409) {
      return { message: 'Username already exists' };
    }
    if (status !== 200) {
      throw new Error('Failed to create user');
    }
    return data;
  } catch (error) {
    return null;
  }
};

export default createUser;
