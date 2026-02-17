import { logger } from '../utils/logger.js';
import { EMBEDDING_DIMENSION } from '../config/constants.js';

export const generateEmbedding = async (text) => {
  try {
    // Remove punctuation and split into words
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    const words = cleanText.split(/\s+/).filter(w => w.length > 2);
    
    const embedding = new Array(EMBEDDING_DIMENSION).fill(0);
    
    words.forEach((word, index) => {
      let hash = 0;
      for (let i = 0; i < word.length; i++) {
        hash = ((hash << 5) - hash) + word.charCodeAt(i);
        hash = hash & hash;
      }
      
      const position = Math.abs(hash) % EMBEDDING_DIMENSION;
      const weight = 1 / Math.sqrt(index + 1);
      embedding[position] += weight;
    });
    
    const magnitude = Math.sqrt(
      embedding.reduce((sum, val) => sum + val * val, 0)
    );
    
    const normalized = embedding.map(val => val / (magnitude || 1));
    
    return normalized;
  } catch (error) {
    logger.error('Embedding generation failed', error);
    throw error;
  }
};

export const generateEmbeddings = async (chunks) => {
  logger.info('Generating embeddings', { chunkCount: chunks.length })

;
  
  const embeddings = [];
  
  for (let i = 0; i < chunks.length; i++) {
    const embedding = await generateEmbedding(chunks[i]);
    embeddings.push(embedding);
    
    if ((i + 1) % 10 === 0) {
      logger.info(`Generated ${i + 1}/${chunks.length} embeddings`);
    }
  }
  
  logger.info('All embeddings generated');
  return embeddings;
};