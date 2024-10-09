import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import SnippetsGame from './SnippetsGame';
import GameOver from './GameOver';

function MainComponent({ gameSessionId = null }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameData, setGameData] = useState(null);

  const handlePlay = () => {
    setGameStarted(true);
    setGameData(null);
  };

  const handleSnippetCompletion = (data) => {
    setGameStarted(false);
    setGameData(data);
  };

  useEffect(() => {
    if (gameSessionId) {
      setGameStarted(true);
    }
  }, [gameSessionId]);

  return (
    <div>
      {!gameStarted && !gameData && (
        <>
          <HeroSection onPlay={handlePlay} />
          <div className="d-flex justify-content-center">
            <div className="container mt-5 d-flex flex-column align-items-center">
              <div className="mt-4">
                <ul className="list-unstyled">
                  <li>Press Play</li>
                  <li>Select a snippet</li>
                  <li>Slip it into regular conversation without anyone noticing</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {gameStarted && (
        <SnippetsGame game_session_id={gameSessionId} onSnippetComplete={handleSnippetCompletion} />
      )}

      {gameData && (
        <GameOver gameData={gameData} onPlayAgain={handlePlay} />
      )}
    </div>
  );
}

export default MainComponent;
