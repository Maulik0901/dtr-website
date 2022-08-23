import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { communityData } from "../../communityData";
import Multiselect from "multiselect-react-dropdown";
export default function BasicInfo({
  show,
  setShow,
  getUserInfo,
  userData,
  admin,
  dataReload,
}) {
  const locData = userData?.ReligiousBackground[0];
  const [Religion, setReligion] = useState(locData?.Religion);
  const [Community, setCommunity] = useState(locData?.Community);
  const [SubCommunity, setSubCommunity] = useState(locData?.SubCommunity);
  const [MotherTongue, setMotherTongue] = useState(locData?.MotherTongue);
  const [CanSpeak, setCanSpeak] = useState([
    { name: "Assamese" },
    { name: "Bengali" },
    { name: "English" },
    { name: "Gujarati" },
    { name: "Hindi" },
    { name: "Kannada" },
    { name: "Kashmiri" },
    { name: "Konkani" },
    { name: "Malayalam" },
    { name: "Manipuri" },
    { name: "Marathi" },
    { name: "Nepali" },
    { name: "Oriya" },
    { name: "Punjabi" },
    { name: "Sanskrit" },
    { name: "Sindhi" },
    { name: "Tamil" },
    { name: "Telugu" },
    { name: "Urdu" },
    { name: "Bodo" },
    { name: "Santhali" },
    { name: "Maithili" },
    { name: "Dogri" },
  ]);
  const [items, setItems] = useState([]);
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [dataLoading, setDataLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true);
    setUpdateMsg("")
    if (admin) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"admin/edituser_by_admin",
          {
            ReligiousBackground: {
              Religion,
              Community,
              SubCommunity,
              MotherTongue,
              CanSpeak: items,
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
          setUpdateMsg("Religious info updated!");
          setDataLoading(false);
        })
        .catch((err) => {
          setUpdateMsg("Something went wrong");
          setDataLoading(true);
          console.log(err);
        });
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            ReligiousBackground: {
              Religion,
              Community,
              SubCommunity,
              MotherTongue,
              CanSpeak: items,
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
          console.log(data, "asdalkjshd");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSelect = (selectedList) => {
    setItems(selectedList);
  };

  const handleRemove = (selectedList) => {
    setItems(selectedList);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Religious Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
          <p style={{ textAlign: "center", fontSize: "18px" }}>{updateMsg}</p>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Religion</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setReligion(e.target.value)}
              value={Religion}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Community:</Form.Label>
            {/* <Form.Control
              type="text"
              onChange={(e) => setCommunity(e.target.value)}
              value={Community}
            /> */}
            <Form.Select
              type="text"
              onChange={(e) => setCommunity(e.target.value)}
              value={Community}
            >
              <option>select</option>
              {communityData.communities.map((data) => (
                <option value={data.community}>{data.community}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Sub Community:</Form.Label>
            {/* <Form.Control
              type="text"
              onChange={(e) => setSubCommunity(e.target.value)}
              value={SubCommunity}
            /> */}

            <Form.Select
              type="text"
              onChange={(e) => setSubCommunity(e.target.value)}
              value={SubCommunity}
            >
              <option>select</option>
              {communityData.communities
                .filter((e) => e.community == Community)[0]
                ?.subCommunity.map((data) => (
                  <option value={data}>{data}</option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Mother Tongue:</Form.Label>
            {/* <Form.Control
              type="text"
              onChange={(e) => setMotherTongue(e.target.value)}
              value={MotherTongue}
            /> */}
            <Form.Select
              type="text"
              onChange={(e) => setMotherTongue(e.target.value)}
              value={MotherTongue}
            >
              <option>select</option>
              {[
                "Assamese",
                "Bengali",
                "Gujarati",
                "Hindi",
                "Kannada",
                "Kashmiri",
                "Konkani",
                "Malayalam",
                "Manipuri",
                "Marathi",
                "Nepali",
                "Oriya",
                "Punjabi",
                "Sanskrit",
                "Sindhi",
                "Tamil",
                "Telugu",
                "Urdu",
                "Bodo",
                "Santhali",
                "Maithili",
                "Dogri",
              ].map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Can Speak:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setCanSpeak(e.target.value)}
              value={CanSpeak}
            />
          </Form.Group>{" "} */}
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Can Speak:</Form.Label>
            {/* <Form.Select
              type="text"
              onChange={(e) => setCanSpeak(e.target.value)}
              value={CanSpeak}
            >
              <option>select</option>
              {['Assamese', 'Bengali', 'English', 'Gujarati', 'Hindi', 'Kannada', 'Kashmiri', 'Konkani', 'Malayalam', 'Manipuri', 'Marathi', 'Nepali', 'Oriya', 'Punjabi', 'Sanskrit', 'Sindhi', 'Tamil', 'Telugu', 'Urdu', 'Bodo', 'Santhali', 'Maithili', 'Dogri'].map(e => <option value={e}>{e}</option>)}

            </Form.Select> */}
            <Multiselect
              options={CanSpeak} // Options to display in the dropdown
              selectedValues={items} // Preselected value to persist in dropdown
              onSelect={handleSelect} // Function will trigger on select event
              onRemove={handleRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
            {/* <Multiselect showArrow options={CanSpeak} isObject={false} /> */}
          </Form.Group>{" "}
          <Button variant="primary" type="submit" disabled={dataLoading}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
