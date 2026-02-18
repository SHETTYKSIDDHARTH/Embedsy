// In dev: Vite proxies /api → localhost:3000
// In prod on Vercel: VITE_API_URL=https://your-backend.onrender.com/api
export const API_URL = import.meta.env.VITE_API_URL || '/api';

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'text/markdown',
];

export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.txt', '.md'];

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const POSITIONS = [
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
];

export const DEFAULT_THEME_COLOR = '#00FF87';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;