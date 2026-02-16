import { supabase } from '../config/database.js';
import { logger } from '../utils/logger.js';

export const validateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.body.apiKey;
    
    if (!apiKey) {
      return res.status(401).json({ 
        success: false, 
        error: 'API key required' 
      });
    }
    
    const { data, error } = await supabase
      .from('projects')
      .select('id, name')
      .eq('api_key', apiKey)
      .single();
    
    if (error || !data) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid API key' 
      });
    }
    
    req.project = data;
    req.apiKey = apiKey;
    next();
  } catch (error) {
    logger.error('Auth middleware error', error);
    res.status(500).json({ 
      success: false, 
      error: 'Authentication failed' 
    });
  }
};