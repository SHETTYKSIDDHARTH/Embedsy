import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-white gap-5">
      <p className="text-7xl font-black text-brand">404</p>
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-gray-500">The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
    </div>
  );
}