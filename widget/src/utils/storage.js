const STORAGE_KEY = 'embedsy_messages';

export const saveMessages = (projectId, messages) => {
  try {
    const key = `${STORAGE_KEY}_${projectId}`;
    const data = {
      messages,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save messages:', error);
  }
};

export const loadMessages = (projectId) => {
  try {
    const key = `${STORAGE_KEY}_${projectId}`;
    const data = localStorage.getItem(key);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    const age = Date.now() - new Date(parsed.timestamp).getTime();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    
    if (age > ONE_DAY) {
      localStorage.removeItem(key);
      return [];
    }
    
    return parsed.messages || [];
  } catch (error) {
    console.warn('Failed to load messages:', error);
    return [];
  }
};

export const clearMessages = (projectId) => {
  try {
    const key = `${STORAGE_KEY}_${projectId}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear messages:', error);
  }
};