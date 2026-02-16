/** @jsxImporrtSource react */
import { useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import ErrorMessage from './ErrorMessage';

export default function MessageList({ messages, isLoading, error, onRetry }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="embedsy-messages-container" ref={containerRef}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isLoading && <TypingIndicator />}
      {error && <ErrorMessage error={error} onRetry={onRetry} />}
      <div ref={messagesEndRef} />
    </div>
  );
}