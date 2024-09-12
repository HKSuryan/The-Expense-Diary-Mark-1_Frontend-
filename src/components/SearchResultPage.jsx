import React, { useContext } from 'react';
import '../css/SearchResultPage.css';
import { TransactionContext } from '../context/TransactionContext';

const SearchResultsPage = () => {
    const { filteredTransactions, searchQuery } = useContext(TransactionContext);
  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      <div className="results-grid">
        {filteredTransactions.map((transaction, index) => (
          <div className={`result-card ${transaction.direction === 'in' ? 'in' : 'out'}`} key={index}>
            <h3 className="result-name">{transaction.name}</h3>
            <p className="result-amount"><strong>Amount:</strong> {transaction.amount}</p>
            <p className="result-mode"><strong>Payment Mode:</strong> {transaction.paymentMode}</p>
            <p className="result-date"><strong>Date:</strong> {transaction.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
