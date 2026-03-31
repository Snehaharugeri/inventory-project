import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import managerImage from "../../assets/ManagerDashboard.png";

const ManagerMenu = () => {

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

      {/* HEADER */}
      <div className="admin-header">
        <h2>SmartShelfX – Inventory Management System</h2>
        <h4>Manager Dashboard</h4>
      </div>

      {/* NAVBAR */}
      <Navbar expand="lg" className="admin-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            {/* SKU */}
            <NavDropdown title="SKU">
              <NavDropdown.Item onClick={() => navigate("/sku-list")}>
                SKU List
              </NavDropdown.Item>
            </NavDropdown>

            {/* PRODUCT */}
            <NavDropdown title="Product">

              <NavDropdown.Item onClick={() => navigate("/product-list")}>
                Product List
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={() => navigate("/product-pie")}>
                Product Analysis
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

            {/* USERS */}
            <Nav.Link onClick={() => navigate("/user-list")}>
              Show User Details
            </Nav.Link>

          </Nav>

          {/* LOGOUT */}
          <Nav>
            <Nav.Link onClick={handleLogout} className="logout-btn">
              Logout
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>

      </Navbar>

      {/* DASHBOARD CONTENT */}
      <div className="admin-dashboard-card">

        {/* LEFT */}
        <div className="admin-left">

          <h3>Welcome Manager 👋</h3>

          <p className="admin-description">
            SmartShelfX allows managers to monitor product inventory,
            track product demand and analyze stock status efficiently
            using a smart inventory management system.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="admin-right">

          <img
            src={managerImage}
            alt="Manager Dashboard"
          />

        </div>

      </div>

    </div>

  );
};

export default ManagerMenu;