import { useEffect, useState } from 'react';
import getScore from '../fetch/getScore';
import { Score } from '../dto/Score';
import MyButton from '../components/MyButton';
import { useNavigate } from 'react-router-dom';

const Highscore = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<Score[]>([]);
  useEffect(() => {
    const getUserScores = async () => {
      const scores: Score[] = await getScore();
      if (!scores) return;
      scores.sort((a, b) => b.score - a.score);
      setScores(scores);
    };
    getUserScores();
  }, []);
  return (
    <div className=" w-full h-screen flex flex-col gap-y-12 justify-center items-center">
      <h2>Highscores</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.username}: {score.score}
          </li>
        ))}
      </ul>
      <MyButton
        text="Return to Lobby"
        onClick={() => {
          navigate('/lobby');
        }}
      />
    </div>
  );
};

export default Highscore;
