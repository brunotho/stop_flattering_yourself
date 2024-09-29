import React, { useEffect, useState } from 'react';
import SnippetCard from './SnippetCard';
import ExpandedSnippet from './ExpandedSnippet';

function SnippetsGame() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null);

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
