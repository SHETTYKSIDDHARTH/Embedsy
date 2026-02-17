import { supabase } from '../config/database.js';
import { logger } from '../utils/logger.js';

// FIX: added filename parameter — was missing, caused all docs to show as 'Unknown'
export const storeEmbeddings = async (projectId, chunks, embeddings, filename = 'Unknown') => {
  try {
    logger.info('Storing embeddings', { projectId, count: chunks.length });

    const records = chunks.map((chunk, index) => ({
      project_id: projectId,
      chunk_text: chunk,
      embedding: `[${embeddings[index].join(',')}]`,
      metadata: {
        index,
        length: chunk.length,
        filename,  // FIX: was missing
        created_at: new Date().toISOString()
      }
    }));

    const { data, error } = await supabase
      .from('embeddings')
      .insert(records)
      .select();

    if (error) {
      logger.error('Supabase insert error', error);
      throw error;
    }

    logger.info(`Stored ${chunks.length} embeddings successfully`);
    return data;
  } catch (error) {
    logger.error('Failed to store embeddings', error);
    throw new Error('Database storage failed: ' + error.message);
  }
};

export const searchSimilarChunks = async (projectId, queryEmbedding, topK = 5) => {
  try {
    logger.info('Searching similar chunks', { projectId, topK });

    const { data, error } = await supabase.rpc('match_embeddings', {
      query_embedding: `[${queryEmbedding.join(',')}]`,
      match_threshold: 0.0,
      match_count: topK,
      project_id: projectId
    });

    if (error) {
      logger.error('Vector search error', error);
      throw error;
    }

    logger.info('Search complete', { resultsFound: data?.length || 0 });
    return data || [];
  } catch (error) {
    logger.error('Vector search failed', error);
    throw new Error('Search failed: ' + error.message);
  }
};

export const deleteProjectEmbeddings = async (projectId) => {
  try {
    const { error } = await supabase
      .from('embeddings')
      .delete()
      .eq('project_id', projectId);

    if (error) throw error;
    logger.info('Deleted embeddings for project', { projectId });
  } catch (error) {
    logger.error('Failed to delete embeddings', error);
    throw error;
  }
};