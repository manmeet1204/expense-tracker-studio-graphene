import { sendError } from '../utils/response.js';
import { AppError } from '../utils/AppError.js';

export function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  console.error(err);
  return sendError(res, 500, 'Internal server error');
}

export function notFoundHandler(_req, res) {
  return sendError(res, 404, 'Route not found');
}
