import { Router } from 'express';
import * as expenseController from '../controllers/expenseController.js';

const router = Router();

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;
