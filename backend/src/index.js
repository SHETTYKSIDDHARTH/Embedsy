import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import projectRoutes from './routes/projects.js';
import documentRoutes from './routes/documents.js';
import chatRoutes from './routes/chat.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

app.use('/api', projectRoutes);
app.use('/api', documentRoutes);
app.use('/api', chatRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Embedsy backend running on port ${PORT}`);
});

export default app;