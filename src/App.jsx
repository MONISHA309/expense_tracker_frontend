import React from 'react';
import './App.css';
import Balance from './components/Balance';
import IncomeExp from './components/IncomeExp';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Header from './components/Header';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExp />
        <AddTransaction />
        <TransactionList />
      </div>
    </GlobalProvider>
  );
}

export default App;
