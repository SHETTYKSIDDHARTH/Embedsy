function ChatBubble({ onClick, unreadCount = 0 }) {
  return (
    <button 
      className="embedsy-chat-bubble"
      onClick={onClick}
      aria-label="Open chat"
      title="Open chat"
    >
      <svg 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          background: '#FF4757',
          color: '#FFFFFF',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '700',
          border: '2px solid #0A0A0A'
        }}>
          {unreadCount}
        </span>
      )}
    </button>
  );
}

export default ChatBubble;