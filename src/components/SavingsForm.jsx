import React, { useState } from 'react';

function SavingsForm({ savings = [], setSavings }) {
  const [amount, setAmount] = useState('');

  const handleAddSavings = () => {
    if (!setSavings || typeof setSavings !== 'function') {
      console.error("setSavings is not a valid function!");
      return;
    }

    if (amount) {
      const newSavings = {
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString()
      };

      const updatedSavings = Array.isArray(savings)
        ? [...savings, newSavings]
        : [newSavings];

      setSavings(updatedSavings);
      setAmount('');
    }
  };

  // Calculate total savings
  const totalSavings = savings.reduce((total, entry) => total + parseFloat(entry.amount), 0);

  return (
    <div className="card">
      <h3>Add Savings</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button onClick={handleAddSavings}>Add Savings</button>

      {/* Savings Summary */}
      <div className="savings-summary" style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
        <h4>Total Savings: ₹{totalSavings.toFixed(2)}</h4>
        <ul>
          {savings.map((entry, index) => (
            <li key={index}>
              ₹{entry.amount} saved on {entry.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SavingsForm;
