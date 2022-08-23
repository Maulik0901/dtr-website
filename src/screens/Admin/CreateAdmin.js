import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
export default function CreateAdmin() {
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [dataLoading, setDataLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [show, setShow] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true);
    setErrMsg("");
    axios
      .post(process.env.REACT_APP_API_URL+"admin/create_admin", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${adminInfo}`,
        },
      })
      .then((res) => {
        setErrMsg({
          msg: res.data?.message,
          name: res.data?.name,
          email: res.data?.email,
          password: res.data?.password,
        });
        setDataLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setErrMsg({ msg: "Something went wrong" });
        console.log(err);
      });
    setDataLoading(false);
  };
  return (
    <>
      <button
        className="bnr-btn mx-2 font-14 btn btn-primary"
        onClick={() => setShow(true)}
        style={{marginTop: '-5px !important'}}
      >
        Create Admin
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <div className="login-box" style={{ width: "100%" }}>
          <div className="login-card">
            {/* <img src={logo} className='logo' /> */}
            <FaUserShield size={40} className="login-logo" />
            <h3>Create Admin Profile</h3>
            <form onSubmit={handleSubmit}>
              <label>Email ID</label>
              <input
                required
                placeholder="Email ID"
                name="email"
                onChange={handleChange}
              />
              <label>Name</label>
              <input
                required
                placeholder="Username"
                onChange={handleChange}
                name="name"
                type="text"
              />
              <lable>Password</lable>
              <input
                required
                placeholder="Password"
                type={"password"}
                onChange={handleChange}
                name="password"
              />
              <button type="submit" className="primary" disabled={dataLoading}>
                Submit
              </button>
              <button type="submit" className="primary mb-3" onClick={() => setShow(false)}>
                Cancel
              </button>
            </form>
            <h4>{errMsg?.msg}</h4>
            <h4>{errMsg?.name && "Name: " + errMsg.name}</h4>
            <h4>{errMsg?.email && "Email: " + errMsg?.email}</h4>
            <h4>{errMsg?.password && "Password: " + errMsg?.password}</h4>
          </div>
        </div>
      </Modal>
    </>
  );
}
