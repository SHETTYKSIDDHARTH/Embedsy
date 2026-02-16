import express from 'express';
import { supabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
import { deleteProjectEmbeddings } from '../services/vectordb.js';

const router = express.Router();

router.post('/projects', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Project name is required'
      });
    }
    
    const projectId = uuidv4();
    const apiKey = `embedsy_${uuidv4().replace(/-/g, '')}`;
    
    logger.info('Creating project', { name, projectId });
    
    const { data, error } = await supabase
      .from('projects')
      .insert([
        { 
          id: projectId, 
          name: name.trim(),
          api_key: apiKey 
        }
      ])
      .select()
      .single();
    
    if (error) {
      logger.error('Project creation failed', error);
      throw error;
    }
    
    logger.info('Project created successfully', { projectId });
    
    res.status(201).json({
      success: true,
      project: data,
      message: 'Project created successfully'
    });
  } catch (error) {
    logger.error('Create project error', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create project'
    });
  }
});

router.get('/projects', async (req, res) => {
  try {
    logger.info('Fetching all projects');
    
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, created_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      logger.error('Fetch projects failed', error);
      throw error;
    }
    
    const projectsWithStats = await Promise.all(
      data.map(async (project) => {
        const { count } = await supabase
          .from('embeddings')
          .select('id', { count: 'exact', head: true })
          .eq('project_id', project.id);
        
        return {
          ...project,
          documentCount: count || 0
        };
      })
    );
    
    res.json({
      success: true,
      projects: projectsWithStats,
      count: projectsWithStats.length
    });
  } catch (error) {
    logger.error('Get projects error', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch projects'
    });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    logger.info('Fetching project', { projectId: id });
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Project not found'
        });
      }
      throw error;
    }
    
    const { count } = await supabase
      .from('embeddings')
      .select('id', { count: 'exact', head: true })
      .eq('project_id', id);
    
    res.json({
      success: true,
      project: {
        ...data,
        documentCount: count || 0
      }
    });
  } catch (error) {
    logger.error('Get project error', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch project'
    });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    logger.info('Deleting project', { projectId: id });
    
    await deleteProjectEmbeddings(id);
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    logger.info('Project deleted successfully', { projectId: id });
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    logger.error('Delete project error', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete project'
    });
  }
});

export default router;