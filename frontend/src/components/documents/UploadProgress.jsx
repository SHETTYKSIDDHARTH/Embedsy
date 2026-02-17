import React from 'react';

export default function UploadProgress({ filename, progress, status }) {
  const statusStyles = {
    uploading: 'text-brand',
    success: 'text-green-400',
    error: 'text-red-400',
  };

  const statusLabels = {
    uploading: `${progress}%`,
    success: 'Done',
    error: 'Failed',
  };

  return (
    <div className="p-4 bg-dark-300 border border-dark-500 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white truncate max-w-[70%]">{filename}</span>
        <span className={`text-sm font-semibold ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      <div className="w-full h-1.5 bg-dark-500 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            status === 'error' ? 'bg-red-500' : 'bg-brand'
          }`}
          style={{ width: `${status === 'success' ? 100 : progress}%` }}
        />
      </div>
    </div>
  );
}