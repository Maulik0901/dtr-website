import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import axios from "axios";
import "./signup.css";
import { useNavigate } from "react-router-dom";
export default function Signup(props) {
  const [field, setField] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
  });
  const [gender, setGender] = useState("");
  const history = useNavigate();
  const handleChange = (event) => {
    setField({ ...field, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: field?.email,
      name: field?.name,
      password: field?.password,
      gender: gender,
      phone: `+91${field.phone}`,
      status: 1
    };
    axios
      .post(process.env.REACT_APP_API_URL+"user/register", data)
      .then((res) => {
        if (res.data) {
          if (res.data?.data?.token) {
            localStorage.setItem("dtrmatrimonyjwt", res.data.data.token);
            props.signupData(res.data.data.token);
          } else {
            alert(res.data.err);
          }

          // history("/complete-profile",{ state:{data:res.data.data} })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login-box">
      <div className="login-card">
        {/* <img src={logo} className='logo' /> */}
        <FaUserShield size={40} className="login-logo" />
        <h3>Welcome! Please Register</h3>
        <form onSubmit={handleSubmit}>
          <label>Create profile For</label>

          <select onChange={(e) => setGender(e.target.value)} value={gender}>
            <option>Select</option>
            <option value="Woman">Bride</option>
            <option value="Man">Groom</option>
          </select>
          <label>Mobile Number</label>
        <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
        <input
            required
           readOnly
            value={'+91'}
            style={{width:'50px'}}
          />
          <input
            required
            placeholder="Mobile Number"
            type={"tel"}
            name="phone"
            onChange={handleChange}
            value={field?.phone}
            style={{flex:'.95'}}
            maxLength={10}
          />
        </div>
          <label>Email ID</label>
          <input
            required
            placeholder="Email ID"
            name="email"
            onChange={handleChange}
            value={field?.email}
          />

          <label>Name</label>
          <input
            required
            placeholder="Username"
            onChange={handleChange}
            name="name"
            value={field?.name}
            type="text"
          />
          <lable>Password</lable>
          <input
            required
            placeholder="password"
            type={"password"}
            onChange={handleChange}
            value={field?.password}
            name="password"
          />

          <div className="extra-info">
            <span>
              <input type={"checkbox"} /> I agree to terms & conditions of DTR
              Matrimony
            </span>
            {/* <span>Forgot Password?</span> */}
          </div>
          <button type="submit" className="primary">
            Register Free
          </button>
          <div className="extra-info">
            <a href="/login" className="signup-text">
              Already a member!! Login Now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
