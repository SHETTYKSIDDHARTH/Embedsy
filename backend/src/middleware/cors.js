import cors from 'cors';

// FIX: credentials:true is incompatible with origin:'*' — causes browser CORS error
export const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: false  // FIX: was true
});