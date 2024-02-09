import MyButton from './MyButton';

const CurrentGamesList = () => {
  //mock data
  const games = [
    { id: 1, name: 'Game 1' },
    { id: 2, name: 'Game 2' },
    { id: 3, name: 'Game 3' },
  ];
  return (
    <div className="flex flex-col gap-y-8">
      {games.map((game) => (
        <MyButton key={game.id} text={`Join ${game.name}`} onClick={() => {}} />
      ))}
    </div>
  );
};

export default CurrentGamesList;
