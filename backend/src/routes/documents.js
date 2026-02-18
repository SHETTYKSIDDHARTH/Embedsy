import express from 'express';
import multer from 'multer';
import { parseDocument, cleanText } from '../services/document-parser.js';
import { chunkText } from '../services/chunking.js';
import { generateEmbeddings } from '../services/embedding.js';
import { storeEmbeddings } from '../services/vectordb.js';
import { validateFile } from '../utils/validators.js';
import { logger } from '../utils/logger.js';
import { supabaseAdmin } from '../config/database.js';  // changed
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.use(requireAuth);

router.post('/projects/:projectId/upload', upload.single('file'), async (req, res) => {
  try {
    const { projectId } = req.params;
    const file = req.file;

    const { data: project, error: projError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', req.user.id)
      .single();

    if (projError || !project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    if (!file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    validateFile(file);

    const rawText = await parseDocument(file.buffer, file.mimetype);

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Document contains no readable text' });
    }

    const text = cleanText(rawText);
    const chunks = chunkText(text);

    if (chunks.length === 0) {
      return res.status(400).json({ success: false, error: 'Document could not be properly chunked' });
    }

    const embeddings = await generateEmbeddings(chunks);
    await storeEmbeddings(projectId, chunks, embeddings, file.originalname);

    logger.info('Document upload complete', { projectId, chunks: chunks.length });

    res.json({
      success: true,
      message: 'Document processed successfully',
      stats: {
        filename: file.originalname,
        fileSize: file.size,
        chunks: chunks.length,
        textLength: text.length,
      }
    });
  } catch (error) {
    logger.error('Document upload failed', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/projects/:projectId/documents', async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data: project, error: projError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', req.user.id)
      .single();

    if (projError || !project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const { data, error } = await supabaseAdmin
      .from('embeddings')
      .select('id, chunk_text, metadata, created_at')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const groupedByFile = (data || []).reduce((acc, item) => {
      const filename = item.metadata?.filename || 'Unknown';
      if (!acc[filename]) {
        acc[filename] = { filename, chunks: 0, created_at: item.created_at };
      }
      acc[filename].chunks++;
      return acc;
    }, {});

    res.json({
      success: true,
      documents: Object.values(groupedByFile),
      totalChunks: (data || []).length
    });
  } catch (error) {
    logger.error('Get documents error', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/projects/:projectId/documents/:filename', async (req, res) => {
  try {
    const { projectId, filename } = req.params;

    const { data: project, error: projError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('user_id', req.user.id)
      .single();

    if (projError || !project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const decodedFilename = decodeURIComponent(filename);

    const { error } = await supabaseAdmin
      .from('embeddings')
      .delete()
      .eq('project_id', projectId)
      .contains('metadata', { filename: decodedFilename });

    if (error) throw error;

    res.json({ success: true, message: 'Document deleted' });
  } catch (error) {
    logger.error('Delete document error', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;