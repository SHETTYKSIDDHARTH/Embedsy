import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import projectsRouter from './routes/projects.js';
import documentsRouter from './routes/documents.js';
import chatRouter from './routes/chat.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Embedsy API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      projects: '/api/projects',
      upload: '/api/projects/:id/upload',
      chat: '/api/chat'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

app.use('/api', projectsRouter);
app.use('/api', documentsRouter);
app.use('/api', chatRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('');
  console.log('🔌 ================================');
  console.log('🚀 Embedsy Backend Server');
  console.log('🔌 ================================');
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log('🔌 ================================');
  console.log('');
  logger.info('Server started successfully');
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection', error);
  process.exit(1);
});