import React, { useContext, useEffect, useState } from 'react';
import '../css/NavBar.css'; 
import axios from 'axios';
import { TransactionContext } from '../context/TransactionContext';

const NavBar = ({setQueryTransaction}) => {
  // const[transaction,setTransaction] = useState([]);

 
  //   const getTransactions =async()=>{
  //     const response = await axios.get(`http://localhost:8080/search/${query}`);
  //     setTransaction(response.data);
  //   }
    
 

  // const transactions = [...transaction].sort((a, b) => {
  //   const dateA = new Date(a.date); 
  //   const dateB = new Date(b.date); 
  //   return dateB - dateA; 
  // });
  // const[query,setQuery] = useState("0");

  const { searchQuery, setSearchQuery } = useContext(TransactionContext);


  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }
  const onSubmitChange = (e)=>{
    e.preventDefault();
    setSearchQuery(e.target.value);

  }
  console.log(searchQuery);

    return (
      <nav className="navbar">
        <div className="navbar-title">
          <h1>The Expense Diary</h1>
        </div>
        <div className="navbar-search">
          <input type="text" onChange={handleChange} placeholder="Search transactions..." />
          <button type="submit" onClick={onSubmitChange} >Search</button>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
