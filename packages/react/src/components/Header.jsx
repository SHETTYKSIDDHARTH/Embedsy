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

export default function Header({ onClose, title = 'Chat with us', themeColor = '#00FF87', selectedLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  // Determine if theme color is light or dark for text contrast
  const isLight = themeColor === '#ffffff' || themeColor === '#fff' || themeColor.toLowerCase() === '#ffffffff';
  const textColor = '#000000';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      background: themeColor,
      flexShrink: '0',
      position: 'relative',
    }}>
      {/* Status dot + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#000', opacity: 0.4,
          boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
        }} />
        <span style={{ fontSize: '14px', fontWeight: '700', color: textColor, margin: 0 }}>
          {title}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Language selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: '3px',
              background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '6px', padding: '4px 8px',
              fontSize: '11px', fontWeight: '700', color: textColor,
              cursor: 'pointer', letterSpacing: '0.5px',
              transition: 'background 0.2s', outline: 'none',
            }}
          >
            {current.label}
            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: '0',
              background: '#111', border: '1px solid #2a2a2a',
              borderRadius: '12px', overflow: 'hidden',
              zIndex: '10000001', minWidth: '150px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
            }}>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { onLanguageChange(lang.code); setIsOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    width: '100%', padding: '9px 14px',
                    background: lang.code === selectedLanguage ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    transition: 'background 0.15s', textAlign: 'left', outline: 'none',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: '700', color: themeColor, minWidth: '26px', letterSpacing: '0.5px' }}>
                    {lang.label}
                  </span>
                  <span style={{ fontSize: '12px', color: '#ccc' }}>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close chat"
          style={{
            background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: '6px',
            padding: '5px', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: textColor, transition: 'background 0.2s', outline: 'none',
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
