import React, { Component }  from 'react';
import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
const AdminBlockProfile = ({ id, name, dataReload, setDataLoading }) => {
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [show, setShow] = useState(false);
  const handleBlock = (id) => {
    setDataLoading(true);
    axios
      .post(
        process.env.REACT_APP_API_URL+"admin/blocked_account_by_admin",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${adminInfo}`,
          },
        }
      )
      .then((data) => {
        setShow(false);
        dataReload();
        setDataLoading(false);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <button
        className="bnr-btn mx-2 font-14 btn btn-primary"
        onClick={() => setShow(true)}
      >
        Block
      </button>
      <Modal show={show}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Block "{name}"</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleBlock(id)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default AdminBlockProfile;
