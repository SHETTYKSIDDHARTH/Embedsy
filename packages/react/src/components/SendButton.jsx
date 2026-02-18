import React, { useState } from 'react';

export default function SendButton({ onClick, disabled, themeColor = '#00FF87' }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Send message"
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: themeColor,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        opacity: disabled ? 0.3 : hovered ? 0.9 : 1,
        transform: hovered && !disabled ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.15s ease',
        flexShrink: 0,
        outline: 'none',
        padding: '0',
      }}
    >
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    </button>
  );
}
