import React from 'react';

export default function GameProgressCard({
  totalScore = 0,
  roundsPlayed = 0,
  successfulRoundsCount = 0,
  maxRounds = 5,
  roundHistory = [],
}) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex justify-between mb-4">
        <span className="font-bold">Score: {totalScore}</span>
        <span>Rounds: {roundsPlayed}/{maxRounds}</span>
      </div>
      <div className="mb-2">
        Successful rounds: {successfulRoundsCount}
      </div>
      <div>
        {roundHistory.map((round, index) => (
          <div key={index} className="mb-2">
            <div>{round.lyric_snippet && round.lyric_snippet.text}</div>
            <div>Points: {round.score || 0}</div>
            <div>Success: {round.success ? 'Yes' : 'No'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
