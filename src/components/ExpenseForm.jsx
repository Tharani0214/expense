import React, { useState } from 'react';

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = () => {
    if (amount && category && description) {
      const newExpense = {
        type: 'expense',
        amount: parseFloat(amount),
        category,
        description,
        date: new Date().toISOString()
      };
      onAdd(newExpense); // Add to parent state
      setAmount('');
      setCategory('');
      setDescription('');
    }
  };

  return (
    <div className="card">
      <h3>Add Expense</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      ></textarea>
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
}

export default ExpenseForm;
