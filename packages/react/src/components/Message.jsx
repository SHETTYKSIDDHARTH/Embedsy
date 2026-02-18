import React from 'react';

const formatTime = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffInMinutes = Math.floor((now - messageDate) / 60000);
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return messageDate.toLocaleDateString();
};

export default function Message({ message, themeColor = '#00FF87' }) {
  const { role, content, timestamp, sources, confidence } = message;
  const isUser = role === 'user';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '85%',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      alignItems: isUser ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        padding: '10px 14px',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        fontSize: '13px',
        lineHeight: '1.6',
        wordBreak: 'break-word',
        background: isUser ? themeColor : '#1e1e1e',
        color: isUser ? '#000' : '#e8e8e8',
        border: isUser ? 'none' : '1px solid #2a2a2a',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }}>
        {content}
      </div>

      {sources && sources.length > 0 && (
        <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', padding: '0 4px' }}>
          Based on {sources.length} source{sources.length > 1 ? 's' : ''}
        </div>
      )}

      <div style={{ fontSize: '10px', color: '#444', marginTop: '3px', padding: '0 4px' }}>
        {formatTime(timestamp)}
      </div>
    </div>
  );
}
