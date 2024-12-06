import { FC } from 'react';
import Image from "next/image";

interface Game {
  appid: string;
  img_icon_url: string;
  name: string;
}

interface Achievement {
  name: string;
  description: string;
}

interface Task {
  _id: string;
  game: Game;
  achievement: Achievement;
  time: number;
  timeAchieved: number;
}

interface TaskProps {
  task: Task;
  deleteTask: (id: string) => void;
}

const AchievementTile: FC<TaskProps> = ({ task, deleteTask }) => {
  const calculateDaysElapsed = (timestamp: number): number => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((Date.now() - timestamp * 1000) / millisecondsPerDay);
  };

  const formatCompletionDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return `Completed on ${date.toLocaleDateString("en-US")} (${calculateDaysElapsed(timestamp)} days ago)`;
  };

  return (
    <div className="bg-slate-800/80 text-white rounded-lg mb-4 p-4 w-3/4 max-w-2xl mx-auto drop-shadow-lg">
      <GameSection game={task.game} timeElapsed={calculateDaysElapsed(task.time)} />
      <AchievementSection achievement={task.achievement} timeAchieved={task.timeAchieved} formatCompletionDate={formatCompletionDate} />
      <ButtonSection onDelete={() => deleteTask(task._id)} />
    </div>
  );
};

interface GameSectionProps {
  game: Game;
  timeElapsed: number;
}

const GameSection: FC<GameSectionProps> = ({ game, timeElapsed }) => (
  <div className="bg-blue-800 text-white rounded-lg p-4 mb-2">
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Image
          src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
          alt={game.name}
          width={40}
          height={40}
          className="mr-2 rounded-md"
        />
        <h1 className="font-bold">{game.name}</h1>
      </div>
      <p className="text-sm text-gray-300">Time Elapsed: {timeElapsed} days</p>
    </div>
  </div>
);

interface AchievementSectionProps {
  achievement: Achievement;
  timeAchieved: number;
  formatCompletionDate: (timestamp: number) => string;
}

const AchievementSection: FC<AchievementSectionProps> = ({ achievement, timeAchieved, formatCompletionDate }) => (
  <div className="bg-gray-700 text-white rounded-lg p-4 mb-4">
    <p className="font-semibold text-lg">{achievement.name}</p>
    <p className="text-gray-300">{achievement.description}</p>
    <p className="text-gray-300">
      {timeAchieved ? formatCompletionDate(timeAchieved) : "Incomplete"}
    </p>
  </div>
);

interface ButtonSectionProps {
  onDelete: () => void;
}

const ButtonSection: FC<ButtonSectionProps> = ({ onDelete }) => (
  <div className="flex justify-between space-x-4">
    <button
      className="bg-red-500 hover:bg-red-600 duration-100 text-white rounded px-4 py-2 flex items-center h-12"
      onClick={onDelete}
    >
      Delete
    </button>
  </div>
);

export default AchievementTile;
