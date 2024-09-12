import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

import useDebounce from '../customHook/useDebounce';
export const TransactionContext = createContext();


export const TransactionProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const debouncedSearchTerm = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchTransactions = async () => {
        
        const getTransactions =async()=>{
            const response = await axios.get(`http://localhost:8080/search/${searchQuery}`);
            setTransactions(response.data);
          }
            
        if(searchQuery.length >0){
            getTransactions();
        const Sortedtransactions = [...transactions].sort((a, b) => {
            const dateA = new Date(a.date); 
            const dateB = new Date(b.date); 
            return dateB - dateA; 
          });
      setFilteredTransactions(Sortedtransactions);
      console.log(Sortedtransactions);
    }
    };
    fetchTransactions();
  }, [searchQuery]);

//   useEffect(() => {
//     if (searchQuery === '') {
//       setFilteredTransactions(transactions); 
//     } else {
//       setFilteredTransactions(
//         transactions.filter(transaction =>
//           transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     }
//   }, [searchQuery, transactions]);

  return (
    <TransactionContext.Provider value={{ searchQuery, setSearchQuery, filteredTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
