import React, { useState } from 'react';
import { formatDate, formatBytes } from '../../utils/formatters';
import Button from '../common/Button';

export default function DocumentCard({ document, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(document.filename);
    } finally {
      setDeleting(false);
    }
  };

  const ext = document.filename?.split('.').pop()?.toUpperCase() || 'FILE';

  const extColors = {
    PDF: 'text-red-400 bg-red-400/10 border-red-400/20',
    TXT: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    MD: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-dark-200 border border-dark-400 rounded-xl hover:border-dark-500 transition-colors group">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`text-xs font-bold px-2 py-1 rounded-md border shrink-0 ${extColors[ext] || 'text-gray-400 bg-dark-300 border-dark-500'}`}>
          {ext}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{document.filename}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {document.chunks} chunks · {formatDate(document.created_at)}
          </p>
        </div>
      </div>
      <Button
        variant="danger"
        size="sm"
        loading={deleting}
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 shrink-0 ml-3"
      >
        Delete
      </Button>
    </div>
  );
}