import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

function getErrorMessage(error) {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === 'ERR_NETWORK' || !error.response) {
    return 'Unable to reach the server. Please check your connection and try again.';
  }

  return error.message || 'Something went wrong';
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
