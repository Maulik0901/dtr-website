import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
const ForgotPassword = ({ setShow: showFalse }) => {
  const [formData, setFormData] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //   const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const [show, setShow] = useState(true);
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState("");
  const [otp, setOtp] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleEditSubmit = (e) => {
    setErrMsg("");
    e.preventDefault();
    if (tab === 0) {
      axios
        .get(process.env.REACT_APP_API_URL+`user/get_user_email/${formData.email}`)
        .then((data) => {
          if (data.data) {
            setUser(data.data);
            setTab(1);
          } else setErrMsg("Notihng found with this email");
        })
        .catch((err) => console.log(err));
    }
    if (tab === 1) {
      axios
        .post(process.env.REACT_APP_API_URL+`user/sent_pass_reset_opt/${user._id}`)
        .then((res) => {
          if (res.data) {
            setTab(2);
            setOtp(jwt_decode(res.data))
          }
        })
        .catch((res) => {});
    }
    if (tab === 2 && user._id) {
      if (otp.pRo == formData.otp) {
        setTab(3);
      } else {
        alert("Invalid OTP");
      }
    }
    if (tab === 3 && user._id) {
      axios
        .post(process.env.REACT_APP_API_URL+`user/reset_password/${user._id}`, formData)
        .then((res) => {
          if (res.data.modifiedCount === 1) {
            setErrMsg("Password reset was successful!");
            setDisabled(true)
          }
          else{
            setErrMsg("Something went wrong");
          }
        })
        .catch((res) => {});
    }
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          showFalse(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            {tab === 0 && (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter You Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  onChange={handlechange}
                />
              </Form.Group>
            )}
            {tab === 1 && (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Send Opt to {user.phone}</Form.Label>
              </Form.Group>
            )}
            {tab === 2 && (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter Otp</Form.Label>
                <Form.Control type="text" name="otp" onChange={handlechange} />
              </Form.Group>
            )}
            {tab === 3 && (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control type="text" name="newPassword" onChange={handlechange} />
              </Form.Group>
            )}
            <p>{errMsg}</p>
            <Button variant="primary" type="submit" disabled={disabled}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
