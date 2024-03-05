const createUser = async (username: string, socketId: string | undefined) => {
  try {
    if (!socketId) {
      console.error('socketId is undefined');
      return null;
    }
    const res = await fetch('http://localhost:3333/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, socketId: socketId }),
    });
    if (res.status === 409) {
      return { message: 'Username already exists' };
    }
    if (!res.ok) {
      throw new Error('Failed to create user');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};

export default createUser;
