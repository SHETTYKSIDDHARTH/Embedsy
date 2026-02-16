
/** @jsxImporrtSource react */
import { useState, useRef, useEffect } from 'react';
import SendButton from './SendButton';

export default function InputBox({ onSend, disabled }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="embedsy-input-container">
      <input
        ref={inputRef}
        type="text"
        className="embedsy-input"
        placeholder="Type your question here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        maxLength={2000}
      />
      <SendButton onClick={handleSubmit} disabled={disabled || !input.trim()} />
    </div>
  );
}