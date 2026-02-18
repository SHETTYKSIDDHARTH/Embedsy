import React, { useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import ErrorMessage from './ErrorMessage';

export default function MessageList({ messages, isLoading, error, onRetry, themeColor }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isLoading]);

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      scrollbarWidth: 'thin',
      scrollbarColor: '#333 transparent',
    }}>
      {messages.map((message) => (
        <Message key={message.id} message={message} themeColor={themeColor} />
      ))}
      {isLoading && <TypingIndicator />}
      {error && <ErrorMessage error={error} onRetry={onRetry} />}
      <div ref={messagesEndRef} />
    </div>
  );
}
