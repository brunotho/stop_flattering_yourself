import React, { useEffect, useState } from 'react';

function SnippetsGame() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchSnippets();
  }, []);

  if (error) {
    return <div>Error loading snippets: {error.message}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lyric Snippets</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={fetchSnippets}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get New Snippets'}
      </button>
      <ul className="list-group">
        {snippets.map(snippet => (
          <li key={snippet.id} className="list-group-item">
            <blockquote className="blockquote">
              <p className="mb-0">{snippet.snippet}</p>
              <footer className="blockquote-footer">
                {snippet.artist} — <cite title="Song">{snippet.song}</cite>
              </footer>
            </blockquote>
            <p>
              <strong>Difficulty:</strong> {snippet.difficulty}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SnippetsGame;
