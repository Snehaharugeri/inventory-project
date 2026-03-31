import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logoutUser } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import vendorImage from "../../assets/VendorDashboard.png";

const VendorMenu = () => {

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
        <h4>Vendor Dashboard</h4>
      </div>


      {/* NAVBAR */}

      <Navbar expand="lg" className="admin-navbar">

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            <Nav.Link onClick={() => navigate("/user-list")}>
  Show User Details
</Nav.Link>

          </Nav>


          <Nav>

            <Nav.Link onClick={handleLogout} className="logout-btn">
              Logout
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Navbar>


      {/* DASHBOARD CONTENT */}

      <div className="admin-dashboard-card">

        {/* LEFT SECTION */}

        <div className="admin-left">

          <h3>Welcome Vendor 👋</h3>

          <p className="admin-description">
            SmartShelfX enables vendors to view their account information,
            manage product supply activities and track inventory
            related updates efficiently.
          </p>

        </div>


        {/* RIGHT SECTION IMAGE */}

        <div className="admin-right">

          <img
            src={vendorImage}
            alt="Vendor Dashboard"
          />

        </div>

      </div>

    </div>

  );

};

export default VendorMenu;