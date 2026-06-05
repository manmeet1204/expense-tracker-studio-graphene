import * as expenseService from '../services/expenseService.js';
import { validateExpenseInput } from '../validators/expenseValidator.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AppError } from '../utils/AppError.js';

function handleControllerError(res, error) {
  if (error instanceof AppError) {
    return sendError(res, error.statusCode, error.message);
  }

  console.error(error);
  return sendError(res, 500, 'Internal server error');
}

export async function getAllExpenses(_req, res) {
  try {
    const expenses = await expenseService.getAllExpenses();
    return sendSuccess(res, 200, expenses);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function createExpense(req, res) {
  try {
    const validation = validateExpenseInput(req.body);

    if (!validation.valid) {
      return sendError(res, 400, validation.message);
    }

    const expense = await expenseService.createExpense(validation.data);
    return sendSuccess(res, 201, expense);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function updateExpense(req, res) {
  try {
    const validation = validateExpenseInput(req.body);

    if (!validation.valid) {
      return sendError(res, 400, validation.message);
    }

    const expense = await expenseService.updateExpense(req.params.id, validation.data);
    return sendSuccess(res, 200, expense);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

export async function deleteExpense(req, res) {
  try {
    await expenseService.deleteExpense(req.params.id);
    return sendSuccess(res, 200, null);
  } catch (error) {
    return handleControllerError(res, error);
  }
}
