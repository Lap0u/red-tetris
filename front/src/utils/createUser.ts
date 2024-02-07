const createUser = (username: string) => {
  const create = async (username: string) => {
    const res = await fetch('http://localhost:3333/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),
    });
    const data = await res.json();
    return data;
  };
  return create(username);
};

export default createUser;
