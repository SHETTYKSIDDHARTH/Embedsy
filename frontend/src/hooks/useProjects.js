import { useState, useEffect, useCallback } from 'react';
import { getProjects, createProject, deleteProject } from '../services/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const create = async (payload) => {
    const data = await createProject(payload);
    await fetchProjects();
    return data;
  };

  const remove = async (id) => {
    await deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return { projects, loading, error, refetch: fetchProjects, create, remove };
};