import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { getProductDemand } from "../../Services/ProductService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const SingleProductDemand = () => {

  const [productId, setProductId] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchDemand = () => {
  console.log("Clicked");

  getProductDemand(productId)
    .then((res) => {
      console.log("DATA:", res.data); // 👈 CHECK THIS
      setData(res.data);
    })
    .catch((err) => {
      console.error(err);
      alert("Error fetching data");
    });
};
  const returnBack = () => {
    navigate("/admin-menu");
  };

  return (
    <div className="report-background">

      <div className="report-card">

        <h2 className="report-title">Single Product Demand Analysis</h2>

        {/* INPUT */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="form-control"
          />

          <button className="btn btn-success mt-2" onClick={fetchDemand}>
            Analyze
          </button>
        </div>

        {/* RESULT */}
        {data && data.transactions && (
  <>
    <h4 style={{ marginTop: "20px" }}>
      Total Quantity: {data.totalQuantity}
    </h4>

    <h4>
      Total Value: ₹{data.totalValue}
    </h4>

    {/* 📊 CHART */}
    <div style={{ width: "100%", height: 300, marginTop: "30px" }}>
      <ResponsiveContainer>
        <BarChart data={data.transactions || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="transactionId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="transactionValue" fill="#7a5cff" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* TABLE */}
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.transactions.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.transactionId}</td>
              <td>{t.quantity}</td>
              <td>{t.transactionValue}</td>
              <td>{t.transactionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

        {/* RETURN */}
        <div className="return-section">
          <button className="return-btn" onClick={returnBack}>
            Return
          </button>
        </div>

      </div>

    </div>
  );
};

export default SingleProductDemand;