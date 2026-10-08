import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { existsSync } from 'node:fs';
import path from 'node:path';
import userRouter from './UserRoutes';
import dns from 'node:dns';
import { loadEnvFile } from 'node:process';
import { Utils } from './Utils';

const envPath = path.join(__dirname, '../.env');
if (existsSync(envPath)) {
  loadEnvFile(envPath);
}
dns.setServers(['1.1.1.1', '8.8.8.8']);

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.get('/hello', (_req, res) => {
  res.send(Utils.helloworld());
});

app.get('/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send('Invalid numbers');
  }
  res.json({ result: Utils.add(a, b) });
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', userRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

if (require.main === module) {
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    mongoose
      .connect(mongoUri)
      .then(() => {
        console.log('Connected to MongoDB');
        const port = Number(process.env.PORT) || 3000;
        app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
        });
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        const port = Number(process.env.PORT) || 3000;
        app.listen(port, () => {
          console.log(`Server is running on http://localhost:${port} (without DB)`);
        });
      });
  } else {
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
