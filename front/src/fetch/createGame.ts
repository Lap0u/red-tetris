const createGame = async (id: number) => {
  try {
    const res = await fetch('http://localhost:3333/game/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id }),
    });
    if (!res.ok) {
      throw new Error("Failed to create game");
    }

    const data = await res.json();
    return data.id;
  }
  catch (error) {
    return null;
  }
};

export default createGame;
