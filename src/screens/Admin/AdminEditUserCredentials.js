import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
export default function AdminEditUserCredentials({
  show,
  setShow,
  userData,
  dataReload,
}) {
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changePassword = (e) => {
    e.preventDefault()
    setErrMsg("");
    axios
      .post(
        process.env.REACT_APP_API_URL+`admin/admin-dtr-rgvv734t5874rwrws-user-dvdt52378432vh-passwordsssf872trsdfgvdvg27tr3/${userData?._id}`,
        {
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${adminInfo}`,
          },
        }
      )
      .then((res) => {
        dataReload()
        setErrMsg(res.data.message);
      })
      .catch((err) => {
        setErrMsg(err.data.message);
      });
  };
  const changeEmail = (e) => {
      e.preventDefault()
    setErrMsg("");
    axios
      .post(
        process.env.REACT_APP_API_URL+`admin/admin-dtr-rgvv734t5874rwrws-user-dvdt52378432vh-emaillllf872trsdfgvdvg27tr3/${userData?._id}`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${adminInfo}`,
          },
        }
      )
      .then((res) => {
          dataReload()
          console.log(res.data);
        setErrMsg(res.data.message);
      })
      .catch((err) => {
        setErrMsg(err.data.message);
      });
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{userData?.name}'s Credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Current Email</Form.Label>
            <Form.Control type="text" defaultValue={userData?.email} disabled />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Change Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
            />
          </Form.Group>
          <Button onClick={changeEmail} variant="primary" type="submit" disabled={!email}>
            Submit
          </Button>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Change Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
            />
          </Form.Group>
          <p>{errMsg}</p>
          <Button onClick={changePassword} variant="primary" type="submit" disabled={!password}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
