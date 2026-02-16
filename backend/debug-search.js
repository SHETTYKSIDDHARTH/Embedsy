// Enhanced debug script
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Exact same embedding function as backend
function generateEmbedding(text) {
  const EMBEDDING_DIMENSION = 384;
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
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
  
  return embedding.map(val => val / (magnitude || 1));
}

async function test() {
  console.log('🔍 Testing Complete Flow\n');
  
  const query = "What is Embedsy?";
  console.log(`Query: "${query}"\n`);
  
  // Generate embedding
  const queryEmbedding = generateEmbedding(query);
  console.log('✅ Generated embedding');
  console.log(`   Length: ${queryEmbedding.length}`);
  console.log(`   Type: ${typeof queryEmbedding}`);
  console.log(`   Is Array: ${Array.isArray(queryEmbedding)}`);
  console.log(`   First 5: [${queryEmbedding.slice(0, 5).join(', ')}]\n`);
  
  // Call the function exactly like backend does
  console.log('📞 Calling match_embeddings with:');
  console.log(`   query_embedding: [array of ${queryEmbedding.length}]`);
  console.log(`   match_threshold: 0.0`);
  console.log(`   match_count: 5`);
  console.log(`   project_id: cfc1a0f3-55db-431d-9a13-b61319c8d038\n`);
  
  const { data, error } = await supabase.rpc('match_embeddings', {
    query_embedding: queryEmbedding,
    match_threshold: 0.0,
    match_count: 5,
    project_id: 'cfc1a0f3-55db-431d-9a13-b61319c8d038'
  });
  
  if (error) {
    console.error('❌ ERROR:', error);
    console.error('   Message:', error.message);
    console.error('   Details:', error.details);
    console.error('   Hint:', error.hint);
  } else {
    console.log(`✅ Success! Found ${data.length} results\n`);
    data.forEach((result, idx) => {
      console.log(`Result ${idx + 1}:`);
      console.log(`   ID: ${result.id}`);
      console.log(`   Similarity: ${result.similarity}`);
      console.log(`   Text: "${result.chunk_text.substring(0, 80)}..."`);
      console.log('');
    });
  }
  
  // Also check what's in the database
  console.log('\n📋 Database check:');
  const { data: dbData, error: dbError } = await supabase
    .from('embeddings')
    .select('*')
    .eq('project_id', 'cfc1a0f3-55db-431d-9a13-b61319c8d038');
  
  if (dbError) {
    console.error('❌ DB Error:', dbError);
  } else {
    console.log(`✅ Found ${dbData.length} embeddings in database`);
    if (dbData.length > 0) {
      const emb = dbData[0];
      console.log(`   Embedding type in DB: ${typeof emb.embedding}`);
      console.log(`   Embedding is string: ${typeof emb.embedding === 'string'}`);
      if (typeof emb.embedding === 'string') {
        console.log(`   First 100 chars: ${emb.embedding.substring(0, 100)}`);
      }
    }
  }
}

test().catch(console.error);