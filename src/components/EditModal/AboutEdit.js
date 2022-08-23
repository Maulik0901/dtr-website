import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
export default function AboutEdit({ show, setShow, userData, admin, dataReload, getUserInfo }) {
  const [about, setAbout] = useState();
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [dataLoading, setDataLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true)
    setUpdateMsg("")
    if (admin) {
      axios
      .post(
        process.env.REACT_APP_API_URL+"admin/edituser_by_admin",
        {
          BasicsAndLifestyle: { about: about },
          id: userData?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${adminInfo}`,
          },
        }
      )
      .then((data) => {
        dataReload();
        setUpdateMsg("About info updated!");
        setDataLoading(false)
      })
      .catch((err) => {
        setUpdateMsg("Something went wrong");
        console.log(err)});
        setDataLoading(false)
    }
    else {
      axios
      .post(
        process.env.REACT_APP_API_URL+"user/edituser",
        {
          BasicsAndLifestyle: { about: about },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo}`,
          },
        }
      )
      .then((data) => {
        setShow(false);
        getUserInfo();
      })
      .catch((err) => console.log(err));
    }
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit About Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
        <p style={{ textAlign: "center", fontSize: "18px" }}>{updateMsg}</p>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Text here:</Form.Label>
          </Form.Group>
            <div><textarea style={{
                width: "100%",
                padding: "5px",
                borderRadius: "10px"
            }}
              multiple
              type="text"
              onChange={(e) => setAbout(e.target.value)}
              defaultValue={userData && userData?.BasicsAndLifestyle[0]?.about}
            /></div>

          <Button variant="primary" type="submit" disabled={dataLoading}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
