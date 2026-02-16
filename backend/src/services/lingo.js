import axios from 'axios';
import { logger } from '../utils/logger.js';

export const translateWithLingo = async (text, targetLanguage) => {
  try {
    if (targetLanguage === 'en' || !targetLanguage) {
      return text;
    }
    
    if (!process.env.LINGO_API_KEY) {
      logger.warn('Lingo API key not configured, returning original text');
      return text;
    }
    
    logger.info('Translating with Lingo', { targetLanguage });
    
    const response = await axios.post(
      'https://api.lingo.dev/v1/translate',
      {
        text: text,
        target_language: targetLanguage,
        source_language: 'en',
        preserve_formatting: true
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.LINGO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );
    
    logger.info('Translation successful');
    return response.data.translated_text || text;
  } catch (error) {
    logger.warn('Lingo translation failed, returning original text', error.message);
    return text;
  }
};