import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import dashboardImage from "../../assets/Dashboard.png";

const AdminMenu = () => {

  let navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (

    <div className="admin-background">

      {/* Header */}
      <div className="admin-header">
        <h2>SmartShelfX – Inventory Management System</h2>
        <h4>Admin Dashboard</h4>
      </div>

      {/* Navbar */}
      <Navbar expand="lg" className="admin-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            {/* SKU */}
            <NavDropdown title="SKU">
              <NavDropdown.Item onClick={() => navigate("/sku-list")}>
                SKU List
              </NavDropdown.Item>

              <NavDropdown.Item onClick={() => navigate("/sku-entry")}>
                SKU Addition
              </NavDropdown.Item>
            </NavDropdown>

            {/* PRODUCT */}
            <NavDropdown title="Product">

  <NavDropdown.Item onClick={() => navigate("/product-entry")}>
    Product Addition
  </NavDropdown.Item>

  <NavDropdown.Item onClick={() => navigate("/product-list")}>
    Product List
  </NavDropdown.Item>

  <NavDropdown.Divider />

  {/* ✅ BOTH OPTIONS ADDED BACK */}
  <NavDropdown.Item onClick={() => navigate("/product-pie")}>
    All Products Analysis
  </NavDropdown.Item>

  <NavDropdown.Item onClick={() => navigate("/product-demand")}>
    Single Product Demand Analysis
  </NavDropdown.Item>

</NavDropdown>

            {/* TRANSACTION */}
            <NavDropdown title="Transaction Report">

              <NavDropdown.Item onClick={() => navigate("/transactions/OUT")}>
                Out Transaction Report
              </NavDropdown.Item>

              <NavDropdown.Item onClick={() => navigate("/transactions/IN")}>
                In Transaction Report
              </NavDropdown.Item>

            </NavDropdown>

            <Nav.Link onClick={() => navigate("/user-list")}>
  Show User Details
</Nav.Link>

          </Nav>

          {/* LOGOUT */}
          <Nav>
            <Nav.Link
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>

      {/* Dashboard Body */}
      <div className="admin-dashboard-card">

        <div className="admin-left">
          <h3>Welcome Admin 👋</h3>

          <p className="admin-description">
            SmartShelfX helps administrators manage inventory,
            track product demand and monitor transactions efficiently
            using an AI-powered smart inventory system.
          </p>
        </div>

        <div className="admin-right">
          <img src={dashboardImage} alt="Inventory Dashboard" />
        </div>

      </div>

    </div>
  );
};

export default AdminMenu;