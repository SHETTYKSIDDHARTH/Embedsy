import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  // Add your Vercel frontend URL here once deployed
  process.env.FRONTEND_URL,
].filter(Boolean);

export const corsMiddleware = cors({
  // Allow any origin for widget.js (it gets embedded on any website)
  // but restrict dashboard API calls to known origins
  origin: (origin, callback) => {
    // Allow requests with no origin (Render health checks, curl, mobile)
    if (!origin) return callback(null, true);
    // Allow any origin — widget is embedded on external sites
    // In production you can tighten this to allowedOrigins only for /api/projects
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: false,
});