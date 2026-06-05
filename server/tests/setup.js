import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDataFile = path.join(__dirname, 'test-expenses.json');

process.env.DATA_FILE = testDataFile;

export async function resetTestData() {
  await fs.writeFile(testDataFile, '[]', 'utf-8');
}

export async function cleanupTestData() {
  await fs.rm(testDataFile, { force: true });
}
