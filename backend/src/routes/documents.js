import express from 'express';
import multer from 'multer';
import { parseDocument, cleanText } from '../services/document-parser.js';
import { chunkText } from '../services/chunking.js';
import { generateEmbeddings } from '../services/embedding.js';
import { storeEmbeddings } from '../services/vectordb.js';
import { validateFile } from '../utils/validators.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

router.post('/projects/:projectId/upload', upload.single('file'), async (req, res) => {
  try {
    const { projectId } = req.params;
    const file = req.file;
    
    logger.info('Document upload started', { 
      projectId, 
      filename: file?.originalname,
      size: file?.size 
    });
    
    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file provided'
      });
    }
    
    validateFile(file);
    
    logger.info('Parsing document');
    const rawText = await parseDocument(file.buffer, file.mimetype);
    
    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Document contains no readable text'
      });
    }
    
    const text = cleanText(rawText);
    
    logger.info('Document parsed', { textLength: text.length });
    
    const chunks = chunkText(text);
    
    if (chunks.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Document could not be properly chunked'
      });
    }
    
    logger.info('Generating embeddings');
    const embeddings = await generateEmbeddings(chunks);
    
    logger.info('Storing embeddings');
    await storeEmbeddings(projectId, chunks, embeddings);
    
    logger.info('Document upload complete', { 
      projectId, 
      chunks: chunks.length 
    });
    
    res.json({
      success: true,
      message: 'Document processed successfully',
      stats: {
        filename: file.originalname,
        fileSize: file.size,
        chunks: chunks.length,
        textLength: text.length,
        processingTime: 'completed'
      }
    });
  } catch (error) {
    logger.error('Document upload failed', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process document'
    });
  }
});

router.get('/projects/:projectId/documents', async (req, res) => {
  try {
    const { projectId } = req.params;
    
    logger.info('Fetching documents', { projectId });
    
    const { data, error } = await supabase
      .from('embeddings')
      .select('id, chunk_text, metadata, created_at')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const groupedByFile = data.reduce((acc, item) => {
      const filename = item.metadata?.filename || 'Unknown';
      if (!acc[filename]) {
        acc[filename] = {
          filename,
          chunks: 0,
          created_at: item.created_at
        };
      }
      acc[filename].chunks++;
      return acc;
    }, {});
    
    res.json({
      success: true,
      documents: Object.values(groupedByFile),
      totalChunks: data.length
    });
  } catch (error) {
    logger.error('Get documents error', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch documents'
    });
  }
});

export default router;