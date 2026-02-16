import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const sendMessage = async (projectId, message, apiKey) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      projectId,
      message,
      apiKey
    }, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to get response from server');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Failed to send message. Please try again.');
    }
  }
};