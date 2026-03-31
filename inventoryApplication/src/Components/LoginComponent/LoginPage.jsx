import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from "../../Services/LoginService";
import '../../DisplayView.css';
import loginImage from "../../assets/login-image.jpg";

const LoginPage = () => {

   const navigate = useNavigate();

   const [errors, setErrors] = useState({});

   const [loginData, setLoginData] = useState({
      username: "",
      password: ""
   });

   const [flag, setFlag] = useState(true);


   const validateLogin = (e) => {
      e.preventDefault();

      validateUser(loginData.username, loginData.password).then((response) => {

         let role = String(response.data);

         if (role === "Admin")
            navigate("/admin-menu");

         else if (role === "Manager")
            navigate("/manager-menu");

         else if (role === "Vendor")
            navigate("/vendor-menu");

         else
            setFlag(false);
      });
   };


   const onChangeHandler = (event) => {

      setFlag(true);

      const name = event.target.name;
      const value = event.target.value;

      setLoginData(values => ({ ...values, [name]: value }));
   };


   const handleValidation = (event) => {

      event.preventDefault();

      let tempErrors = {};
      let isValid = true;

      if (!loginData.username.trim()) {
         tempErrors.username = "User Name is required";
         isValid = false;
      }

      if (!loginData.password.trim()) {
         tempErrors.password = "Password is required";
         isValid = false;
      }

      setErrors(tempErrors);

      if (isValid) {
         validateLogin(event);
      }
   };


   const registerNewUser = () => {
      navigate('/register');
   };


   return (

      <div className="login-page">

         <div className="login-container">

            {/* LEFT IMAGE */}
            <div className="login-left">
               <img src={loginImage} alt="inventory" />
            </div>


            {/* RIGHT LOGIN PANEL */}
            <div className="login-right">

               <h1 className="app-title">SmartShelfX – AI-Based Inventory Forecast & Auto
Restock</h1>
               <p className="tagline">The Value Of Your Company</p>

               <form onSubmit={handleValidation}>

                  <div className="form-group">

                     <input
                        type="text"
                        name="username"
                        placeholder="Email / Username"
                        className="form-control"
                        value={loginData.username}
                        onChange={onChangeHandler}
                     />

                     {errors.username &&
                        <p className="error">{errors.username}</p>}

                  </div>


                  <div className="form-group">

                     <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        value={loginData.password}
                        onChange={onChangeHandler}
                     />

                     {errors.password &&
                        <p className="error">{errors.password}</p>}

                  </div>


                  <button
                     className="login-btn"
                     type="submit"
                  >
                     Login
                  </button>

               </form>


               {!flag &&
                  <p className="error text-center">
                     Invalid User Id or Password
                  </p>
               }


               <div className="register-section">

                  <p>Don't have an account?</p>

                  <button
                     className="register-btn"
                     onClick={registerNewUser}
                  >
                     Register Here
                  </button>

               </div>

            </div>

         </div>

      </div>

   );
}

export default LoginPage;