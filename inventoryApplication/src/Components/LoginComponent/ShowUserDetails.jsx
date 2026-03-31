import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";

const ShowUserDetails = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((response) => {
      console.log(response.data); // 🔍 debug
      setUsers(response.data);
    });
  }, []);

  const returnBack = () => {
    navigate("/admin-menu");
  };

  return (
    <div className="report-background">

      <div className="report-card">

        <h2 className="report-title">User Details</h2>

        <div className="table-wrapper">

          <table className="custom-table">

            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {
                users.map((user) => (
                  <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.personalName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              }
            </tbody>

          </table>

        </div>

        <div className="return-section">
          <button className="return-btn" onClick={returnBack}>
            Return
          </button>
        </div>

      </div>

    </div>
  );
};

export default ShowUserDetails;