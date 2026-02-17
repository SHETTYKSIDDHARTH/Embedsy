import React from 'react';
import DocumentCard from './DocumentCard';
import Spinner from '../common/Spinner';

export default function DocumentList({ documents, loading, error, onDelete }) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400 text-sm">{error}</div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {documents.map(doc => (
        <DocumentCard key={doc.filename} document={doc} onDelete={onDelete} />
      ))}
    </div>
  );
}