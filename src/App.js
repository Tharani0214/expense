import React, { useState } from 'react';

import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import SavingsForm from './components/SavingsForm';
import ToDoList from './components/ToDoList';
import Summary from './components/Summary';
import PieChart from './components/PieChart';
import DateFilter from './components/DataFilter';
import DarkModeToggle from './components/DarkModeToggle';
import NotificationManager from './components/NotificationManager';
import { exportToExcel } from './utils/excelExport';
import './App.css';

const App = () => {
  const [savings, setSavings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState(new Date());

  const addNewTransaction = (transaction) => {
    const { date } = transaction;
    if (!date || isNaN(new Date(date).getTime())) {
      alert('Invalid date. Please provide a valid date for the transaction.');
      return;
    }
    setTransactions([...transactions, transaction]);
  };

  const filtered = transactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return (
      txnDate.getMonth() === filterDate.getMonth() &&
      txnDate.getFullYear() === filterDate.getFullYear()
    );
  });

  const handleExport = () => {
    if (filtered.length === 0) {
      alert('No data to export for the selected month.');
      return;
    }
    exportToExcel(filtered);
    alert('Excel downloaded!');
  };

  return (
    <div className="app-container">
      <DarkModeToggle />
      <h1>Finance Tracker</h1>
      <DateFilter date={filterDate} onChange={setFilterDate} />
      <IncomeForm onAdd={addNewTransaction} />
      <ExpenseForm onAdd={addNewTransaction} />
      <SavingsForm savings={savings} setSavings={setSavings} />
      <ToDoList />
      <Summary transactions={filtered} />
      <PieChart transactions={filtered} />
      <NotificationManager />
      <button onClick={handleExport}>Export to Excel</button>
    </div>
  );
};

export default App;
