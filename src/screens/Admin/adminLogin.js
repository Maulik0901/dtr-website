import React, { Component }  from 'react';
import axios from "axios";
import { useState } from "react";
const AdminLogin = ({loginData}) => {
  const [errMsg, setErrMsg] = useState("")
  const [field, setField] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setField({ ...field, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrMsg(" ")
    axios
      .post(process.env.REACT_APP_API_URL+"admin/admin_login", field)
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("dtrmatrimonyjwtadmin", res.data.data.token);
          loginData(res.data.data.token);
          console.log(res.data);
        } else if (res.data.status === 401) {
          // alert(res.data.msg);
          setErrMsg(res.data.msg)
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-box">
      <div className="login-card">
        <h4>Admin Login</h4>
        <form onSubmit={handleSubmit}>
          <label>Email ID</label>
          <input
            placeholder="Mobile No. / Email ID"
            name="email"
            onChange={handleChange}
            value={field?.email}
          />
          <lable>Password</lable>
          <input
            autoComplete="off"
            placeholder="password"
            type={"password"}
            name="password"
            onChange={handleChange}
            value={field?.password}
          />
          <button type="submit" className="primary">
            Login
          </button>
          <p style={{textAlign: 'center'}}>{errMsg}</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
