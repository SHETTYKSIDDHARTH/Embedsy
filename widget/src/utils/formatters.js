export const formatTime = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffInMinutes = Math.floor((now - messageDate) / 60000);
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  return messageDate.toLocaleDateString();
};

export const formatConfidence = (confidence) => {
  if (confidence >= 80) return { text: 'High', color: '#00FF87' };
  if (confidence >= 60) return { text: 'Medium', color: '#FFA502' };
  return { text: 'Low', color: '#FF4757' };
};