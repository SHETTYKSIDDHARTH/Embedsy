import React from 'react';
import { useLocation } from 'react-router-dom';

const titles = {
  '/dashboard': 'Dashboard',
  '/projects': 'Project',
};

export default function Navbar() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname.includes('/upload')) return 'Upload Documents';
    if (location.pathname.includes('/embed')) return 'Embed Widget';
    if (location.pathname.includes('/projects/')) return 'Project Details';
    return 'Embedsy';
  };

  return (
    <header className="h-14 border-b border-dark-300 flex items-center justify-between px-6 bg-dark-100 shrink-0">
      <h1 className="text-base font-semibold text-white">{getTitle()}</h1>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 bg-dark-300 px-2.5 py-1 rounded-full border border-dark-500">
          Dev Mode
        </span>
      </div>
    </header>
  );
}