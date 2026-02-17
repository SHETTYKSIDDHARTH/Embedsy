import React, { useState } from 'react';
import { sendChat } from '../../services/api';

export default function LivePreview({ project }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: `👋 Hi! I'm the assistant for "${project.widget_title || project.name}". Ask me anything!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    try {
      const res = await sendChat(project.id, userMessage, project.api_key);
      setMessages(prev => [...prev, { role: 'bot', content: res.answer || 'No response' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', content: '⚠️ Failed to get a response.' }]);
    } finally {
      setLoading(false);
    }
  };

  const themeColor = project.theme_color || '#00FF87';

  return (
    <div className="border border-dark-400 rounded-xl overflow-hidden w-full max-w-sm mx-auto shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3" style={{ background: themeColor }}>
        <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l5.168-1.438A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
        </div>
        <span className="font-semibold text-black text-sm">{project.widget_title || project.name}</span>
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