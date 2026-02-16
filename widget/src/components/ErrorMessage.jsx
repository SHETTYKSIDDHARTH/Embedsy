import React from 'react';

export default function ErrorMessage({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="embedsy-error-message">
      <div>
        <strong>⚠️ Oops!</strong>
        <div>{error}</div>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="embedsy-retry-btn"
        >
          Retry
        </button>
      )}
    </div>
  );
}