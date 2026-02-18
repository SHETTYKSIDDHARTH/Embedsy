import React, { useState, useEffect } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatWindow from './components/ChatWindow';
import { useMessages } from './hooks/useMessages';
import { useChat } from './hooks/useChat';
import './styles/widget.css';

export default function App({ projectId, apiKey, title, position = 'bottom-right', themeColor = '#00FF87' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { messages, addMessage, clearAllMessages } = useMessages(projectId);

  // Apply themeColor as CSS variable
  useEffect(() => {
    const containerId = `embedsy-root-${projectId}`;
    const container =
      document.getElementById(containerId) ||
      document.getElementById('embedsy-widget-root');
    if (container) {
      container.style.setProperty('--embedsy-theme', themeColor);
    }
  }, [themeColor, projectId]);

  const handleMessageReceived = (response) => {
    addMessage({
      role: 'bot',
      content: response.answer,
      sources: response.sources,
      confidence: response.confidence,
    });
  };

  const { send, isLoading, error, clearError } = useChat(
    projectId,
    apiKey,
    selectedLanguage,        // pass language to useChat
    handleMessageReceived
  );

  const handleSend = async (message) => {
    addMessage({ role: 'user', content: message });
    clearError();
    try {
      await send(message);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
    if (lastUserMessage) {
      clearError();
      send(lastUserMessage.content);
    }
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    // Clear messages when language changes so context is fresh
    clearAllMessages();
  };

  return (
    <div className={`embedsy-widget-container embedsy-position-${position}`}>
      {isOpen ? (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={handleSend}
          onClose={() => setIsOpen(false)}
          onRetry={handleRetry}
          onClear={clearAllMessages}
          title={title || 'Chat with us'}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      ) : (
        <ChatBubble onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
}