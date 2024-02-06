const startGame = () => {
  const serverStartGame = async () => {
    const res = await fetch('http://localhost:3333/game/new', {
      method: 'POST',
    });
    const data = await res.json();
    console.log(data);
  }
  serverStartGame();
}

export default startGame;