import React, { useState } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'hi', label: 'HI', name: 'Hindi' },
  { code: 'es', label: 'ES', name: 'Spanish' },
  { code: 'fr', label: 'FR', name: 'French' },
  { code: 'de', label: 'DE', name: 'German' },
  { code: 'pt', label: 'PT', name: 'Portuguese' },
  { code: 'it', label: 'IT', name: 'Italian' },
  { code: 'ar', label: 'AR', name: 'Arabic' },
  { code: 'zh', label: 'ZH', name: 'Chinese' },
  { code: 'ja', label: 'JA', name: 'Japanese' },
  { code: 'ko', label: 'KO', name: 'Korean' },
];

export default function Header({ onClose, title = 'Chat with us', selectedLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <div className="embedsy-chat-header">
      <h3>{title}</h3>

      <div className="embedsy-header-actions">
        {/* Language Selector */}
        <div className="embedsy-lang-selector">
          <button
            className="embedsy-lang-btn"
            onClick={() => setIsOpen(!isOpen)}
            title="Select language"
          >
            {current.label}
            <svg
              className={`embedsy-lang-chevron ${isOpen ? 'open' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="embedsy-lang-dropdown">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`embedsy-lang-option ${lang.code === selectedLanguage ? 'active' : ''}`}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                >
                  <span className="embedsy-lang-option-code">{lang.label}</span>
                  <span className="embedsy-lang-option-name">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          className="embedsy-close-btn"
          onClick={onClose}
          aria-label="Close chat"
          title="Close chat"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}