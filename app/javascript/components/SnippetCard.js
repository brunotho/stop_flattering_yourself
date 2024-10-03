import React from 'react';

function SnippetCard({ snippet, onClick }) {
  if (!snippet) {
    console.error('No snippet data provided to SnippetCard');
    return <div>No snippet data available</div>;
  }
  
  return (
    <div
      className="card mb-4"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="row no-gutters">
        <div className="col">
          <div className="card-body d-flex flex-column h-100">
            <p className="card-text flex-grow-1" style={{ fontSize: '1.2rem' }}>
              {snippet.snippet}
            </p>
            <div className="d-flex justify-content-between">
              <small className="text-muted align-self-end">
                Points: {snippet.difficulty}
              </small>
              <small className="text-muted align-self-end text-right">
                <div>{snippet.song}</div>
                <div>{snippet.artist}</div>
              </small>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <img
            src="https://i.scdn.co/image/ab67616d0000b273a6f439c8957170652f9410e2"
            alt={`${snippet.song} Album Cover`}
            style={{ height: '100%', width: '150px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}

export default SnippetCard;
