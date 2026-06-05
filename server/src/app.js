import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';
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

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON in request body',
    });
  }

  return next(err);
});

app.get('/api/health', (_req, res) => {
  return sendSuccess(res, 200, { status: 'ok' });
});

app.use('/api/expenses', expenseRoutes);
app.use('/api/summary', summaryRoutes);

app.use('/api', notFoundHandler);

app.use(errorHandler);

export default app;
