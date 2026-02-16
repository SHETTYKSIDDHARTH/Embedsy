import { CHUNK_SIZE, CHUNK_OVERLAP } from '../config/constants.js';
import { logger } from '../utils/logger.js';

export const chunkText = (text) => {
  logger.info('Chunking text', { textLength: text.length });
  
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20);
  
  const chunks = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    const potentialChunk = currentChunk + sentence + '. ';
    
    if (potentialChunk.length < CHUNK_SIZE) {
      currentChunk = potentialChunk;
    } else {
      if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = sentence + '. ';
    }
  }
  
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  logger.info('Chunking complete', { chunksCreated: chunks.length });
  return chunks;
};