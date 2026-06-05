import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppError } from '../utils/AppError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../../data/expenses.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

export async function readExpenses() {
  await ensureDataFile();

  let content;
  try {
    content = await fs.readFile(DATA_FILE, 'utf-8');
  } catch (error) {
    throw new AppError('Failed to read expense data', 500);
  }

  try {
    const expenses = JSON.parse(content);

    if (!Array.isArray(expenses)) {
      throw new Error('Invalid data format');
    }

    return expenses;
  } catch {
    throw new AppError('Expense data file is corrupted', 500);
  }
}

export async function writeExpenses(expenses) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2), 'utf-8');
  } catch {
    throw new AppError('Failed to write expense data', 500);
  }
}
