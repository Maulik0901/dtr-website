import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import "./login.css";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  console.log(process.env.REACT_APP_API_URL)
  const [field, setField] = useState({
    email: "",
    password: "",
  });
  const [showotp,setShowOtp]=useState(false)
  const [enterOTP,setEnterOTP]=useState(false)
  const [otp,setOtp]=useState("")
  const [mobileNumber,setMobileNumber]=useState("")
  const handleChange = (event) => {
    setField({ ...field, [event.target.name]: event.target.value });
  };
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("-===>",process.env.REACT_APP_API_URL)
    axios
      .post(process.env.REACT_APP_API_URL+"user/login", field)
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("dtrmatrimonyjwt", res.data.data.token);
          props.loginData(res.data.data.token);
          history("/Dashboard")
        } else if (res.data.status === 401) {
          alert(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitOtp = (e) => {

    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL+"user/login-via-otp", {phone:`+91${mobileNumber}`})
      .then((res) => {
        if (res.data.status === "success") {
          setEnterOTP(true)
        } else if (res.data.status === 401) {
          alert(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVerifyOtp = (e) => {

    e.preventDefault();

    axios
      .post(process.env.REACT_APP_API_URL+"user/verify-otp", {otp:otp,phone:`+91${mobileNumber}`})
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("dtrmatrimonyjwt", res.data.data.token);
          props.loginData(res.data.data.token);
        } else if (res.data.status === 401) {
          alert(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  
  const [show, setShow] = useState(false)
  return (
    <div className="login-box">
      {showotp?<div className="login-card">
        {enterOTP?<form onClick={handleVerifyOtp}>

          <label>Enter OTP</label>
          <input
            placeholder="Mobile Number"
            name="otp"
            type={"text"}
            onChange={(e)=>{setOtp(e.target.value)}}
            value={otp}
          />
         

       
          <button type="submit" className="primary">
            Submit
          </button>
        </form>: <form onSubmit={handleSubmitOtp}>
          <label>Mobile Number</label>
          <div style={{display:'flex',flexDirection:"row",justifyContent:'space-between'}}>
          <input
            placeholder="+91"
            style={{flex:0.2,maxWidth:'50px'}}
            type={"text"}
            maxLength={3}
             readOnly
            value={"+91"}
          />
          <input
            placeholder="Mobile Number"
            name="phone"
            type={"tel"}
            style={{flex:0.85}}
            maxLength={10}
            onChange={(e)=>{setMobileNumber(e.target.value)}}
            value={mobileNumber}
          />
          </div>
         

       
          <button type="submit" className="primary">
            Send OTP
          </button>
          <h5
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            OR
          </h5>
          <button onClick={()=>{setShowOtp(false)}} className="primary">
            Login via password
          </button>
        </form>}
        </div>:  <div className="login-card">
        {/* <img src={logo} className='logo' /> */}
        <FaUserShield size={80} className="login-logo" />
        <h3>Welcome back! Please Login</h3>
        <form onSubmit={handleSubmit}>
          <label>Email ID</label>
          <input
            placeholder="Mobile No. / Email ID"
            name="email"
            onChange={handleChange}
            value={field.email}
          />
          <lable>Password</lable>
          <input
            autoComplete="off"
            placeholder="password"
            type={"password"}
            name="password"
            onChange={handleChange}
            value={field.password}
          />

          <div className="extra-info">
            <span>
              <input type={"checkbox"} defaultChecked />
              Stay Logged in
            </span>
            <span onClick={() => setShow(true)}>Forgot Password?</span>
          </div>
          <button type="submit" className="primary">
            Login
          </button>
          <h5
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            OR
          </h5>
          <button onClick={()=>{setShowOtp(true)}} className="primary">
            Login via OTP
          </button>
          <div className="extra-info">
            <a href="/signup" className="signup-text">
              New to DTR Matrimony!! Sign Up Now
            </a>
          </div>
        </form>
        {show && <ForgotPassword setShow={setShow}/>}
      </div>}
    
    </div>
  );
};
export default Login;
