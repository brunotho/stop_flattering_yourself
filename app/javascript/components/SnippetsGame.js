import React, { useEffect, useState } from 'react';
import SnippetCard from './SnippetCard';
import ExpandedSnippet from './ExpandedSnippet';
import GameProgressCard from './GameProgressCard';

function SnippetsGame({ game_session_id = null, onSnippetComplete }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [gameData, setGameData] = useState({
    totalScore: 0,
    roundsPlayed: 0,
    successfulRoundsCount: 0,
    status: true
  });
  const [roundHistory, setRoundHistory] = useState([]);

  const [score, setScore] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const fetchSnippets = () => {
    setLoading(true);
    fetch('/fetch_snippets', {
      method: "GET",
      headers: {
        "Content_Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then(response => response.json())
      .then(data => {
        setSnippets(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching snippets:', error);
        setError(error);
        setLoading(false);
      });
  };

  const fetchGameSessionData = () => {
    if (!game_session_id) return;

    fetch(`/game_sessions/${game_session_id}.json`, {
      headers: {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('game session data:', data);
        setGameData({
          totalScore: data.total_score,
          roundsPlayed: data.rounds_played,
          successfulRoundsCount: data.successful_rounds_count,
          status: data.status
        });
        // setScore(data.total_score);
        // setRoundsPlayed(data.rounds_played);
        // setGameCompleted(!data.status);

        // if (!data.status) {
        //   onSnippetComplete();
        // }
      })
    .catch(error => {
      console.error("Error fetching game session data:", error);
    });
  };

  useEffect(() => {
    console.log("SnippetsGame component mounted");
    if (game_session_id) {
      fetchGameSessionData();
    }
    fetchSnippets();
  }, [game_session_id]);

  const handleSubmit = (snippet_id, success) => {
    if (!game_session_id || snippet_id === null) {
      setSelectedSnippet(null);
      return;
    }

    fetch(`/game_sessions/${game_session_id}/rounds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        "X-CSRF-Token": getCSRFToken(),
      },
      body: JSON.stringify({
        round: {
          lyric_snippet_id: snippet_id,
          success: success,
        },
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Round submission failed #handleSubmit response !ok");
        }
        return response.json();
      })
      .then(data => {
        const newGameData = {
          totalScore: data.totalScore,
          roundsPlayed: data.rounds_played,
          status: data.status
        };
          // setScore(data.total_score);
          // setRoundsPlayed(data.rounds_played);
          // setGameCompleted(!data.status);
        setGameData(newGameData);
        const newRound = {
          lyric_snippet: selectedSnippet,
          score: data.round.score,
          success: data.round.success
        };

        const updatedHistory = [...roundHistory, newRound];
        setRoundHistory(updatedHistory);

        if (!data.status) {
          onSnippetComplete({
            ...newGameData,
            roundHistory: updatedHistory
          });
        } else {
          setSelectedSnippet(null);
          fetchSnippets();
        }
      })
      .catch(error => {
        console.error("error submitting round:", error);
        alert("an error while submitting round");
      });
  };

  const getCSRFToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta && meta.getAttribute('content');
  };

  if (error) {
    console.log("error", error);

    return <div>Error loading snippets: {error.message}</div>;
  }

  if (loading) {
    console.log("loading...");

    return <div>Loading snippets...</div>;
  }

  console.log("snippets loaded", snippets);


  if (selectedSnippet) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
        <ExpandedSnippet
          snippet={selectedSnippet}
          onSubmit={handleSubmit}
          game_session_id={game_session_id}
        />
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex-grow">

        {/* old div */}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '80vh' }}
          >
          <div className="container">
            <div className="row">
              {snippets.map(snippet => (
                <div key={snippet.id} className="col-md-6">
                  <SnippetCard
                    snippet={snippet}
                    onClick={() => setSelectedSnippet(snippet)}
                    />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-64">
          <GameProgressCard
            totalScore={gameData.totalScore}
            roundsPlayed={gameData.roundsPlayed}
            successfulRoundsCount={gameData.successfulRoundsCount}
            roundHistory={roundHistory}
          />
        </div>

      </div>
    </div>
  );
}

export default SnippetsGame;
