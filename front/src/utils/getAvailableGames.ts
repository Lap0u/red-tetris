const getAvailableGames = () => {
  const findGame = async () => {
    const res = await fetch(`http://localhost:3333/game/available`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  };
  return findGame();
};

export default getAvailableGames;
