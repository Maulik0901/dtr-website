import React, { useState } from "react";
import "./view.css";
import { Carousel } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { Modal, Form } from "react-bootstrap";

function ViewProfileAdmin({ user }) {

  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="page-wrapper">
        <div className="content-wrapper container pt-3 pb-3">
          <div className="col-sm-12 mb-2">
            <div className="col-sm-12 px-0">
              <div className="row">
                <div className="col-sm-8 mt-2">
                  <h5
                    className="font-weight-bold"
                    style={{ textTransform: "uppercase" }}
                  >
                    {user?.name}
                  </h5>
                  <div>
                    <p className="short-info">DTR Id: {user?._id}</p>
                    {/* <p className="short-info"> | Profile Created by Parent</p> */}
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
                      <div>
                        <div>
                          <p className="d-inline-block font-15">
                            {user?.BasicsAndLifestyle[0]?.Age} Years old
                          </p>
                          <p className="d-inline-block font-15">
                            , {user?.BasicsAndLifestyle[0]?.Height}ft
                          </p>
                        </div>
                        <p className="font-15">
                          Mother Tongue is{" "}
                          {user?.ReligiousBackground[0]?.MotherTongue}{" "}
                        </p>
                        <p className="font-15">
                          Marital status:{" "}
                          {user?.BasicsAndLifestyle[0]?.MaritalStatus}
                        </p>
                        <div>
                          <p className="d-inline-block font-15">
                            Posted by :
                            {user?.otherDetails[0]?.Profilecreatedby}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <p className="font-15">
                        Religion: {user?.ReligiousBackground[0]?.Religion}
                      </p>
                      <p className="font-15">
                        Community: {user?.ReligiousBackground[0]?.Community}
                      </p>
                      <p className="font-15">
                        Grewup In: {user?.contactDetails?.city},
                        {user?.contactDetails?.state},
                        {user?.contactDetails?.country}
                      </p>
                      <p className="font-15">
                        Earns: {user?.EducationAndCareer[0]?.AnnualIncome}{" "}
                        Anually
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 mt-2">
                  <div className="bnr-profile-img">
                    <div>
                      <Carousel>
                        {user?.myPhotos.length ? (
                          user?.myPhotos.map((each) => (
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  // maxWidth: "200px",
                                }}
                                src={each?.url}
                                alt="First slide"
                              />
                              <p
                                className="p-0 m-0"
                                style={{
                                  position: "absolute",
                                  top: "10%",
                                  background: "rgba(0,0,0,0.6)",
                                  color: "white",
                                  fontSize: "8px",
                                }}
                              >
                                Image-by-DTR
                              </p>
                            </Carousel.Item>
                          ))
                        ) : (
                          <Carousel.Item>
                            {user?.profilePic ? (
                              <>
                                <img
                                  className="d-block w-100"
                                  style={{
                                    width: "200px",
                                    maxHeight: "200px",
                                    maxWidth: "200px",
                                  }}
                                  src={user?.profilePic?.url}
                                  alt="First slide"
                                />
                                <p
                                  className="p-0 m-0"
                                  style={{
                                    position: "absolute",
                                    top: "10%",
                                    background: "rgba(0,0,0,0.6)",
                                    color: "white",
                                    fontSize: "8px",
                                  }}
                                >
                                  Image-by-DTR
                                </p>
                              </>
                            ) : (
                              <FaUser size={150} color="grey" />
                            )}
                          </Carousel.Item>
                        )}

                        {/* <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://d36mkx074ponfl.cloudfront.net/medias/56411b8d-5d8c-420d-b831-4ccfc474804a_pp_t.jpeg"
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://d36mkx074ponfl.cloudfront.net/medias/265ab353-3b44-458a-a123-1b577da39f5f_ap_t.jpg"
      alt="Third slide"
    />
  </Carousel.Item> */}
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 profile-detil-view my-3">
                <div className="col-sm-12">
                  <div class="row row-acc-1">
                    <h5 className="font-weight-bold my-3">
                      About{" "}
                      {user?.gender === "Man" ? (
                        <span>Groom</span>
                      ) : (
                        <span>Bride</span>
                      )}
                    </h5>
                    <p>{user?.BasicsAndLifestyle[0]?.about}</p>
                  </div>
                  <p className="font-15"></p>
                  <ul className="profile-view-fields pl-0">
                    <div className="row">
                      <div className="col-sm-6">
                        <li>Citizen of India</li>
                      </div>
                    </div>
                  </ul>
                </div>
                <div>
                  <ul className="profile-view-fields pl-0">
                    <div className="row">
                      <div className="col-sm-6">
                        <h5 className="mt-2">Contact Details</h5>
                      </div>
                      <div className="col-sm-6">
                        <span className="d-inline-block">
                          <button
                            type="button"
                            className="bnr-btn mr-2 font-15 btn btn-primary"
                            onClick={() => setShow(true)}
                          >
                            View Mobile Number
                          </button>
                        </span>
                      </div>
                      <Modal show={show} onHide={() => setShow(false)} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Phone Number</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Control
                                type="text"
                                readOnly
                                value={user?.phone}
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </ul>
                </div>
                <hr />
                <div className="">
                  <h5 className="font-weight-bold mb-3">Education & Careers</h5>
                  <p className="font-15"></p>
                  <ul className="profile-view-fields pl-0">
                    <div className="row">
                      <div className="col-sm-6">
                        <li>
                          Highest Qualification:
                          {user?.EducationAndCareer[0]?.HighestQualification}
                        </li>
                        <li>
                          Annual Income:
                          {user?.EducationAndCareer[0]?.AnnualIncome}
                        </li>
                      </div>
                      <div className="col-sm-6">
                        <li>
                          Working With:
                          {user?.EducationAndCareer[0]?.WorkingWith}
                        </li>
                        {/* <li>
                          Working As:{user?.EducationAndCareer[0]?.WorkingAs}
                        </li> */}
                      </div>
                    </div>
                  </ul>
                </div>
                <hr />
                <div className="">
                  <h5 className="font-weight-bold mb-3">About Family</h5>
                  <p className="font-15"></p>
                  <ul className="profile-view-fields pl-0">
                    <div className="row">
                      <div className="col-sm-6">
                      <li>
                          Father's Name:{" "}
                          {user?.Familydetails[0]?.FatherName}
                        </li>
                        <li>
                          Father's Status:{" "}
                          {user?.Familydetails[0]?.FatherStatus}
                        </li>
                        <li>
                        <li>
                          Mother's Name:{" "}
                          {user?.Familydetails[0]?.MotherName}
                        </li>
                          Mother's Status:{" "}
                          {user?.Familydetails[0]?.MotherStatus}
                        </li>
                        <li>
                          Family Location:{" "}
                          {user?.Familydetails[0]?.FamilyLocation}
                        </li>
                        <li>
                          Native Place: {user?.Familydetails[0]?.NativePlace}
                        </li>
                      </div>
                      <div className="col-sm-6">
                        <li>
                          No. of Brothers:{" "}
                          {user?.Familydetails[0]?.NoofBrothers}
                        </li>
                        <li>
                          No. of Sisters: {user?.Familydetails[0]?.NoofSisters}
                        </li>
                        <li>
                          Family Type: {user?.Familydetails[0]?.FamilyType}
                        </li>
                        <li>
                          Family Values: {user?.Familydetails[0]?.FamilyValues}
                        </li>
                        {/* <li>Family Affluence</li> */}
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="col-sm-8 px-0">
                <h4 className="font-weight-bold mt-3">Partner Preference</h4>
                <hr />
              </div>
              <div className="col-sm-8 p-4 profile-detil-view">
                <div>
                  {/* <h5 className="font-weight-bold mb-3">Basic Preferences</h5> */}
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="font-15">
                          {user?.gender === "Man"
                            ? `Bride's Age`
                            : `Groom's Age`}{" "}
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          :- {user?.partnerPreference?.age?.from} to{" "}
                          {user?.partnerPreference?.age?.to}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Height:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          :- {user?.partnerPreference?.heightsFrom} to{" "}
                          {user?.partnerPreference?.heightsTo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Religion</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          :- {user?.partnerPreference?.religion}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Community</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          :- {user?.partnerPreference?.community}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12  px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Marital Status</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          :- {user?.partnerPreference?.maritalStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Mother Tongue</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          :- {user?.partnerPreference?.motherTongue}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="font-15">Annual Income</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          :- {user?.partnerPreference?.annualIncome}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="font-15">About Partner</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          :- {user?.partnerPreference?.aboutPartner}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="go-top"></div>
    </div>
  );
}

export default ViewProfileAdmin;
