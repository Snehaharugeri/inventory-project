import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { displayAllProducts, deleteAProduct } from '../../Services/ProductService';
import { getRole } from '../../Services/LoginService';
import '../../DisplayView.css';

const ProductReport = () => {

  const [products, setProducts] = useState([]);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    getRole().then(res => setRole(res.data));
    displayAllProducts().then(res => setProducts(res.data));
  }, []);

  const removeProduct = (id) => {
    deleteAProduct(id).then(() => {
      setProducts(products.filter(p => p.productId !== id));
    });
  };

  const returnBack = () => {
    role === "Admin" ? navigate('/admin-menu') : navigate('/manager-menu');
  };

  // 🔍 SEARCH FILTER
  const filteredProducts = products.filter(p =>
    p.productName.toLowerCase().includes(search.toLowerCase()) ||
    p.skuId.toLowerCase().includes(search.toLowerCase()) ||
    p.vendorId.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="product-list-container text-center">

      <h2 className="product-list-title">
        {role === 'Admin' ? 'Admin Product List' : 'Manager Product List'}
      </h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name, SKU, vendor..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">

        <table className="custom-table table table-striped table-bordered">

          <thead>
            <tr>
              <th>Product Id</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Vendor Id</th>
              <th>Purchase Price</th>
              <th>Sales Price</th>
              <th>Stock</th>
              <th>Reorder Level</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              filteredProducts.map((product) => {

                return (
                  <tr key={product.productId}>

                    <td>{product.productId}</td>
                    <td>{product.skuId}</td>
                    <td>{product.productName}</td>
                    <td>{product.vendorId}</td>
                    <td>{product.purchasePrice}</td>
                    <td>{product.salesPrice}</td>
                    <td>{product.stock}</td>
                    <td>{product.reorderLevel}</td>

                    <td>
                      {
                        product.status
                          ? <span className="status-blue">Permitted</span>
                          : <span className="status-red">Reorder</span>
                      }
                    </td>

                    <td>
                      <div className="action-buttons">

                        <Link to={`/edit-stock/${product.productId}/2`}>
  <button
    className="btn btn-warning"
    style={{ marginLeft: "10px" }}
    disabled={!product.status}
  >
    Issue
  </button>
</Link>

                        <Link to={`/edit-stock/${product.productId}/1`}>
                          <button className="purchase-btn">Purchase</button>
                        </Link>

                        <Link to={`/edit-price/${product.productId}`}>
                          <button className="price-btn">Price Update</button>
                        </Link>

                        <button
                          onClick={() => removeProduct(product.productId)}
                          className="delete-btn"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            }
          </tbody>

        </table>

        {/* 🔙 RETURN BUTTON */}
        <div className="return-wrapper">
          <button onClick={returnBack} className="return-btn-modern">
            Return
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductReport;