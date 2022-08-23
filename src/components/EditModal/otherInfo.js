import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
export default function OtherInfo(props) {
  const [Profilecreatedby, setProfilecreatedby] = useState(
    props?.userData?.otherDetails[0]?.Profilecreatedby
  );
  const [Diet, setDiet] = useState(props?.userData?.otherDetails[0]?.Diet);
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [dataLoading, setDataLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true)
    setUpdateMsg("")
    if (props.admin) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"admin/edituser_by_admin",
          {
            otherDetails: {
              Profilecreatedby,
              Diet,
            },
            id: props?.userData?._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${adminInfo}`,
            },
          }
        )
        .then((data) => {
          props.dataReload();
          setUpdateMsg("Other info updated!");
          setDataLoading(false)
        })
        .catch((err) => {
            props.setUpdateMsg("Something went wrong");
            console.log(err)});
            setDataLoading(false)
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            otherDetails: {
              Profilecreatedby,
              Diet,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then((data) => {})
        .catch((err) => console.log(err));
    }
  };
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Other Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
        <p style={{ textAlign: "center", fontSize: "18px" }}>{updateMsg}</p>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile created by</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setProfilecreatedby(e.target.value)}
              value={Profilecreatedby}
            />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Diet:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDiet(e.target.value)}
              value={Diet}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={dataLoading}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
