export default function SendButton({ onClick, disabled }) {
  return (
    <button 
      className="embedsy-send-btn"
      onClick={onClick}
      disabled={disabled}
      aria-label="Send message"
      title="Send message"
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
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    </button>
  );
}