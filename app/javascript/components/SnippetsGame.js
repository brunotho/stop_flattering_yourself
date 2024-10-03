import React, { useEffect, useState } from 'react';
import SnippetCard from './SnippetCard';
import ExpandedSnippet from './ExpandedSnippet';

function SnippetsGame({ game_session_id = null }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [score, setScore] = useState(0);

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

  const fetchScore = () => {
    if (!game_session_id) return;

    fetch(`/game_sessions/${game_session_id}.json`)
      .then(response => response.json())
      .then(data => {
        setScore(data.successful_rounds_count);
      })
      .catch(error => {
        console.error("Error fetching score:", error)
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
      .then(response => response.json ())
      .then(data => {
        setGameSessionData(data);
      })
      .catch(error => {
        console.error("Error fetching game session data:", error);
      });
  };

  useEffect(() => {
    console.log("snipgame comp mounted");
    fetchSnippets();
    fetchScore();
  }, []);

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
        if(response.ok) {
          setSelectedSnippet(null);
          fetchSnippets();
          fetchScore();
        } else {
          alert("Failed to submit round");
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
    <div>

    <div className="session-info">
  {game_session_id ? (
    <p>Game Session ID: {game_session_id} | Score: {score}</p>
  ) : (
    <p>Quick Play Mode</p>
  )}
</div>

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

    </div>
  );
}

export default SnippetsGame;
