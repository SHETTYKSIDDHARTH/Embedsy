import React from 'react';

export default function ErrorMessage({ error, onRetry }) {
  if (!error) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      padding: '10px 14px',
      background: 'rgba(255, 71, 87, 0.08)',
      border: '1px solid rgba(255, 71, 87, 0.25)',
      borderRadius: '10px',
      fontSize: '12px',
      color: '#ff6b7a',
      alignSelf: 'stretch',
    }}>
      <div>
        <div style={{ fontWeight: '700', marginBottom: '2px' }}>⚠️ Something went wrong</div>
        <div style={{ opacity: 0.8 }}>{error}</div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: 'rgba(255, 71, 87, 0.15)',
            border: '1px solid rgba(255, 71, 87, 0.3)',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#ff6b7a',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            outline: 'none',
            flexShrink: 0,
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
