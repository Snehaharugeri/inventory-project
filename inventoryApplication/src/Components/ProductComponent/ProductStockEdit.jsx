import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, editProductStock } from '../../Services/ProductService';
import { getUserId } from '../../Services/LoginService';
import { transactionIdGenerate, saveTransaction } from '../../Services/TransactionService';

const ProductStockEdit = () => {

    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        skuId: "",
        purchasePrice: 0.0,
        salesPrice: 0.0,
        reorderLevel: 0.0,
        stock: 0.0,
        vendorId: "",
        status: true,
    });

    const [newId, setNewId] = useState(0);
    const [errors, setErrors] = useState({});
    const [flag, setFlag] = useState("");
    const [userId, setUserId] = useState("");
    const [tdate, setTdate] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [transValue, setTransValue] = useState(null);
    const [warns, setWarns] = useState(null);

    let navigate = useNavigate();
    let param = useParams();

    // ---------------- DATA LOAD ----------------

    useEffect(() => {
        getProductById(param.pid).then(res => {
            setProduct(res.data);
            setFlag(param.no);
        });

        getUserId().then(res => setUserId(res.data));

        transactionIdGenerate(param.no).then(res => setNewId(res.data));
    }, []);

    const returnBack = () => {
        navigate('/product-list');
    };

    const clearAll = () => {
        setQuantity(0);
    };

    // ---------------- MAIN FIXED FUNCTION ----------------

    const stockEdit = (event) => {
        event.preventDefault();

        // ✅ CREATE NEW OBJECT (IMPORTANT FIX)
        const newTransaction = {
            transactionId: newId,
            productId: product.productId,
            quantity: parseFloat(quantity),
            userId: userId,
            transactionDate: tdate
        };

        if (flag === "1") {
            newTransaction.transactionType = "IN";
            newTransaction.rate = product.purchasePrice;
        } else {
            newTransaction.transactionType = "OUT";
            newTransaction.rate = product.salesPrice;
        }

        newTransaction.transactionValue =
            parseFloat(newTransaction.rate) * parseFloat(quantity);

        setTransValue(newTransaction.transactionValue);

        // warning logic
        if (flag === "2") {
            let balance = product.stock - quantity;
            if (balance <= product.reorderLevel) {
                setWarns("⚠ Stock reached Re-Order Level");
            }
        }

        // ✅ SAVE TRANSACTION
        saveTransaction(newTransaction);

        // ✅ UPDATE STOCK
        editProductStock(product, quantity, flag);
    };

    // ---------------- VALIDATION FIX ----------------

    const handleValidation = (event) => {
        event.preventDefault();

        let tempErrors = {};
        let isValid = true;

        if (!quantity.toString().trim()) {
            tempErrors.quantity = "Quantity is required";
            isValid = false;
        }
        else if (parseFloat(quantity) <= 0) {
            tempErrors.quantity = "Quantity cannot be 0 or negative";
            isValid = false;
        }

        if (flag === "2" && parseFloat(quantity) > product.stock) {
            tempErrors.quantity = "Cannot issue more than stock";
            isValid = false;
        }

        setErrors(tempErrors);

        if (isValid) {
            stockEdit(event);
        }
    };

    return (
  <div className="form-page">

    <div className="form-card">

      <h2 className="form-title">
        {flag === "1" ? "Stock Purchase Entry" : "Stock Issue Entry"}
      </h2>

      {/* PRODUCT DETAILS */}
      <div className="info-box">
        <p><b>Product Id:</b> {product.productId}</p>
        <p><b>SKU:</b> {product.skuId}</p>
        <p><b>Name:</b> {product.productName}</p>

        <p>
          <b>{flag === "1" ? "Purchase Price" : "Sales Price"}:</b>{" "}
          ₹{flag === "1" ? product.purchasePrice : product.salesPrice}
        </p>

        <p><b>Stock:</b> {product.stock}</p>
      </div>

      <form>

        <div className="form-group">
          <label>Transaction ID</label>
          <input value={newId} readOnly />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={tdate}
            onChange={(e) => setTdate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {errors.quantity && (
            <p className="error-text">{errors.quantity}</p>
          )}
        </div>

        {transValue !== null && (
          <p className="transaction-value">
            Transaction Value: ₹{transValue}
          </p>
        )}

        {warns && (
          <p className="warning-text">{warns}</p>
        )}

        <div className="form-buttons">

          <button className="btn-save" onClick={handleValidation}>
            Save
          </button>

          <button className="btn-reset" onClick={clearAll}>
            Reset
          </button>

          <button className="btn-return" onClick={returnBack}>
            Return
          </button>

        </div>

      </form>

    </div>

  </div>
);
};

export default ProductStockEdit;