export const validateFile = (file) => {
  if (!file) {
    throw new Error('No file provided');
  }
  
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size exceeds 10MB');
  }
  
  const allowedTypes = ['application/pdf', 'text/plain', 'text/markdown'];
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only PDF, TXT, and MD files are allowed');
  }
  
  return true;
};

export const validateProjectId = (projectId) => {
  if (!projectId || typeof projectId !== 'string') {
    throw new Error('Invalid project ID');
  }
  return true;
};

export const validateMessage = (message) => {
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw new Error('Invalid message');
  }
  if (message.length > 2000) {
    throw new Error('Message too long (max 2000 characters)');
  }
  return true;
};

export const validateApiKey = (apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('Invalid API key');
  }
  return true;
};