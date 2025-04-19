import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    });
    return unsubscribe;
  }, []);

  const addNewTransaction = (transaction) => {
    const { date } = transaction;
    // Check if the date is valid
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

    // Export the filtered data to Excel (Ensure export function does not clear the state)
    exportToExcel(filtered);

    // Data should not be cleared after export
    alert('Excel downloaded!');
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <div className="login-container">
          <h2>Sign in to Finance Tracker</h2>
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
      ) : (
        <>
          <DarkModeToggle />
          <h1>Finance Tracker</h1>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={handleLogout}>Logout</button>
          <DateFilter date={filterDate} onChange={setFilterDate} />
          <IncomeForm onAdd={addNewTransaction} />
          <ExpenseForm onAdd={addNewTransaction} />
          <SavingsForm savings={savings} setSavings={setSavings} />
          <ToDoList />
          <Summary transactions={filtered} />
          <PieChart transactions={filtered} />
          <NotificationManager />
          <button onClick={handleExport}>Export to Excel</button>
        </>
      )}
    </div>
  );
};

export default App;
