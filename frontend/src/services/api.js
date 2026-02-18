import axios from 'axios';
import { API_URL } from '../utils/constants';

const client = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach Supabase JWT to every request automatically
client.interceptors.request.use((config) => {
  // Supabase stores session under sb-<project-ref>-auth-token
  const supabaseKey = Object.keys(localStorage).find(
    k => k.startsWith('sb-') && k.endsWith('-auth-token')
  );
  if (supabaseKey) {
    try {
      const session = JSON.parse(localStorage.getItem(supabaseKey));
      const token = session?.access_token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch {}
  }
  return config;
});

// If token expired or invalid, redirect to login
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Projects ──────────────────────────────────────────
export const getProjects = () =>
  client.get('/projects').then(r => r.data);

export const getProject = (id) =>
  client.get(`/projects/${id}`).then(r => r.data);

export const createProject = (payload) =>
  client.post('/projects', payload).then(r => r.data);

export const deleteProject = (id) =>
  client.delete(`/projects/${id}`).then(r => r.data);

// ── Documents ─────────────────────────────────────────
export const getDocuments = (projectId) =>
  client.get(`/projects/${projectId}/documents`).then(r => r.data);

export const uploadDocument = (projectId, file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  return client.post(`/projects/${projectId}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded * 100) / e.total));
      }
    },
  }).then(r => r.data);
};

export const deleteDocument = (projectId, filename) =>
  client.delete(`/projects/${projectId}/documents/${encodeURIComponent(filename)}`).then(r => r.data);

// ── Chat ──────────────────────────────────────────────
export const sendChat = (projectId, message, apiKey) =>
  client.post('/chat', { projectId, message, apiKey }).then(r => r.data);