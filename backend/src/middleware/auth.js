import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger.js';

// Use service role key for server-side auth verification
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY
);

// Protects dashboard routes — requires valid Supabase JWT
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Auth middleware error', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
};

// Validates API key — used by the public widget chat endpoint
export const validateApiKey = async (req, res, next) => {
  try {
    const { supabase } = await import('../config/database.js');
    const apiKey = req.headers['x-api-key'] || req.body.apiKey;

    if (!apiKey) {
      return res.status(401).json({ success: false, error: 'API key required' });
    }

    const { data, error } = await supabase
      .from('projects')
      .select('id, name')
      .eq('api_key', apiKey)
      .single();

    if (error || !data) {
      return res.status(401).json({ success: false, error: 'Invalid API key' });
    }

    req.project = data;
    req.apiKey = apiKey;
    next();
  } catch (error) {
    logger.error('API key validation error', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
};