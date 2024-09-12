import React, { useContext, useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import TransactionBarChart from './TransactionBarChart';
import TransactionInOrOut from './TransactionInOrOut';
import axios from "axios";
import SearchResultsPage from './SearchResultPage';
import { TransactionContext } from '../context/TransactionContext';

const ttransactions = [
  {
    "amount": "Rs 80.00",
    "paymentMode": "UPI",
    "name": "Ramesh",
    "direction":"out",
    "date": "06-09-2024 13:41:23"
  },
  {
    "amount": "Rs 150.00",
    "paymentMode": "Card",
    "name": "Suresh",
    "direction":"in",
    "date": "05-09-2024 10:21:34"
  },
  {
    "amount": "Rs 300.00",
    "paymentMode": "UPI",
    "name": "Mahesh",
    "direction":"out",
    "date": "10-09-2024 15:10:55"
  },
  {
    "amount": "Rs 800.00",
    "paymentMode": "UPI",
    "name": "Ramesh",
    "direction":"in",
    "date": "09-09-2024 13:41:23"
  },

];


const TransactionDashboard = () => {
  const { filteredTransactions, searchQuery } = useContext(TransactionContext);
  const [transaction,setTransaction] = useState([]);

  useEffect(()=>{
    const getTransactions =async()=>{
      const response = await axios.get("http://localhost:8080/all");
      setTransaction(response.data);
    }
    getTransactions();
  },[])

  const transactions = [...ttransactions].sort((a, b) => {
    const dateA = new Date(a.date); 
    const dateB = new Date(b.date); 
    return dateB - dateA; 
  });

  return (

    <div>
    {filteredTransactions.length === 0 ? (
      <div>
        <SummaryCard transactions={transactions} />
        <TransactionInOrOut transactions={transactions} />
        <TransactionBarChart transactions={transactions} />
      </div>
    ) : (
      <div>
        <SearchResultsPage />
      </div>
    )}
  </div>
    

  );
}

export default TransactionDashboard;
