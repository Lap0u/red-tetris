const getUser = (id: string) => {
  const findUser = async () => {
    const res = await fetch(`http://localhost:3333/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  };
  return findUser();
};

export default getUser;
