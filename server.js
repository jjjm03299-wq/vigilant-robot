import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// API Endpoint to generate a 4-digit PIN
app.get('/api/generate', (req, res) => {
  const pin = Math.floor(1000 + Math.random() * 9000).toString();
  res.json({ pin });
});

// Serve static files from the compiled Vite dist directory (includes dist/index.html)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to dist/index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

export default app;
