const getGame = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3333/game/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get a game");
    }
    const data = await res.json();
    return data.id;
  }
  catch (error) {
    return null;
  }
};

export default getGame;

