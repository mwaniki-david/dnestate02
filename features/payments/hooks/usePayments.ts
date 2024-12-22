import { useState, useEffect } from 'react';

export function usePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments');
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error('Failed to fetch payments', error);
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async (payment) => {
    await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment),
    });
    fetchPayments();
  };

  const updatePayment = async (id, status) => {
    await fetch('/api/payments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchPayments();
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return { payments, loading, createPayment, updatePayment };
}
