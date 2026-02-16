import { useState } from 'react';
import { sendMessage } from '../services/api.js';

export const useChat = (projectId, apiKey, onMessageReceived) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async (message) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(projectId, message, apiKey);
      
      if (onMessageReceived) {
        onMessageReceived(response);
      }
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { send, isLoading, error, clearError };
};