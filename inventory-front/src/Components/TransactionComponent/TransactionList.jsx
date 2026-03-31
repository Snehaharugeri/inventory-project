import React from 'react';
import {useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import {findTransactionsByType} from '../../Services/TransactionService';
import { getRole} from '../../Services/LoginService';

const TransactionList = () => {

    const [transactions, setTransactions] = useState([]);
    let navigate = useNavigate();
    const param = useParams();
    const [flag,setFlag]=useState("");
    const [role,setRole]=useState("");

    const setTransactionData=()=>{
      findTransactionsByType(param.pid).then( response => {
         setTransactions(response.data);
         setFlag(param.pid);
         });
     }
 
    useEffect(() => {
      getRole().then( response => {
        setRole(response.data);
       });
     setTransactionData();
    }, []);
 
    const returnBack=()=>{
      if(role==="Admin")
        navigate('/admin-menu');
      else if(role==="Manager")
        navigate('/manager-menu');
    }   

    return (
  <div className="report-background">

    <div className="report-card">

      <h2 className="text-center">Stock Purchase Report</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Product Id, User..."
          className="form-control"
        />
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Product Id</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Transaction Value</th>
            <th>User Id</th>
            <th>Transaction Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.transactionId}</td>
              <td>{t.productId}</td>
              <td>{t.rate}</td>
              <td>{t.quantity}</td>
              <td>{t.transactionValue}</td>
              <td>{t.userId}</td>
              <td>{t.transactionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="return-wrapper">
        <button className="return-btn-modern" onClick={returnBack}>
          Return
        </button>
      </div>

    </div>

  </div>
);
};

export default TransactionList;