import { LingoDotDevEngine } from 'lingo.dev/sdk';
import { logger } from '../utils/logger.js';

// Initialize the engine once
const lingoEngine = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY,
});

export const translateWithLingo = async (text, targetLanguage) => {
  try {
    // Skip translation if target is English or not set
    if (!targetLanguage || targetLanguage === 'en') {
      return text;
    }

    if (!process.env.LINGODOTDEV_API_KEY) {
      logger.warn('LINGODOTDEV_API_KEY not configured, returning original text');
      return text;
    }

    logger.info('Translating with Lingo SDK', { targetLanguage });

    const translated = await lingoEngine.localizeText(text, {
      sourceLocale: 'en',
      targetLocale: targetLanguage,
    });

    logger.info('Translation successful', { targetLanguage });
    return translated || text;

  } catch (error) {
    logger.warn('Lingo translation failed, returning original text', { error: error.message });
    return text;
  }
};