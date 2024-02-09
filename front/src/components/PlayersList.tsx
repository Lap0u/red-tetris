import { User } from '../dto/User';

const PlayersList = ({ players }: { players: User[] }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-200 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Players List</h2>
      <p className="text-red-500 mb-2">
        Number of players: {players.length} / 4
      </p>
      <div className="flex flex-col gap-2">
        {players.slice(0, 4).map((player) => (
          <div
            key={player.id}
            className="bg-white p-2 rounded-lg shadow-md w-64">
            <p>{player.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;
