import axios from 'axios';
import { API_URL } from '../utils/constants';

const client = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach Supabase JWT to every request automatically
client.interceptors.request.use((config) => {
  // Try multiple methods to find the auth token
  let token = null;

  // Method 1: Find sb-*-auth-token key (main Supabase session key)
  const supabaseKeys = Object.keys(localStorage);
  const authKey = supabaseKeys.find(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
  
  if (authKey) {
    try {
      const sessionData = JSON.parse(localStorage.getItem(authKey));
      if (sessionData?.access_token) {
        token = sessionData.access_token;
      }
    } catch (e) {
      console.warn('Failed to parse auth token from Supabase key:', authKey);
    }
  }

  // Method 2: Fallback - check supabase-auth-token
  if (!token) {
    try {
      const fallbackSession = localStorage.getItem('supabase-auth-token');
      if (fallbackSession) {
        const sessionData = JSON.parse(fallbackSession);
        if (sessionData?.access_token) {
          token = sessionData.access_token;
        }
      }
    } catch (e) {
      console.warn('Failed to parse fallback supabase-auth-token');
    }
  }

  // Method 3: Fallback - check supabase-session
  if (!token) {
    try {
      const fallbackSession = localStorage.getItem('supabase-session');
      if (fallbackSession) {
        const sessionData = JSON.parse(fallbackSession);
        if (sessionData?.access_token) {
          token = sessionData.access_token;
        }
      }
    } catch (e) {
      console.warn('Failed to parse supabase-session');
    }
  }

  // Attach token if found
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// If token expired or invalid, redirect to login
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - token expired or invalid
      localStorage.clear(); // Clear auth data
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
export const sendChat = (projectId, message, apiKey, targetLanguage = 'en') =>
  client.post('/chat', { projectId, message, apiKey, targetLanguage }).then(r => r.data);