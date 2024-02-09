const createUser = (username: string, socketId: string | undefined) => {
  if (!socketId) {
    console.error('socketId is undefined');
    return;
  }
  const create = async (username: string, socketId: string) => {
    const res = await fetch('http://localhost:3333/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, socketId: socketId }),
    });
    const data = await res.json();
    return data;
  };
  return create(username, socketId);
};

export default createUser;
