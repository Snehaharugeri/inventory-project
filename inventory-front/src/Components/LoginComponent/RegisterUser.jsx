import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerNewUser} from "../../Services/LoginService";
import '../../DisplayView.css';

const RegisterUser = () => {
   
   let navigate = useNavigate();

   const [errors,setErrors] = useState({});

   const [inventoryUser,setInventoryUser] = useState({
      username:"",
      password:"",
      personalName:"",
      email:"",
      role:"",
   });

   const [flag,setFlag] = useState(false);
   const [confirmPassword,setConfirmPassword] = useState("");

   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   useEffect(() => {
      setFlag(false);
   }, []);

   const createNewUser = (event) => {

      event.preventDefault();

      if(inventoryUser.password === confirmPassword){

         registerNewUser(inventoryUser).then((response)=>{
            setFlag(true);
         });
      }
   };

   const onChangeHandler = (event) =>{
      event.persist();
      setFlag(false);

      const name = event.target.name;
      const value = event.target.value;

      setInventoryUser(values =>({...values, [name]: value }));
   };

   const handleValidation = (event) => {

      event.preventDefault();

      let tempErrors = {};
      let isValid = true;

      if (!inventoryUser.username.trim()) {
         tempErrors.username = "User Name is required";
         isValid = false;
      }

      if (!inventoryUser.password.trim()) {
         tempErrors.password = "Password is required";
         isValid = false;
      }
      else if (inventoryUser.password.length < 5 || inventoryUser.password.length > 10) {
         tempErrors.password="Password must be 5-10 characters long";
         isValid = false;
      }
      else if (inventoryUser.password !== confirmPassword) {
         tempErrors.password="Both passwords must match";
         isValid = false;
      }

      if (!inventoryUser.personalName.trim()) {
         tempErrors.personalName = "Personal Name is required";
         isValid = false;
      }

      if (!inventoryUser.email.trim()) {
         tempErrors.email = "Email is required";
         isValid = false;
      }
      else if(!emailPattern.test(inventoryUser.email)){
         tempErrors.email = "Invalid Email Format";
         isValid = false;
      }

      if (!inventoryUser.role.trim()) {
         tempErrors.role = "Role is required";
         isValid = false;
      }

      if (!confirmPassword.trim()) {
         tempErrors.confirmPassword = "Confirm Password is required";
         isValid = false;
      }

      setErrors(tempErrors);

      if (isValid) {
         createNewUser(event);
      }
   };

   const returnBack = () => {
      navigate('/');
   };

return(

<div className="login-background">

   <div className="login-card">

      <h2 className="title">Inventory Management System</h2>
      <h4 className="subtitle">New User Registration</h4>

      <form>

         <div className="form-group">
            <label>User Name</label>
            <input
               type="text"
               name="username"
               placeholder="Enter Username"
               className="form-control"
               value={inventoryUser.username}
               onChange={onChangeHandler}
            />
            {errors.username && <p className="error">{errors.username}</p>}
         </div>

         <div className="form-group">
            <label>Password</label>
            <input
               type="password"
               name="password"
               placeholder="Enter Password"
               className="form-control"
               value={inventoryUser.password}
               onChange={onChangeHandler}
            />
            {errors.password && <p className="error">{errors.password}</p>}
         </div>

         <div className="form-group">
            <label>Confirm Password</label>
            <input
               type="password"
               name="confirmPassword"
               placeholder="Retype Password"
               className="form-control"
               value={confirmPassword}
               onChange={(event)=>setConfirmPassword(event.target.value)}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
         </div>

         <div className="form-group">
            <label>Personal Name</label>
            <input
               type="text"
               name="personalName"
               placeholder="Enter Full Name"
               className="form-control"
               value={inventoryUser.personalName}
               onChange={onChangeHandler}
            />
            {errors.personalName && <p className="error">{errors.personalName}</p>}
         </div>

         <div className="form-group">
            <label>Email</label>
            <input
               type="email"
               name="email"
               placeholder="Enter Email"
               className="form-control"
               value={inventoryUser.email}
               onChange={onChangeHandler}
            />
            {errors.email && <p className="error">{errors.email}</p>}
         </div>

         <div className="form-group">
            <label>Select Role</label>
            <input
               list="types"
               name="role"
               className="form-control"
               value={inventoryUser.role}
               onChange={onChangeHandler}
            />

            <datalist id="types">
               <option value="Manager"/>
               <option value="Vendor"/>
               <option value="Admin"/>
            </datalist>

            {errors.role && <p className="error">{errors.role}</p>}
         </div>

         <button
            className="login-btn"
            onClick={handleValidation}
         >
            Register
         </button>

      </form>

      {flag &&
         <p className="success">
            User Created Successfully
            <br/>
            <button
               className="register-btn"
               onClick={returnBack}
            >
               Go To Login
            </button>
         </p>
      }

   </div>

</div>

);
}

export default RegisterUser;