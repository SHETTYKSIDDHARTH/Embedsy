import React, { useState, useRef } from 'react';
import Button from '../common/Button';
import UploadProgress from './UploadProgress';
import { ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../../utils/constants';

export default function DocumentUpload({ onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploads, setUploads] = useState([]);
  const fileInputRef = useRef(null);

  const updateUpload = (id, updates) => {
    setUploads(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  const processFile = async (file) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      alert(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    const id = Date.now();
    setUploads(prev => [...prev, { id, filename: file.name, progress: 0, status: 'uploading' }]);

    try {
      await onUpload(file, (progress) => {
        updateUpload(id, { progress });
      });
      updateUpload(id, { status: 'success', progress: 100 });
      setTimeout(() => setUploads(prev => prev.filter(u => u.id !== id)), 3000);
    } catch (err) {
      updateUpload(id, { status: 'error' });
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(processFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
          transition-all duration-200
          ${dragOver
            ? 'border-brand bg-brand/5 scale-[1.01]'
            : 'border-dark-500 hover:border-dark-400 hover:bg-dark-300/50'
          }
        `}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-dark-300 border border-dark-500 flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium">Drop files here or click to browse</p>
            <p className="text-gray-500 text-sm mt-1">
              Supports {ALLOWED_FILE_EXTENSIONS.join(', ')} · Max {MAX_FILE_SIZE_MB}MB
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={ALLOWED_FILE_EXTENSIONS.join(',')}
          multiple
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      {/* Upload progress items */}
      {uploads.length > 0 && (
        <div className="flex flex-col gap-2">
          {uploads.map(u => (
            <UploadProgress key={u.id} filename={u.filename} progress={u.progress} status={u.status} />
          ))}
        </div>
      )}
    </div>
  );
}