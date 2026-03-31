import React, { useEffect, useState } from 'react';
import { getProductById, editProductPrice } from '../../Services/ProductService';
import { useParams, useNavigate } from "react-router-dom";
import '../../DisplayView.css';

const ProductPriceEdit = () => {

  const param = useParams();
  let navigate = useNavigate();

  const [newPrice, setNewPrice] = useState(0.0);

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

  const [flag, setFlag] = useState(false);

  const setProductData = () => {
    getProductById(param.pid).then((response) => {
      setProduct(response.data);
      setNewPrice(response.data.salesPrice); // auto-fill
    });
  }

  useEffect(() => {
    setFlag(false);
    setProductData();
  }, []);

  const returnBack = () => {
    navigate('/product-list')
  }

  const onChangeHandler = (event) => {
    setNewPrice(event.target.value);
  }

  const updatePrice = (event) => {
    event.preventDefault();

    product.salesPrice = newPrice; // ✅ FIXED

    editProductPrice(product).then(response => {
      setFlag(true);
    })
  }

  return (
    <div className="form-background">

      <div className="form-card">

        {/* ✅ TITLE */}
        <h2 className="form-title">Update Product Price</h2>

        {/* ✅ PRODUCT DETAILS */}
        <div className="product-info">

          <p><strong>Product Id:</strong> {product.productId}</p>
          <p><strong>SKU:</strong> {product.skuId}</p>
          <p><strong>Name:</strong> {product.productName}</p>

          <div className="price-box">
            <p><strong>Current Purchase:</strong> ₹{product.purchasePrice}</p>
            <p><strong>Current Sales:</strong> ₹{product.salesPrice}</p>
          </div>

          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Vendor:</strong> {product.vendorId}</p>

        </div>

        {/* ✅ INPUT */}
        <div className="form-group">

          <label className="input-label">Enter New Sales Price</label>

          <input
            type="number"
            placeholder="Enter new price"
            className="form-input-modern"
            value={newPrice}
            onChange={onChangeHandler}
          />

        </div>

        {/* ✅ SUCCESS MESSAGE */}
        {flag && <p className="success-msg">✅ Price Updated Successfully</p>}

        {/* ✅ BUTTONS */}
        <div className="form-buttons">

          <button className=" save-btn-modern" onClick={updatePrice}>
            Save
          </button>

          <button className="btn return-btn-modern" onClick={returnBack}>
            Return
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductPriceEdit;