const createGame = (id: number) => {
  const serverStartGame = async () => {
    const res = await fetch('http://localhost:3333/game/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id }),
    });
    const data = await res.json();
    return data.id;
  };
  return serverStartGame();
};

export default createGame;
