import React from 'react';
import CopyButton from './CopyButton';

export default function CodeSnippet({ code, language = 'html', label }) {
  return (
    <div className="rounded-xl border border-dark-400 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-dark-300 border-b border-dark-400">
        <span className="text-xs text-gray-500 font-medium">{label || language.toUpperCase()}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm text-gray-300 overflow-x-auto bg-dark-200 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}