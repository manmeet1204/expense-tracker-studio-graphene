import * as summaryService from '../services/summaryService.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AppError } from '../utils/AppError.js';

function handleControllerError(res, error) {
  if (error instanceof AppError) {
    return sendError(res, error.statusCode, error.message);
  }

  console.error(error);
  return sendError(res, 500, 'Internal server error');
}

export async function getSummary(_req, res) {
  try {
    const summary = await summaryService.getSummary();
    return sendSuccess(res, 200, summary);
  } catch (error) {
    return handleControllerError(res, error);
  }
}
