export const sendMessage = async (projectId, message, apiKey, targetLanguage = 'en', apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        message,
        apiKey,
        targetLanguage,
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
