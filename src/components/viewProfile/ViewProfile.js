import React, { useState } from "react";
import "./view.css";
import { Carousel } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import jwt_decode from "jwt-decode";

function ViewProfile({ user }) {
  const [refreshView, setRefreshView] = useState(false);
  const userId = jwt_decode(localStorage.getItem("dtrmatrimonyjwt")).tokenUser;

  // const fileChangeHandler = (e) => {
  //   const file = e.target.files[0];
  //   setFileType(file.type);
  //   setPreviewSrc(URL.createObjectURL(file));
  // };

  // const getProfilePic = (profilePicId) => {
  //   axios
  //     .get(process.env.REACT_APP_API_URL+`user/${profilePicId}`)
  //     .then((file) => setPreviewSrc(file?.data));
  // };
  const [show, setShow] = useState(false);
  const contactViewed = (id) => {
    setShow(true);
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/contact_viewed/${id}/${userId.userId}`
      )
      .then((res) => console.log("contact viewed"));
  };
  const handleSentRequest = (id, name, profilePicId) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/send_request_receiver/${id}/${userId.userId}/${userId.name}`
      ) //send to receiver
      .then((res) => {
        axios.post(
          process.env.REACT_APP_API_URL+`user/send_request_sender/${id}/${name}/${profilePicId}/${userId.userId}` //if succeed update sender array
        );
        res.data.modifiedCount > 0 && console.log("Request sent");
        setRefreshView(!refreshView);
      });
  };
  const handleReqsCancel = (id) => {
    axios
      .delete(
        process.env.REACT_APP_API_URL+`user/cancel_request_receiver/${id}/${userId.userId}`
      ) //send to receiver
      .then((res) => {
        axios.delete(
          process.env.REACT_APP_API_URL+`user/cancel_request_sender/${id}/${userId.userId}` //if succeed update sender array
        );
        res.data.modifiedCount > 0 && console.log("Request canceled");
        setRefreshView(!refreshView);
      });
  };
  const handleProfleVisist = (id, name, profilePicId) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/add_reviewed_profile/${id}/${name}/${profilePicId}/${userId.userId}` // add visited profile by this user to user's profile
      )
      .then((res) => {
        axios.post(
          process.env.REACT_APP_API_URL+`user/add_visitedby_profile/${id}/${userId.name}/${userId.userId}/n-a` // add this user's profile to user's profile visited by this user's
        );
        console.log("Viewed");
      });
  };
  const handleShortList = (id, name, profilePicId) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/add_shortList_sender/${id}/${name}/${profilePicId}/${userId.userId}` // add visited profile by this user to user's profile
      )
      .then((res) => {
        axios
          .post(
            process.env.REACT_APP_API_URL+`user/add_shortList_receiver/${id}/${userId.name}/${userId.userId}/n-a` // add this user's profile to user's profile visited by this user's
          )
          .then((res) => alert("Shortlisted"));
      });
  };
  const handleIgnore = (id) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/add_to_ignore/${id}/${userId.userId}` // add visited profile by this user to user's profile
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          alert("Added to ignore list");
        }
        if (res.data.modifiedCount === 0 && res.data.matchedCount > 0) {
          alert("Aready in ignore list");
        }
        // alert("Added to ignore list")
      });
  };
  const handleHoroscopeDownload = (id) => {
    axios
    .post(
      process.env.REACT_APP_API_URL+`user/add_horoscope_downloader/${id}/${userId.userId}` // add visited profile by this user to user's profile
    )
    .then((res) => {
      // console.log("Horoscope downloaded");
    });
  }
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
                            onClick={() => contactViewed(user?._id)}
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
                        {/* <li>
                          Working With:
                          {user?.EducationAndCareer[0]?.WorkingWith}
                        </li> */}
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
                          Mother's Name:{" "}
                          {user?.Familydetails[0]?.MotherName}
                        </li>
                        <li>
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
              {/* <div className="col-sm-8 p-4 profile-detil-view mb-3">
                <div>
                  <h5 className="font-weight-bold mb-3">
                    Hobbies &amp; Interests
                  </h5>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="font-15">Hobbies:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          Dancing, Cooking, Taking care of pets
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Interests:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">
                          Travel / Sightseeing, Listening to music, Volunteering
                          / Social Service, Writing
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Favourite Music:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">Instrumental - Indian</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Favourite Reads:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">Not Specified</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Preferred Movies:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">Not Specified</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Sports/ Fitness Activities:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">Not Specified</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Favourite Cusisine:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">Not Specified</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Preferred Dress Style:</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-15">Not Specified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-sm-8 px-0">
                <h4 className="font-weight-bold mt-3">Partner Preference</h4>
                <hr />
              </div>
              <div className="col-sm-8 p-4 profile-detil-view">
                <div>
                  <h5 className="font-weight-bold mb-3">Basic Preferences</h5>
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
                {/* <div>
                  <h5 className="font-weight-bold mb-3">
                    Professional Preferences
                  </h5>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15"> Highest Education:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="font-15">:-</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Working with:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="font-15">Any</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Professional area:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="font-15">:-</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Working as:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="font-15">:-</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 px-0">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className=" font-15">Annual Income:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="font-15">:-</p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="col-sm-12 mt-4 row">
                <div
                  className="col-sm-7 my-2 d-inline-block text-right search-profile-actions"
                  style={{ width: "100%" }}
                >
                  {user?.horoscope?.url ? (
                    <a
                      target="blank"
                      href={user?.horoscope?.url}
                      download
                      onClick={() => handleHoroscopeDownload(user?._id)}
                    >
                      <button
                        type="button"
                        className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                      >
                        Download Horoscope
                      </button>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                      disabled
                    >
                      Horoscope unavailable
                    </button>
                  )}

                  {user.matchedPeople &&
                    user.matchedPeople.map(
                      (each_user) =>
                        each_user.id === userId.userId && (
                          <button className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-success">
                            <span className="">Matched</span>
                          </button>
                        )
                    )}
                  <div
                    style={{
                      display: `${
                        user.matchedPeople.length ? "none" : "inline-block"
                      }`,
                    }}
                  >
                    {user.requestedReqs && user.requestedReqs.length ? (
                      user.requestedReqs.map(function (each) {
                        return (
                          <div key={each.id}>
                            <button
                              style={{
                                display: `${
                                  each.id === userId.userId ? " " : "none"
                                }`,
                              }}
                              className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                              onClick={() => handleReqsCancel(user._id)}
                            >
                              Cancel Interest
                            </button>

                            <button
                              style={{
                                display: `${
                                  each.id !== userId.userId ? " " : "none"
                                }`,
                              }}
                              className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                              onClick={() => {
                                handleSentRequest(
                                  user._id,
                                  user.name,
                                  user.profilePicId
                                );
                              }}
                              // disabled
                            >
                              Send Interest
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <button
                        className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                        onClick={() =>
                          handleSentRequest(
                            user._id,
                            user.name,
                            user.profilePicId
                          )
                        }
                      >
                        Send Interest
                      </button>
                    )}
                  </div>
                  <span className="d-inline-block">
                    <button
                      onClick={() =>
                        handleShortList(user._id, user.name, user.profilePicId)
                      }
                      type="button"
                      className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                    >
                      Shortlist
                    </button>
                  </span>
                  <button
                    type="button"
                    className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                  >
                    Message
                  </button>
                  <button
                    type="button"
                    className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                    onClick={() => handleIgnore(user._id)}
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="go-top"></div>
    </div>
  );
}

export default ViewProfile;
