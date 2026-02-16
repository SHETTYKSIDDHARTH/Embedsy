import { generateEmbedding } from './embedding.js';
import { searchSimilarChunks } from './vectordb.js';
import { generateResponse } from './llm.js';
import { translateWithLingo } from './lingo.js';
import { detectLanguage } from '../utils/language-detect.js';
import { logger } from '../utils/logger.js';

export const processQuery = async (projectId, userMessage) => {
  try {
    logger.info('Processing query', { projectId, messageLength: userMessage.length });
    
    const detectedLang = detectLanguage(userMessage);
    logger.info(`Detected language: ${detectedLang}`);
    
    const queryEmbedding = await generateEmbedding(userMessage);
    
    const similarChunks = await searchSimilarChunks(projectId, queryEmbedding, 5);
    
    if (!similarChunks || similarChunks.length === 0) {
      logger.warn('No relevant context found');
      return {
        answer: "I don't have enough information in the documentation to answer that question. Please try rephrasing or ask something else.",
        sources: [],
        language: detectedLang,
        confidence: 0
      };
    }
    
    const context = similarChunks
      .map((chunk, idx) => `[${idx + 1}] ${chunk.chunk_text}`)
      .join('\n\n');
    
    logger.info('Context retrieved', { chunks: similarChunks.length });
    
    const answer = await generateResponse(context, userMessage);
    
    const translatedAnswer = await translateWithLingo(answer, detectedLang);
    
    const avgSimilarity = similarChunks.reduce((sum, c) => sum + (c.similarity || 0), 0) / similarChunks.length;
    
    logger.info('Query processing complete');
    
    return {
      answer: translatedAnswer,
      sources: similarChunks.map((c, idx) => ({
        id: idx + 1,
        text: c.chunk_text.substring(0, 150) + '...',
        similarity: Math.round((c.similarity || 0) * 100)
      })),
      language: detectedLang,
      confidence: Math.round(avgSimilarity * 100)
    };
  } catch (error) {
    logger.error('RAG pipeline failed', error);
    throw new Error('Query processing failed: ' + error.message);
  }
};