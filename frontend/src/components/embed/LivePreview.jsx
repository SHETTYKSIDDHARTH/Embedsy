import React, { useState, useRef, useEffect } from 'react';
import { sendChat } from '../../services/api';

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

export default function LivePreview({ project }) {
  const themeColor = project.theme_color || '#00FF87';

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: `👋 Hi! I'm the assistant for "${project.widget_title || project.name}". Ask me anything!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const langDropdownRef = useRef(null);

  const currentLang = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setLangDropdownOpen(false);
    // Clear chat so context is fresh for new language
    setMessages([
      {
        role: 'bot',
        content: `👋 Hi! I'm the assistant for "${project.widget_title || project.name}". Ask me anything!`,
      },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    try {
      const res = await sendChat(project.id, userMessage, project.api_key, selectedLanguage);
      setMessages(prev => [...prev, { role: 'bot', content: res.answer || 'No response' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', content: '⚠️ Failed to get a response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-dark-400 rounded-xl overflow-hidden w-full max-w-sm mx-auto shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: themeColor }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l5.168-1.438A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
          </div>
          <span className="font-semibold text-black text-sm">{project.widget_title || project.name}</span>
        </div>

        {/* Language Selector */}
        <div className="relative" ref={langDropdownRef}>
          <button
            onClick={() => setLangDropdownOpen(prev => !prev)}
            className="flex items-center gap-1 text-xs font-semibold text-black bg-black/10 hover:bg-black/20 transition-colors px-2 py-1 rounded-lg"
            title="Select language"
          >
            {currentLang.label}
            <svg
              className={`w-3 h-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-dark-200 border border-dark-400 rounded-xl shadow-2xl z-50 overflow-hidden">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors hover:bg-dark-300 ${
                    lang.code === selectedLanguage ? 'text-brand font-semibold' : 'text-gray-300'
                  }`}
                >
                  <span className="font-mono w-7">{lang.label}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-3 flex flex-col gap-2 bg-dark-100">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                msg.role === 'user'
                  ? 'text-black rounded-br-none'
                  : 'bg-dark-300 text-white rounded-bl-none'
              }`}
              style={msg.role === 'user' ? { background: themeColor } : {}}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark-300 px-3 py-2 rounded-xl rounded-bl-none">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 bg-dark-200 border-t border-dark-400">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask something..."
          disabled={loading}
          className="flex-1 bg-dark-300 border border-dark-500 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="w-9 h-9 rounded-lg flex items-center justify-center disabled:opacity-40 transition-opacity"
          style={{ background: themeColor }}
        >
          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}