import React from 'react';

const Summary = ({ transactions = [] }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const savings = income - expenses;

  return (
    <div className="summary-container">
      <h2>Monthly Summary</h2>
      <p><strong>Total Income:</strong> ₹{income}</p>
      <p><strong>Total Expenses:</strong> ₹{expenses}</p>
      <p><strong>Total Savings:</strong> ₹{savings}</p>
    </div>
  );
};

export default Summary;
