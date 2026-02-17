import React from 'react';
import Spinner from './Spinner';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand text-black hover:bg-brand-dark active:scale-95',
    secondary: 'bg-dark-300 text-white hover:bg-dark-400 border border-dark-500',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30',
    ghost: 'text-gray-400 hover:text-white hover:bg-dark-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}