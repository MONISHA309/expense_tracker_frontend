import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

function AddTransaction() {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense'); // Default transaction type is expense
    const { addTransaction } = useContext(GlobalContext);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://expense-tracker-website.onrender.com/get-expenses");
            if (response.data && response.data.length > 0) {
                setCategory(response.data[0].category || '');
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 10000000),
            category,
            amount: type === 'income' ? Math.abs(Number(amount)) : -Math.abs(Number(amount)),
            type
        };

        addTransaction(newTransaction);
        setCategory('');
        setAmount('');
        setType('expense'); // Reset transaction type to expense after submission

        try {
            await axios.post("https://expense-tracker-website.onrender.com/add-expense", newTransaction);
            console.log("Transaction added successfully");
        } catch (err) {
            console.error('Error adding transaction:', err);
        }
    };

    return (
        <div className="transaction-container">
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="category">Text:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        id="category"
                        placeholder="Enter text..."
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        id="amount"
                        placeholder="Enter amount..."
                    />
                </div>
                <div className="form-control">
                    <label style={{ textAlign: 'left' }}>Transaction Type:</label>
                    <div>
                        <input
                            type="radio"
                            id="expense"
                            name="type"
                            value="expense"
                            checked={type === 'expense'}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <label htmlFor="expense">Expense</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="income"
                            name="type"
                            value="income"
                            checked={type === 'income'}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <label htmlFor="income">Income</label>
                    </div>
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </div>
    );
}

export default AddTransaction;
