import React from 'react';

function ExpandedSnippet({ snippet }) {
  const handleSuccess = () => {
    console.log('Success submitted');
  };

  const handleFailure = () => {
    console.log('Failure submitted');
  };

  return (
    <div
      className="card mb-4"
      style={{ height: '65vh', width: "80%", overflow: 'hidden' }}
    >
      <div className="row no-gutters h-100">
        <div className="col d-flex flex-column h-100">
          <div className="card-body flex-grow-1 overflow-auto">
            <p className="card-text" style={{ fontSize: '1.5rem' }}>
              {snippet.snippet}
            </p>
          </div>
          <div className="text-left p-2" style={{ flexShrink: 0 }}>
            <button className="btn btn-success mr-2" onClick={handleSuccess}>
              :)
            </button>
            <button className="btn btn-danger" onClick={handleFailure}>
              :(
            </button>
          </div>
        </div>

{/* right side */}
        <div
          className="col-auto d-flex flex-column h-100"
          style={{ overflow: 'hidden' }}
        >
          <div style={{ flexShrink: 0 }}>
            <img
              src="https://i.scdn.co/image/ab67616d0000b273a6f439c8957170652f9410e2"
              alt={`${snippet.song} Album Cover`}
              style={{
                maxHeight: '50vh',
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
          <div className="flex-grow-1"></div>
          <div className="text-right p-2" style={{ flexShrink: 0 }}>
            <p className="mb-1">
              <strong>{snippet.song}</strong>
            </p>
            <p className="mb-1">{snippet.artist}</p>
            <p className="mb-1">Points: {snippet.difficulty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedSnippet;
