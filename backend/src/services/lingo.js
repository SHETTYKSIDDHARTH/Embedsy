import { logger } from '../utils/logger.js';

// Lingo.dev (formerly Replexica) - AI-powered i18n translation
// Docs: https://lingo.dev/docs
export const translateWithLingo = async (text, targetLanguage) => {
  try {
    if (targetLanguage === 'en' || !targetLanguage) {
      return text;
    }

    if (!process.env.LINGO_API_KEY) {
      logger.warn('Lingo API key not configured, returning original text');
      return text;
    }

    logger.info('Translating with Lingo.dev', { targetLanguage });

    const response = await fetch('https://engine.lingo.dev/i18n', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LINGO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceLocale: 'en',
        targetLocale: targetLanguage,
        data: { content: text },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      logger.warn('Lingo.dev translation failed', { status: response.status, err });
      return text;
    }

    const result = await response.json();
    const translated = result?.data?.content;

    logger.info('Lingo.dev translation successful');
    return translated || text;

  } catch (error) {
    logger.warn('Lingo translation error, returning original text', { message: error.message });
    return text;
  }
};