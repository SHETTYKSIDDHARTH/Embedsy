import express from 'express';
import { processQuery } from '../services/rag.js';
import { validateMessage, validateProjectId } from '../utils/validators.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { projectId, message, apiKey } = req.body;
    
    logger.info('Chat request received', { 
      projectId, 
      messageLength: message?.length 
    });
    
    if (!projectId) {
      return res.status(400).json({
        success: false,
        error: 'Project ID is required'
      });
    }
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }
    
    validateProjectId(projectId);
    validateMessage(message);
    
    const result = await processQuery(projectId, message);
    
    logger.info('Chat response generated', { 
      projectId,
      confidence: result.confidence 
    });
    
    res.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Chat request failed', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process chat message',
      timestamp: new Date().toISOString()
    });
  }
});

router.post('/chat/stream', async (req, res) => {
  try {
    const { projectId, message } = req.body;
    
    validateProjectId(projectId);
    validateMessage(message);
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    res.write(`data: ${JSON.stringify({ status: 'processing' })}\n\n`);
    
    const result = await processQuery(projectId, message);
    
    res.write(`data: ${JSON.stringify({ status: 'complete', ...result })}\n\n`);
    res.end();
  } catch (error) {
    logger.error('Stream chat failed', error);
    res.write(`data: ${JSON.stringify({ status: 'error', error: error.message })}\n\n`);
    res.end();
  }
});

export default router;