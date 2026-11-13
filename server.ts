import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { processAstronautChatRequest } from './src/utils/astronautChatServer.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/astronaut-chat', async (req: Request, res: Response) => {
    const result = await processAstronautChatRequest({
      body: req.body,
      apiKey: process.env.GEMINI_API_KEY,
    });
    res.status(result.status).json(result.payload);
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cosmic Relics server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
