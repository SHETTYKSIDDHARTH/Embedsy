import axios from 'axios';
import { API_URL } from '../utils/constants';

const client = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

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