const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Now sends targetLanguage to backend
export const sendMessage = async (projectId, message, apiKey, targetLanguage = 'en') => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        message,
        apiKey,
        targetLanguage,   // send chosen language
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to get response from server');
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('No response from server. Please check your connection.');
    }
    throw error;
  }
};