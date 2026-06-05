import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { cleanupTestData, resetTestData } from './setup.js';

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ISO_TIMESTAMP_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

const expensePayload = {
  amount: 500,
  category: 'Food',
  date: '2026-06-04',
  note: 'Lunch',
};

describe('Expense API', () => {
  beforeEach(async () => {
    await resetTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  it('creates an expense via POST and returns it via GET', async () => {
    const createResponse = await request(app)
      .post('/api/expenses')
      .send(expensePayload)
      .expect(201);

    expect(createResponse.body.success).toBe(true);
    expect(createResponse.body.data).toMatchObject({
      amount: 500,
      category: 'Food',
      date: '2026-06-04',
      note: 'Lunch',
    });
    expect(createResponse.body.data.id).toMatch(UUID_V4_REGEX);
    expect(createResponse.body.data.createdAt).toMatch(ISO_TIMESTAMP_REGEX);

    const createdExpense = createResponse.body.data;

    const listResponse = await request(app).get('/api/expenses').expect(200);

    expect(listResponse.body.success).toBe(true);
    expect(Array.isArray(listResponse.body.data)).toBe(true);
    expect(listResponse.body.data).toHaveLength(1);
    expect(listResponse.body.data[0]).toEqual(createdExpense);
  });
});
