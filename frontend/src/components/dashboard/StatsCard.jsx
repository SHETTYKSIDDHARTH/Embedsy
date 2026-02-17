import React from 'react';

export default function StatsCard({ label, value, icon, color = 'brand' }) {
  const colors = {
    brand: 'text-brand bg-brand/10 border-brand/20',
    blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  };

  return (
    <div className="bg-dark-200 border border-dark-400 rounded-xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}