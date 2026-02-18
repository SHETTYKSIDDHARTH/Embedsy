import React, { useState, useRef, useEffect } from 'react';
import SendButton from './SendButton';

export default function InputBox({ onSend, disabled, themeColor = '#00FF87' }) {
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) inputRef.current.focus();
  }, [disabled]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px',
      borderTop: '1px solid #1e1e1e',
      background: '#0f0f0f',
      flexShrink: 0,
    }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        maxLength={2000}
        style={{
          flex: 1,
          background: '#1a1a1a',
          border: `1px solid ${focused ? themeColor : '#2a2a2a'}`,
          borderRadius: '10px',
          padding: '10px 14px',
          fontSize: '13px',
          color: '#e8e8e8',
          outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          boxSizing: 'border-box',
        }}
      />
      <SendButton onClick={handleSubmit} disabled={disabled || !input.trim()} themeColor={themeColor} />
    </div>
  );
}
