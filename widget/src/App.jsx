/** @jsxImporrtSource react */
import { useState } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatWindow from './components/ChatWindow';
import { useMessages } from './hooks/useMessages';
import { useChat } from './hooks/useChat';
import './styles/widget.css';

export default function App({ projectId, apiKey, title, position = 'bottom-right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, addMessage, clearAllMessages } = useMessages(projectId);
  
  const handleMessageReceived = (response) => {
    addMessage({
      role: 'bot',
      content: response.answer,
      sources: response.sources,
      confidence: response.confidence,
      language: response.language
    });
  };

  const { send, isLoading, error, clearError } = useChat(
    projectId,
    apiKey,
    handleMessageReceived
  );

  const handleSend = async (message) => {
    addMessage({
      role: 'user',
      content: message
    });

    clearError();

    try {
      await send(message);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find(msg => msg.role === 'user');
    
    if (lastUserMessage) {
      clearError();
      send(lastUserMessage.content);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`embedsy-widget-container embedsy-position-${position}`}>
      {isOpen ? (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={handleSend}
          onClose={toggleChat}
          onRetry={handleRetry}
          title={title || "Chat with us"}
        />
      ) : (
        <ChatBubble onClick={toggleChat} />
      )}
    </div>
  );
}