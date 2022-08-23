import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
export default function FamilyInfo(props) {
  const locData = props.userData?.Familydetails[0];
  const [FatherStatus, setFatherStatus] = useState(locData?.FatherStatus);
  const [MotherStatus, setMotherStatus] = useState(locData?.MotherStatus);
  const [FamilyLocation, setFamilyLocation] = useState(
    props.userData?.contactDetails[0]?.city
  );
  const [NativePlace, setNativePlace] = useState(locData?.NativePlace);
  const [NoofBrothers, setNoofBrothers] = useState(locData?.NoofBrothers);
  const [NoofSisters, setNoofSisters] = useState(locData?.NoofSisters);
  const [FamilyType, setFamilyType] = useState(locData?.FamilyType);
  const [FamilyClass, setFamilyClass] = useState(locData?.FamilyClass);
  const [FamilyValues, setFamilyValues] = useState(locData?.FamilyValues);
  const [FamilyAffluence, setFamilyAffluence] = useState();
  const [FatherOccupation, setFatherOccupation] = useState(
    locData?.FatherOccupation
  );
  const [MotherOccupation, setMotherOccupation] = useState(
    locData?.FatherOccupation
  );
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [dataLoading, setDataLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const [FatherName, setFatherName] = useState(locData?.FatherName);
  const [MotherName, setMotherName] = useState(locData?.MotherName);
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true);
    if (props.admin) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"admin/edituser_by_admin",
          {
            Familydetails: {
              FatherName,
              MotherName,
              FatherStatus,
              MotherStatus,
              FamilyLocation,
              NativePlace,
              NoofBrothers,
              NoofSisters,
              FamilyType,
              FamilyValues,
              FamilyAffluence,
              MotherOccupation,
              FatherOccupation,
              FamilyClass,
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
          setUpdateMsg("Family info updated!");
          setDataLoading(false);
        })
        .catch((err) => {
          props.setUpdateMsg("Something went wrong");
          console.log(err);
        });
      setDataLoading(true);
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            Familydetails: {
              FatherName,
              MotherName,
              FatherStatus,
              MotherStatus,
              FamilyLocation,
              NativePlace,
              NoofBrothers,
              NoofSisters,
              FamilyType,
              FamilyValues,
              FamilyAffluence,
              MotherOccupation,
              FatherOccupation,
              FamilyClass,
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
        <Modal.Title>Edit Family Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
          <p style={{ textAlign: "center", fontSize: "18px" }}>{updateMsg}</p>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Father's Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFatherName(e.target.value)}
              value={FatherName}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Father status</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setFatherStatus(e.target.value)}
              value={FatherStatus}
            >
              {" "}
              <option>select</option>
              {[
                "Employed in Government",
                "Employed in Private",
                "Business",
                "Retired",
                "Not employed",
                "Passed Away",
              ].map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Form.Select>
            {FatherStatus &&
            FatherStatus !== "Not employed" &&
            FatherStatus !== "Passed Away" &&
            FatherStatus !== "Retired" ? (
              <>
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setFatherOccupation(e.target.value)}
                  value={FatherOccupation}
                />
              </>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Mother's Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setMotherName(e.target.value)}
              value={MotherName}
            />
          </Form.Group>{" "}
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Mother status:</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setMotherStatus(e.target.value)}
              value={MotherStatus}
            >
              {" "}
              <option>select</option>
              {[
                "Employed in Government",
                "Employed in Private",
                "Business",
                "Retired",
                "Not employed",
                "Home Maker",
                "Passed Away",
              ].map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Form.Select>
            {MotherStatus &&
            MotherStatus !== "Not employed" &&
            MotherStatus !== "Passed Away" &&
            MotherStatus !== "Home Maker" &&
            MotherStatus !== "Retired" ? (
              <>
                <Form.Label>Occupation:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMotherOccupation(e.target.value)}
                  value={MotherOccupation}
                />
              </>
            ) : null}
          </Form.Group>
          {/* <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Family location:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFamilyLocation(e.target.value)}
              value={FamilyLocation}
            />
          </Form.Group> */}
          {/* <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Native place:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNativePlace(e.target.value)}
              value={NativePlace}
            />
          </Form.Group> */}
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>No of brothers:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setNoofBrothers(e.target.value)}
              value={NoofBrothers}
            />
          </Form.Group>{" "}
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>No of sisters:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setNoofSisters(e.target.value)}
              value={NoofSisters}
            />
          </Form.Group>{" "}
          {/* <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Family type:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFamilyType(e.target.value)}
              value={FamilyType}
            />
          </Form.Group> */}
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Family type:</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setFamilyType(e.target.value)}
              value={FamilyType}
            >
              <option>select</option>
              <option value={"Join Family"}>Join Family</option>
              <option value="Nuclear Family">Nuclear Family</option>
              <option value="Others Family">Others Family</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Family value:</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setFamilyValues(e.target.value)}
              value={FamilyValues}
            >
              <option>select</option>
              {["Orthodox", "Traditional", "Moderate", "Liberal"].map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Family Class:</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setFamilyClass(e.target.value)}
              value={FamilyClass}
            >
              <option>select</option>
              {[
                "Upper Class",
                "Upper Middle Class",
                "Lower Middle Class",
                "Working Class",
              ].map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Family affluence</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFamilyAffluence(e.target.value)}
              value={FamilyAffluence}
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
