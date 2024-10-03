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
    fetch('/fetch_snippets')
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

    fetch('/game_sessions/${game_sessions_id}.json')
      .then(response => response.json())
      .then(data => {
        setScore(data.successful_rounds_count);
      })
      .catch(error => {
        console.error("Error fetching score:", error)
      });
  };

  useEffect(() => {
    fetchSnippets();
    fetchScore();
  }, []);

  const handleSubmit = (snippet_id, success) => {
    if (!game_session_id) {
      alert("quick play");
      return;
    }

    fetch("/game_sessions/${game_session_id}/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    return <div>Error loading snippets: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading snippets...</div>;
  }

  if (selectedSnippet) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
        <ExpandedSnippet snippet={selectedSnippet} />
      </div>
    );
  }

  return (
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
  );
}

export default SnippetsGame;
