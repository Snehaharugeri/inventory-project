import React, { useState } from 'react';
import { saveTransaction } from '../../Services/TransactionService';
import { useNavigate } from 'react-router-dom';
import '../../DisplayView.css';

const TransactionEntry = () => {

    const navigate = useNavigate();

    const [transaction, setTransaction] = useState({
        transactionId: '',
        transactionType: '',
        productId: '',
        rate: '',
        quantity: '',
        transactionValue: '',
        userId: '',
        transactionDate: ''
    });

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    const saveData = (e) => {
        e.preventDefault();
        saveTransaction(transaction).then(() => {
            navigate("/transaction-list");
        });
    };

    return (
        <div className="container">
            <h2>Add Transaction</h2>

            <form onSubmit={saveData}>
                <input name="transactionId" placeholder="Transaction ID" onChange={handleChange} />
                <input name="transactionType" placeholder="Type (IN/OUT)" onChange={handleChange} />
                <input name="productId" placeholder="Product ID" onChange={handleChange} />
                <input name="rate" placeholder="Rate" onChange={handleChange} />
                <input name="quantity" placeholder="Quantity" onChange={handleChange} />
                <input name="transactionValue" placeholder="Value" onChange={handleChange} />
                <input name="userId" placeholder="User ID" onChange={handleChange} />
                <input name="transactionDate" type="date" onChange={handleChange} />

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default TransactionEntry;