import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import TransactionDashboard from './components/TransactionDashBoard';
import { TransactionProvider } from './context/TransactionContext';

function App() {

  return (
    <TransactionProvider>
    <div className="App">
      <NavBar />
      <TransactionDashboard />
    </div></TransactionProvider>
  );
}

export default App;
