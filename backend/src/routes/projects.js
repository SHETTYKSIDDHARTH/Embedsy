import express from 'express';
import { supabaseAdmin } from '../config/database.js';  // changed
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
import { deleteProjectEmbeddings } from '../services/vectordb.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public — widget calls this to boot
router.get('/projects/:id/widget-config', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('id, name, api_key, theme_color, widget_title')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({
      success: true,
      projectId: data.id,
      apiKey: data.api_key,
      title: data.widget_title || data.name,
      themeColor: data.theme_color || '#00FF87',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// All routes below require auth
router.use(requireAuth);

router.post('/projects', async (req, res) => {
  try {
    const { name, widgetTitle, themeColor } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Project name is required' });
    }

    const projectId = uuidv4();
    const apiKey = `embedsy_${uuidv4().replace(/-/g, '')}`;

    logger.info('Creating project', { name, projectId, userId: req.user.id });

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([{
        id: projectId,
        name: name.trim(),
        api_key: apiKey,
        widget_title: widgetTitle || name.trim(),
        theme_color: themeColor || '#00FF87',
        user_id: req.user.id,
      }])
      .select()
      .single();

    if (error) throw error;

    logger.info('Project created successfully', { projectId });
    res.status(201).json({ success: true, project: data });
  } catch (error) {
    logger.error('Create project error', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('id, name, api_key, created_at, widget_title, theme_color')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const projectsWithStats = await Promise.all(
      data.map(async (project) => {
        const { count } = await supabaseAdmin
          .from('embeddings')
          .select('id', { count: 'exact', head: true })
          .eq('project_id', project.id);
        return { ...project, chunkCount: count || 0 };
      })
    );

    res.json({ success: true, projects: projectsWithStats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error) return res.status(404).json({ success: false, error: 'Not found' });

    const { count } = await supabaseAdmin
      .from('embeddings')
      .select('id', { count: 'exact', head: true })
      .eq('project_id', req.params.id);

    res.json({ success: true, project: { ...data, chunkCount: count || 0 } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const { data, error: fetchError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (fetchError || !data) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    await deleteProjectEmbeddings(req.params.id);
    const { error } = await supabaseAdmin.from('projects').delete().eq('id', req.params.id);
    if (error) throw error;

    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;