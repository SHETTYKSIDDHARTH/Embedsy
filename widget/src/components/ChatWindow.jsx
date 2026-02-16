// import React from 'react';
/** @jsxImporrtSource react */
import Header from './Header';
import MessageList from './MessageList';
import InputBox from './InputBox';

export default function ChatWindow({ 
  messages, 
  isLoading, 
  error, 
  onSend, 
  onClose,
  onRetry,
  title 
}) {
  return (
    <div className="embedsy-chat-window">
      <Header onClose={onClose} title={title} />
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
        error={error}
        onRetry={onRetry}
      />
      <InputBox onSend={onSend} disabled={isLoading} />
      <div className="embedsy-powered-by">
        Powered by <a href="https://embedsy.dev" target="_blank" rel="noopener noreferrer">Embedsy</a>
      </div>
    </div>
  );
}