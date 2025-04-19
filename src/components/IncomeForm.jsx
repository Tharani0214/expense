import React, { useState } from 'react';

function IncomeForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');

  const handleAddIncome = () => {
    if (amount && source) {
      const newIncome = {
        type: 'income',
        amount: parseFloat(amount),
        source,
        date: new Date().toISOString()
      };
      onAdd(newIncome);
      setAmount('');
      setSource('');
    }
  };

  return (
    <div className="card">
      <h3>Add Income</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source"
        required
      />
      <button onClick={handleAddIncome}>Add Income</button>
      
    </div>
  );
}
export default IncomeForm;