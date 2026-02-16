import { useState, useEffect } from 'react';
import { saveMessages, loadMessages } from '../utils/storage.js';

export const useMessages = (projectId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (projectId) {
      const loaded = loadMessages(projectId);
      if (loaded.length > 0) {
        setMessages(loaded);
      } else {
        const welcomeMessage = {
          id: `msg_${Date.now()}`,
          role: 'bot',
          content: "👋 Hi there! I'm your AI assistant. Ask me anything about our documentation and I'll help you find the answers!",
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId && messages.length > 0) {
      saveMessages(projectId, messages);
    }
  }, [messages, projectId]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: message.timestamp || new Date().toISOString()
    }]);
  };

  const clearAllMessages = () => {
    const welcomeMessage = {
      id: `msg_${Date.now()}`,
      role: 'bot',
      content: "👋 Hi there! I'm your AI assistant. Ask me anything about our documentation and I'll help you find the answers!",
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  };

  return { messages, addMessage, clearAllMessages };
};