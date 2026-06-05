import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

function getErrorMessage(error) {
  return error.response?.data?.message || error.message || 'Something went wrong';
}

async function handleRequest(request) {
  try {
    const response = await request();
    const { data } = response;

    if (!data.success) {
      throw new Error(data.message || 'Request failed');
    }

    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export function getExpenses() {
  return handleRequest(() => api.get('/expenses'));
}

export function createExpense(payload) {
  return handleRequest(() => api.post('/expenses', payload));
}

export function updateExpense(id, payload) {
  return handleRequest(() => api.put(`/expenses/${id}`, payload));
}

export function deleteExpense(id) {
  return handleRequest(() => api.delete(`/expenses/${id}`));
}

export function getSummary() {
  return handleRequest(() => api.get('/summary'));
}
