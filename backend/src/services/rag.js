import { generateEmbedding } from './embedding.js';
import { searchSimilarChunks } from './vectordb.js';
import { generateResponse } from './llm.js';
import { translateWithLingo } from './lingo.js';
import { logger } from '../utils/logger.js';

// targetLanguage now comes from the user's widget selection
export const processQuery = async (projectId, userMessage, targetLanguage = 'en') => {
  try {
    logger.info('Processing query', {
      projectId,
      messageLength: userMessage.length,
      targetLanguage
    });

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(userMessage);

    // Search for relevant chunks
    const similarChunks = await searchSimilarChunks(projectId, queryEmbedding, 5);

    if (!similarChunks || similarChunks.length === 0) {
      logger.warn('No relevant context found');

      // Even the fallback message gets translated
      const fallback = "I don't have enough information in the documentation to answer that question. Please try rephrasing or ask something else.";
      const translatedFallback = await translateWithLingo(fallback, targetLanguage);

      return {
        answer: translatedFallback,
        sources: [],
        confidence: 0
      };
    }

    const context = similarChunks
      .map((chunk, idx) => `[${idx + 1}] ${chunk.chunk_text}`)
      .join('\n\n');

    logger.info('Context retrieved', { chunks: similarChunks.length });

    // Groq always answers in English — clean, consistent, based on docs
    const englishAnswer = await generateResponse(context, userMessage);

    // Lingo translates to user's chosen language
    const finalAnswer = await translateWithLingo(englishAnswer, targetLanguage);

    logger.info('Query processing complete', { targetLanguage });

    const avgSimilarity = similarChunks.reduce((sum, c) => sum + (c.similarity || 0), 0) / similarChunks.length;

    return {
      answer: finalAnswer,
      sources: similarChunks.map((c, idx) => ({
        id: idx + 1,
        text: c.chunk_text.substring(0, 150) + '...',
        similarity: Math.round((c.similarity || 0) * 100)
      })),
      confidence: Math.round(avgSimilarity * 100)
    };
  } catch (error) {
    logger.error('RAG pipeline failed', error);
    throw new Error('Query processing failed: ' + error.message);
  }
};