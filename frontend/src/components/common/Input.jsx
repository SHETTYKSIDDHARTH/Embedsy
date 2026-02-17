import React from 'react';

export default function Input({
  label,
  error,
  hint,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <input
        className={`
          w-full px-3 py-2 rounded-lg text-sm
          bg-dark-300 border border-dark-500 text-white
          placeholder-gray-600
          focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}
          ${className}
        `}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}