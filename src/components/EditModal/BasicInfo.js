import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function BasicInfo({
  show,
  setShow,
  userData,
  getUserInfo,
  admin,
  dataReload,
}) {
  const alldata = userData?.BasicsAndLifestyle[0];
  const [Age, setAge] = useState(alldata?.Age);
  const [DateofBirth, setDOB] = useState(alldata?.DateofBirth);
  const [MaritalStatus, setMaritalStatus] = useState(alldata?.MaritalStatus);
  const [Height, setHeight] = useState(alldata?.Height);
  const [Grewupin, setGrowUpIn] = useState(userData?.contactDetails[0]?.city);
  const [PersonalValues, setPersonValue] = useState(alldata?.PersonalValues);
  const [SunSign, setSunSign] = useState(alldata?.SunSign);
  const [Stars , setStars] = useState(alldata?.Stars);
  const [Laknam, setLaknam] = useState(alldata?.Laknam);
  const [Irupu , setIrupu] = useState(alldata?.Irupu);
  const [BloodGroup, setBloodGroup] = useState(alldata?.BloodGroup);
  const [Heal, setHeal] = useState();
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [dataLoading, setDataLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true);
    setUpdateMsg("");
    if (admin) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"admin/edituser_by_admin",
          {
            BasicsAndLifestyle: {
              Age,
              DateofBirth,
              MaritalStatus,
              Height,
              Grewupin,
              PersonalValues,
              SunSign,
              Stars,
              Laknam,
              Irupu,
              BloodGroup,
              Heal,
            },
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
          setUpdateMsg("Basic info updated!");
          setDataLoading(false);
        })
        .catch((err) => {
          setUpdateMsg("Something went wrong");
          setDataLoading(false);
          console.log(err);
        });
    } else {
      setDataLoading(true);
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            BasicsAndLifestyle: {
              Age,
              DateofBirth,
              MaritalStatus,
              Height,
              Grewupin,
              PersonalValues,
              SunSign,
              Stars,
              Laknam,
              Irupu,
              BloodGroup,
              Heal,
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
          getUserInfo();
          setShow(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Basic Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
          <p style={{ textAlign: "center", fontSize: "18px" }}>{updateMsg}</p>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setAge(e.target.value)}
              value={Age}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => {
                setDOB(e.target.value);
                setAge(2022 - new Date(e.target.value).getFullYear());
              }}
              value={DateofBirth}
            />
          </Form.Group>
          {/* <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDOB(e.target.value)}
              value={DateofBirth}
            />
          </Form.Group> */}
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Marital Status:</Form.Label>
            {/* <Form.Control
              type="text"
            
            /> */}

            <Form.Select
              onChange={(e) => setMaritalStatus(e.target.value)}
              value={MaritalStatus}
            >
              <option>select</option>
              <option value={"Never Married"}>Never Married</option>
              <option value={"Seperated"}>Seperated</option>

              <option value={"Divorced"}>Divorced</option>
              <option value={"Widow/Widower"}>Widow/Widower</option>
              <option value={"Awaiting Divorce"}>Awaiting Divorce</option>
              <option value={"Annulled"}>Annulled</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Height:</Form.Label>
            {/* <Form.Control
              type="text"
              onChange={(e) => setHeight(e.target.value)}
              value={Height}
            /> */}

            <Form.Select
              type="text"
              onChange={(e) => setHeight(e.target.value)}
              value={Height}
            >
              <option>select</option>
              {[
                "4.1",
                "4.2",
                "4.3",
                "4.4",
                "4.5",
                "4.6",
                "4.7",
                "4.8",
                "4.9",
                "5.0",
                "5.1",
                "5.2",
                "5.3",
                "5.4",
                "5.5",
                "5.6",
                "5.7",
                "5.8",
                "5.9",
                "6.0",
              ].map((e) => (
                <option value={e}>{e.split(".").join("ft ")}in</option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Grew up in:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setGrowUpIn(e.target.value)}
              value={Grewupin}
            />
          </Form.Group>{" "} */}
          {/* <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Personal Values:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setPersonValue(e.target.value)}
              value={PersonalValues}
            />
          </Form.Group>{" "} */}
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Sun Sign:</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setSunSign(e.target.value)}
              value={SunSign}
            >
              {[
                "Capricorn / Magaram",
                "Aquarius / Kumbam",
                "Pisces /  Meenam",
                "Aries /  Mesam",
                "Taurus /  Rishabam",
                "Gemini / Midhunam",
                "Leo / Simmam",
                "Virgo / Kanni",
                "Libra / Thulam",
                "Scorpio / Viruchigam",
                "Sagittarius / Thanushu",
                "Cancer /  Kadagam",
              ].map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Star:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setStars(e.target.value)}
                  value={Stars}
                >
                  {[
                    "Anusham",
                    "Aswini",
                    "Avitam",
                    "Ayiliyam",
                    "Barani",
                    "Chitirai",
                    "Hastam",
                    "Kettai",
                    "Karthigai",
                    "Magam",
                    "Mirugasersham",
                    "Moolam",
                    "Pooradam",
                    "Pooram",
                    "Pooratathi",
                    "Poosam",
                    "Ponarpoorsam",
                    "Revathi",
                    "Rohini",
                    "Sathayam",
                    "Swathi",
                    "Thiruvathiri",
                    "Thiruvonam",
                    "Uthiram",
                    "Uthiratam",
                    "Uthiratathi",
                    "Visaham"
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Laknam:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setLaknam(e.target.value)}
                  value={Laknam}
                >
                  {[
                    "Dhanus",
                    "Kanni",
                    "Kadagam",
                    "Kumbam",
                    "Maharam",
                    "Meenam",
                    "Masham",
                    "Mithunam",
                    "Rishabam",
                    "Simmam",
                    "Tulam",
                    "Viruchikam",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Thisai Iruppu:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setIrupu(e.target.value)}
                  value={Irupu}
                />
              </Form.Group>
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Blood Group:</Form.Label>
            {/* <Form.Control
              type="text"
              onChange={(e) => setBloodGroup(e.target.value)}
              value={BloodGroup}
            /> */}
            <Form.Select
              type="text"
              onChange={(e) => setBloodGroup(e.target.value)}
              value={BloodGroup}
            >
              <option>select</option>
              {["A+", " A-", "B+", " B-", " O+", " O-", "AB+", "AB-"].map(
                (e) => (
                  <option value={e}>{e}</option>
                )
              )}
            </Form.Select>
          </Form.Group>
          {/* <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Heal</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setHeal(e.target.value)}
              value={Heal}
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
