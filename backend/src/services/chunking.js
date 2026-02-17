import { CHUNK_SIZE, CHUNK_OVERLAP } from '../config/constants.js';
import { logger } from '../utils/logger.js';

// FIX: CHUNK_OVERLAP was imported but never implemented — now properly applied
export const chunkText = (text) => {
  logger.info('Chunking text', { textLength: text.length });

  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20);

  const chunks = [];
  let currentSentences = [];
  let currentLength = 0;

  for (const sentence of sentences) {
    const sentenceWithPeriod = sentence + '. ';

    if (currentLength + sentenceWithPeriod.length > CHUNK_SIZE && currentSentences.length > 0) {
      chunks.push(currentSentences.join('').trim());

      // Carry over trailing sentences up to CHUNK_OVERLAP chars for context continuity
      let overlapLength = 0;
      const overlapSentences = [];
      for (let i = currentSentences.length - 1; i >= 0; i--) {
        overlapLength += currentSentences[i].length;
        overlapSentences.unshift(currentSentences[i]);
        if (overlapLength >= CHUNK_OVERLAP) break;
      }

      currentSentences = overlapSentences;
      currentLength = overlapLength;
    }

    currentSentences.push(sentenceWithPeriod);
    currentLength += sentenceWithPeriod.length;
  }

  if (currentSentences.length > 0) {
    chunks.push(currentSentences.join('').trim());
  }

  logger.info('Chunking complete', { chunksCreated: chunks.length });
  return chunks;
};