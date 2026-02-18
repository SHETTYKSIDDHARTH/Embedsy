import express from 'express';
import { processQuery } from '../services/rag.js';
import { validateMessage, validateProjectId } from '../utils/validators.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { projectId, message, apiKey, targetLanguage } = req.body;

    logger.info('Chat request received', {
      projectId,
      messageLength: message?.length,
      targetLanguage: targetLanguage || 'en'
    });

    if (!projectId) {
      return res.status(400).json({ success: false, error: 'Project ID is required' });
    }

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    validateProjectId(projectId);
    validateMessage(message);

    // Pass targetLanguage into RAG pipeline
    const result = await processQuery(projectId, message, targetLanguage || 'en');

    logger.info('Chat response generated', {
      projectId,
      confidence: result.confidence,
      language: targetLanguage
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

export default router;