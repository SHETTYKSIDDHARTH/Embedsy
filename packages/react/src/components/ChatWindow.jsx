import React from 'react';
import Header from './Header';
import MessageList from './MessageList';
import InputBox from './InputBox';

export default function ChatWindow({
  messages, isLoading, error, onSend, onClose, onRetry,
  title, themeColor, selectedLanguage, onLanguageChange,
}) {
  return (
    <div style={{
      width: '360px',
      height: '520px',
      background: '#0f0f0f',
      borderRadius: '16px',
      border: '1px solid #222',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <Header
        onClose={onClose}
        title={title}
        themeColor={themeColor}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
      />
      <MessageList
        messages={messages}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
        themeColor={themeColor}
      />
      <InputBox onSend={onSend} disabled={isLoading} themeColor={themeColor} />
      <div style={{
        textAlign: 'center',
        fontSize: '10px',
        color: '#333',
        padding: '6px',
        background: '#0a0a0a',
        flexShrink: 0,
      }}>
        Powered by{' '}
        <a href="https://embedsy.dev" target="_blank" rel="noopener noreferrer"
          style={{ color: themeColor, textDecoration: 'none' }}>
          Embedsy
        </a>
      </div>
    </div>
  );
}
