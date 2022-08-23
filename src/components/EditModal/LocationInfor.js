import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { countryList } from "../myprofile/Country";
import { indianState } from "../myprofile/states";
export default function LocationInfo(props) {
  const locationData = props.userData?.contactDetails[0];
  const [country, setCountry] = useState(locationData?.country);
  const [state, setState] = useState(locationData?.state);
  const [city, setCity] = useState(locationData?.city);
  const [zipCode, setZipCode] = useState(locationData?.zipCode);
  // const [phoneNumber, setPhoneNumber] = useState(locationData?.phoneNumber);
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [dataLoading, setDataLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true)
    setUpdateMsg("")
    if (props?.admin) {
      axios
      .post(
        process.env.REACT_APP_API_URL+"admin/edituser_by_admin",
        {
          contactDetails: {
            country,
            state,
            city,
            zipCode,
            // phoneNumber,
          },
          id: props?.userData?._id
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
        setUpdateMsg("Location info updated!");
        setDataLoading(false)
      })
      .catch((err) => {
        props.setUpdateMsg("Something went wrong");
        console.log(err)});
        setDataLoading(false)
    }
    else{
      axios
      .post(
        process.env.REACT_APP_API_URL+"user/edituser",
        {
          contactDetails: {
            country,
            state,
            city,
            zipCode,
            // phoneNumber,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo}`,
          },
        }
      )
      .then((data) => {
        props.getUserInfo();
        props.setShow(false);
      })
      .catch((err) => console.log(err));
    }
  };
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Location Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
        <p style={{ textAlign: "center", fontSize: "18px" }}>{updateMsg}</p>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Country:</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            >
              {" "}
              <option>select</option>
              {countryList?.map((data) => (
                <option value={data.name}>{data.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>State:</Form.Label>
            {country === "India" ? (
              <Form.Select
                type="text"
                onChange={(e) => setState(e.target.value)}
                value={state}
              >
                {" "}
                <option>Select</option>
                {indianState.states.map((data) => (
                  <option value={data.state}>{data.state}</option>
                ))}
              </Form.Select>
            ) : (
              <Form.Control
                type="text"
                onChange={(e) => setState(e.target.value)}
                value={state}
              ></Form.Control>
            )}
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            {" "}
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            {" "}
            <Form.Label>Zip Code:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
            />
          </Form.Group>
          {/* <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </Form.Group> */}

          <Button variant="primary" type="submit" disabled={dataLoading}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
