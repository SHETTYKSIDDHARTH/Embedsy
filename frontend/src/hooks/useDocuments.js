import { useState, useEffect, useCallback } from 'react';
import { getDocuments, uploadDocument, deleteDocument } from '../services/api';

export const useDocuments = (projectId) => {
  const [documents, setDocuments] = useState([]);
  const [totalChunks, setTotalChunks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getDocuments(projectId);
      setDocuments(data.documents || []);
      setTotalChunks(data.totalChunks || 0);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const upload = async (file, onProgress) => {
    const data = await uploadDocument(projectId, file, onProgress);
    await fetchDocuments();
    return data;
  };

  const remove = async (filename) => {
    await deleteDocument(projectId, filename);
    setDocuments(prev => prev.filter(d => d.filename !== filename));
  };

  return { documents, totalChunks, loading, error, refetch: fetchDocuments, upload, remove };
};