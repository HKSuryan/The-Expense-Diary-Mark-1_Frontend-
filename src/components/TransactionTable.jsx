import React from 'react';

const TransactionTable = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Payment Mode</th>
          <th>Receiver's Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.Amount}</td>
            <td>{transaction['Payment Mode']}</td>
            <td>{transaction["Receiver's Name"]}</td>
            <td>{transaction.Date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
