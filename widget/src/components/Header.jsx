export default function Header({ onClose, title = "Chat with us" }) {
  return (
    <div className="embedsy-chat-header">
      <h3>{title}</h3>
      <button 
        className="embedsy-close-btn"
        onClick={onClose}
        aria-label="Close chat"
        title="Close chat"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}