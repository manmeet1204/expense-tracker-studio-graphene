import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { sendSuccess } from './utils/response.js';

const app = express();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  return sendSuccess(res, 200, { status: 'ok' });
});

app.use('/api/expenses', expenseRoutes);

app.use('/api', notFoundHandler);

app.use(errorHandler);

export default app;
