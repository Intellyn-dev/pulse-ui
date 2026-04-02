import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import productsRouter from './routes/products';
import searchRouter from './routes/search';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(rateLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'pulse-bff' });
});

app.use('/api/products', productsRouter);
app.use('/api/search', searchRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Pulse BFF listening on port ${PORT}`);
});

export default app;
