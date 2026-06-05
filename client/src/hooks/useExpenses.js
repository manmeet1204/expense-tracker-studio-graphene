import { useCallback, useEffect, useState } from 'react';
import * as api from '../services/api.js';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.getExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const createExpense = async (payload) => {
    setActionLoading(true);
    setError(null);

    try {
      await api.createExpense(payload);
      await fetchExpenses();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const updateExpense = async (id, payload) => {
    setActionLoading(true);
    setError(null);

    try {
      await api.updateExpense(id, payload);
      await fetchExpenses();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const removeExpense = async (id) => {
    setActionLoading(true);
    setError(null);

    try {
      await api.deleteExpense(id);
      await fetchExpenses();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    expenses,
    loading,
    error,
    actionLoading,
    createExpense,
    updateExpense,
    removeExpense,
    refetch: fetchExpenses,
  };
}
