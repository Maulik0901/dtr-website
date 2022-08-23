import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { educationData } from "../../EducationData";
import { occupation } from "../../occupation";
export default function EducationInfo(props) {
  const eduData = props.userData?.EducationAndCareer[0];
  const [HighestQualification, setHighestQualification] = useState(
    eduData?.HighestQualification
  );
  const [WorkingAs, setWorkingAs] = useState(eduData?.WorkingAs);
  const [AnnualIncome, setAnnualIncome] = useState(eduData?.AnnualIncome);
  const [WorkingWith, setWorkingwith] = useState(eduData?.WorkingWith);
  const [ProfessionalArea, setProfessionalArea] = useState(eduData?.ProfessionalArea);
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
          EducationAndCareer: {
            HighestQualification,
            WorkingAs,
            AnnualIncome,
            WorkingWith,
            ProfessionalArea,
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
        setUpdateMsg("Education info updated!")
        setDataLoading(false)
      })
      .catch((err) => {
        props.setUpdateMsg("Something went wrong")
        setDataLoading(false)
        console.log(err)});
    }
    else{
      axios
      .post(
        process.env.REACT_APP_API_URL+"user/edituser",
        {
          EducationAndCareer: {
            HighestQualification,
            WorkingAs,
            AnnualIncome,
            WorkingWith,
            ProfessionalArea,
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
        <Modal.Title>Edit Education info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
        <p style={{ textAlign: "center", fontSize: "18px" }}>{updateMsg}</p>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Highest qualification</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setHighestQualification(e.target.value)}
              value={HighestQualification}
            >
              <option>select</option>
              {educationData?.HighestEducation?.map((data) => (
                <option value={data.title}>{data.title}</option>
              ))}
            </Form.Select>
            {HighestQualification ? (
              <Form.Select value={ProfessionalArea} type="text" onChange={(e) => setProfessionalArea(e.target.value)}>
                <option>select</option>
                {educationData?.HighestEducation.filter(
                  (data) => data.title == HighestQualification
                )[0]?.course.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </Form.Select>
            ) : null}
          </Form.Group>
          {/* <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Working as</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setWorkingAs(e.target.value)}
                        value={WorkingAs}
                    />
                </Form.Group> */}
          {/* <Form.Group controlId="formFileDisabled" className="mb-3">
                    <Form.Label>Annual income:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        value={AnnualIncome}
                    />
                </Form.Group> */}
          <Form.Group controlId="formFileDisabled" className="mb-3">
            <Form.Label>Annual income:</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setAnnualIncome(e.target.value)}
              value={AnnualIncome}
            >
              <option>select</option>
              {[
                "0-50 Thousands",
                "50-1 Lakh",
                "1-2 Lakh",
                "2-3 Lakh",
                "3-4 Lakh",
                "4-5 Lakh",
                "5-6 Lakh",
                "6-7 Lakh",
                "7-8 Lakh",
                "8-9 Lakh",
                "9-10 Lakh",
                "10-12 Lakh",

                "12-14 Lakh",

                "14-16 Lakh",
                "16-18 Lakh",
                "18-20 Lakh",
                "20-25 Lakh",
                "25-30 Lakh",
                "30-35 Lakh",
                "35-40 Lakh",
                "40-45 Lakh",
                "45-50 Lakh",
                "50-60 Lakh",
                "60-70 Lakh",
                "70-80 Lakh",
                "80-90 Lakh",
                "1 cr",
              ].map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Working As:</Form.Label>
            <Form.Select
              type="text"
              onChange={(e) => setWorkingAs(e.target.value)}
              value={WorkingAs}
            >
              <option>Select</option>
              {occupation.Occupation.map((data) => (
                <option value={data}>{data}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Working with:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setWorkingwith(e.target.value)}
              value={WorkingWith}
            />
          </Form.Group>
          {/* <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Professional area:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setProfessionalArea(e.target.value)}
                        value={ProfessionalArea}
                    />
                </Form.Group>{" "} */}

          <Button variant="primary" type="submit" disabled={dataLoading}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
