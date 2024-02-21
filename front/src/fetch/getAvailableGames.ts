const getAvailableGames = async () => {
  try {
    const res = await fetch(`http://localhost:3333/game/available`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get available games");
    }
    const data = await res.json();
    return data;
  }
  catch (error) {
    return null;
  }

};

export default getAvailableGames;
