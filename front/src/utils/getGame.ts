const getGame = (id: string) => {
  const findGame = async () => {
    const res = await fetch(`http://localhost:3333/game/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.id;
  };
  return findGame();
};

export default getGame;
