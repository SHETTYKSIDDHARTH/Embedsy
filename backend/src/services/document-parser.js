import pdfParse from 'pdf-parse';
import { logger } from '../utils/logger.js';

export const parseDocument = async (fileBuffer, fileType) => {
  try {
    logger.info('Parsing document', { fileType, size: fileBuffer.length });
    
    if (fileType === 'application/pdf') {
      const data = await pdfParse(fileBuffer);
      return data.text;
    } else if (fileType === 'text/plain' || fileType === 'text/markdown') {
      return fileBuffer.toString('utf-8');
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    logger.error('Document parsing failed', error);
    throw new Error('Failed to parse document: ' + error.message);
  }
};

export const cleanText = (text) => {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};