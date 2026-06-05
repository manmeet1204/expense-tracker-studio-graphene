import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppError } from '../utils/AppError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DATA_FILE = path.join(__dirname, '../../data/expenses.json');

function getDataFile() {
  return process.env.DATA_FILE || DEFAULT_DATA_FILE;
}

async function ensureDataFile() {
  const dataFile = getDataFile();

  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, '[]', 'utf-8');
  }
}

export async function readExpenses() {
  await ensureDataFile();

  let content;
  try {
    content = await fs.readFile(getDataFile(), 'utf-8');
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
    await fs.writeFile(getDataFile(), JSON.stringify(expenses, null, 2), 'utf-8');
  } catch {
    throw new AppError('Failed to write expense data', 500);
  }
}
