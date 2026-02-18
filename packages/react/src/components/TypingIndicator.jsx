import React from 'react';

export default function TypingIndicator() {
  return (
    <div style={{
      alignSelf: 'flex-start',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '12px 16px',
      background: '#1e1e1e',
      border: '1px solid #2a2a2a',
      borderRadius: '14px 14px 14px 4px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
    }}>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          style={{
            width: '6px',
            height: '6px',
            background: '#555',
            borderRadius: '50%',
            animation: `embedsy-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes embedsy-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
