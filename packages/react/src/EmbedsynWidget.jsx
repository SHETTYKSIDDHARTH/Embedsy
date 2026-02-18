import React, { useState } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatWindow from './components/ChatWindow';
import { useMessages } from './hooks/useMessages';
import { useChat } from './hooks/useChat';

const DEFAULT_API_URL = 'https://embedsy-backend.onrender.com/api';

/**
 * EmbedsynWidget — drop-in AI chat widget for React apps
 *
 * @param {string}  projectId   - Your Embedsy project ID (required)
 * @param {string}  apiKey      - Your Embedsy API key (required)
 * @param {string}  title       - Widget title shown in header
 * @param {string}  position    - 'bottom-right' | 'bottom-left' (default: 'bottom-right')
 * @param {string}  themeColor  - Hex color for the widget accent (default: '#00FF87')
 * @param {string}  apiUrl      - Override the backend URL (optional, for self-hosting)
 */
export default function EmbedsynWidget({
  projectId,
  apiKey,
  title = 'Chat with us',
  position = 'bottom-right',
  themeColor = '#00FF87',
  apiUrl = DEFAULT_API_URL,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { messages, addMessage, clearAllMessages } = useMessages(projectId);

  const handleMessageReceived = (response) => {
    addMessage({
      role: 'bot',
      content: response.answer,
      sources: response.sources,
      confidence: response.confidence,
    });
  };

  const { send, isLoading, error, clearError } = useChat(
    projectId, apiKey, selectedLanguage, handleMessageReceived, apiUrl
  );

  const handleSend = async (message) => {
    addMessage({ role: 'user', content: message });
    clearError();
    try {
      await send(message);
    } catch (err) {
      console.error('Embedsy: Failed to send message:', err);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find((msg) => msg.role === 'user');
    if (lastUserMessage) {
      clearError();
      send(lastUserMessage.content);
    }
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    clearAllMessages();
  };

  const positionStyle = position === 'bottom-left'
    ? { bottom: '24px', left: '24px' }
    : { bottom: '24px', right: '24px' };

  return (
    <div style={{
      position: 'fixed',
      zIndex: 999999,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...positionStyle,
    }}>
      {isOpen ? (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={handleSend}
          onClose={() => setIsOpen(false)}
          onRetry={handleRetry}
          onClear={clearAllMessages}
          title={title}
          themeColor={themeColor}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      ) : (
        <ChatBubble onClick={() => setIsOpen(true)} themeColor={themeColor} />
      )}
    </div>
  );
}
