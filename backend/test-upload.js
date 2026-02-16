import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const API_URL = 'http://localhost:3000/api';

async function testBackend() {
  console.log('🧪 Testing Embedsy Backend\n');
  console.log('='.repeat(50));
  
  try {
    console.log('\n✅ Step 1: Health Check');
    const health = await axios.get('http://localhost:3000/health');
    console.log('   Server is healthy:', health.data.status);
    
    console.log('\n✅ Step 2: Create Project');
    const projectRes = await axios.post(`${API_URL}/projects`, {
      name: 'Test Chatbot Project'
    });
    
    const project = projectRes.data.project;
    console.log('   Project ID:', project.id);
    console.log('   API Key:', project.api_key);
    console.log('   Name:', project.name);
    
    console.log('\n✅ Step 3: Create Test Document');
    const testContent = `
Embedsy Platform Documentation

What is Embedsy?
Embedsy is a revolutionary platform that allows developers to create AI-powered chatbots instantly by simply uploading their documentation.

Key Features:
- Instant chatbot generation from documents
- Multilingual support (English, Spanish, French, German, and more)
- Easy integration with just a script tag
- Smart document processing and chunking
- Vector-based semantic search
- Powered by Groq LLM for fast responses

How It Works:
1. Upload your product documentation (PDF, TXT, or Markdown)
2. Embedsy processes and indexes your content
3. Get an embed code for your website
4. Users can ask questions and get instant answers

Pricing:
Free Tier: 1000 queries per month
Pro Plan: $29/month with unlimited queries
Enterprise: Custom pricing for large teams

Technical Stack:
- Backend: Node.js with Express
- Database: Supabase with pgvector
- AI: Groq (Llama 3) for responses
- Translation: Lingo.dev for multilingual support

Getting Started:
Simply create a project, upload your docs, and you're ready to go!
    `.trim();
    
    fs.writeFileSync('test-doc.txt', testContent);
    console.log('   Document created: test-doc.txt');
    
    console.log('\n✅ Step 4: Upload Document');
    const formData = new FormData();
    formData.append('file', fs.createReadStream('test-doc.txt'));
    
    const uploadRes = await axios.post(
      `${API_URL}/projects/${project.id}/upload`,
      formData,
      { 
        headers: formData.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );
    
    console.log('   Upload Status:', uploadRes.data.success ? 'Success' : 'Failed');
    console.log('   Chunks Created:', uploadRes.data.stats.chunks);
    console.log('   Text Length:', uploadRes.data.stats.textLength);
    
    console.log('\n✅ Step 5: Test Chat (English)');
    const chatRes1 = await axios.post(`${API_URL}/chat`, {
      projectId: project.id,
      message: 'What is Embedsy?',
      apiKey: project.api_key
    });
    
    console.log('   Question: What is Embedsy?');
    console.log('   Answer:', chatRes1.data.answer.substring(0, 100) + '...');
    console.log('   Language:', chatRes1.data.language);
    console.log('   Confidence:', chatRes1.data.confidence + '%');
    console.log('   Sources:', chatRes1.data.sources.length);
    
    console.log('\n✅ Step 6: Test Chat (Spanish)');
    const chatRes2 = await axios.post(`${API_URL}/chat`, {
      projectId: project.id,
      message: '¿Cuánto cuesta?',
      apiKey: project.api_key
    });
    
    console.log('   Question: ¿Cuánto cuesta?');
    console.log('   Answer:', chatRes2.data.answer.substring(0, 100) + '...');
    console.log('   Language:', chatRes2.data.language);
    console.log('   Confidence:', chatRes2.data.confidence + '%');
    
    console.log('\n✅ Step 7: Get All Projects');
    const projectsList = await axios.get(`${API_URL}/projects`);
    console.log('   Total Projects:', projectsList.data.projects.length);
    console.log('   First Project:', projectsList.data.projects[0].name);
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ALL TESTS PASSED!\n');
    console.log('📋 Test Project Details:');
    console.log('   ID:', project.id);
    console.log('   API Key:', project.api_key);
    console.log('\n💡 Use these for widget testing!\n');
    
    fs.unlinkSync('test-doc.txt');
    
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

testBackend();