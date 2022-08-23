import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./list.css";
import { Dropdown } from "react-bootstrap";
import { AiOutlineDown, AiOutlineCheck } from "react-icons/ai";

function ProfileList({ user, userId }) {
  const [loggeduser, setLoggeduser] = useState({});
  const [refreshView, setRefreshView] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const saveUser = (e) => {
    setLoggeduser(jwt_decode(e));
  };

  const getProfilePic = (profilePicId) => {
    axios
      .get(process.env.REACT_APP_API_URL+`user/${profilePicId}`)
      .then((file) => setPreviewSrc(file?.data));
  };
  useEffect(() => {
    let data = localStorage.getItem("dtrmatrimonyjwt");
    if (data) {
      saveUser(data);
    }
  }, []);
  useEffect(() => {
    getProfilePic(user?.profilePicId);
  }, [user]);
  const history = useNavigate();

  const handleProfleVisist = (id, name, profilePicId, user) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/add_reviewed_profile/${id}/${name}/${profilePicId}/${loggeduser.tokenUser.userId}` // add visited profile by this user to user's profile
      )
      .then((res) => {
        axios.post(
          process.env.REACT_APP_API_URL+`user/add_visitedby_profile/${id}/${loggeduser.tokenUser.name}/${loggeduser.tokenUser.userId}/n-a` // add this user's profile to user's profile visited by this user's
        );
        console.log("Viewed");
        // history("/profile",{ state:{data:[user]} })
      })
      .catch((err) => console.log(err));
  };
  const handleSentRequest = (id, name, profilePicId) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/send_request_receiver/${id}/${loggeduser.tokenUser.userId}/${loggeduser.tokenUser.name}`
      ) //send to receiver
      .then((res) => {
        axios.post(
          process.env.REACT_APP_API_URL+`user/send_request_sender/${id}/${name}/${profilePicId}/${loggeduser.tokenUser.userId}` //if succeed update sender array
        );
        res.data && alert("Interest Sent!");
        setRefreshView(!refreshView);
      });
  };
  const handleReqsCancel = (id) => {
    axios
      .delete(
        process.env.REACT_APP_API_URL+`user/cancel_request_receiver/${id}/${loggeduser.tokenUser.userId}`
      ) //send to receiver
      .then((res) => {
        axios.delete(
          process.env.REACT_APP_API_URL+`user/cancel_request_sender/${id}/${loggeduser.tokenUser.userId}` //if succeed update sender array
        );
        res.data.modifiedCount > 0 && alert("Interest Canceled");
        setRefreshView(!refreshView);
      });
  };

  return (
    <div>
      <div className="profile-list">
        <div className="single-list" style={{ margin: "0 auto" }}>
          <div className="photos">
            <div className="photo-view">
              <img
                className="d-block w-100 profile-list-img"
                src={user?.profilePic?.url}
                alt="Dtr Search Profile"
              />
            </div>
          </div>

          <div className="profile-detail">
            <div className="list-identity">
              <div className="profile-actions">
                <div className="profile-name">
                  <h4> {user?.name}</h4>
                </div>
                <div className="action">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <AiOutlineDown></AiOutlineDown>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href=" "
                        onClick={(e) => {
                          e.preventDefault();
                          history("/profile", {
                            state: { data: [user], admin: false },
                          });
                          handleProfleVisist(
                            user._id,
                            user.name,
                            user.profilePicId
                          );
                        }}
                      >
                        {" "}
                        View Profile
                      </Dropdown.Item>
                      {/* <Dropdown.Item href=" " onClick={() =>
                        handleSentRequest(
                          user._id,
                          user.name,
                          user.profilePicId
                        )
                      }
                      >Send Interest</Dropdown.Item> */}
                      <Dropdown.Item href="#/action-3">Shortlist</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Message</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Ignore</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <p className="font-14 short-info mr-1">
                <a
                  href=" "
                  onClick={(e) => e.preventDefault()}
                  className="user-id"
                >
                  {user?._id}
                </a>
              </p>
              {/* <p className="font-14 pr-1 mb-0">
                {user?.BasicsAndLifestyle[0]?.Grewupin}
              </p>
              <p className="blink">online now</p> */}
            </div>
            <div className="row px-3">
              <div className="col-sm-12 px-0">
                <div className="d-flex col-sm-12 px-0">
                  <div className="col-sm-6">
                    <p className="font-14 field-title">Age, Height :</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-14">
                      {user && user?.BasicsAndLifestyle[0]?.Age} Yrs,{" "}
                      {user && user?.BasicsAndLifestyle[0]?.Height}
                      ft
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 px-0">
                <div className="d-flex col-sm-12 px-0"></div>
              </div>
              <div className="col-sm-12 px-0">
                <div className="d-flex col-sm-12 px-0">
                  <div className="col-sm-6">
                    <p className="font-14 field-title">Caste :</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-14">
                      {user?.ReligiousBackground[0]?.Community}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 px-0">
                <div className="d-flex col-sm-12 px-0">
                  <div className="col-sm-6">
                    <p className="font-14 field-title">Education :</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-14">
                      {user?.EducationAndCareer[0]?.HighestQualification}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 px-0">
                <div className="d-flex col-sm-12 px-0">
                  <div className="col-sm-6">
                    <p className="font-14 field-title">Occupation :</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-14">
                      {user?.EducationAndCareer[0]?.WorkingAs}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {user.matchedPeople &&
            user.matchedPeople.map(
              (each_user) =>
                each_user.id === userId?.userId && (
                  <button className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-success">
                    <span className="">Matched</span>
                  </button>
                )
            )}
          <div
            style={{
              display: `${user.matchedPeople.length ? "none" : "inline-block"}`,
            }}
          >
            {user.requestedReqs && user.requestedReqs.length ? (
              user.requestedReqs.map(function (each) {
                return (
                  <div key={each._id}>
                    <button
                      style={{
                        display: `${each._id === userId?.userId ? " " : "none"}`,
                      }}
                      className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                      onClick={() => handleReqsCancel(user._id)}
                    >
                      Cancel Interest
                    </button>

                    <button
                      style={{
                        display: `${each._id !== userId?.userId ? " " : "none"}`,
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
                  handleSentRequest(user._id, user.name, user.profilePicId)
                }
              >
                Send Interest
              </button>
            )}
          </div>
          <div className="connect">
            <div>
              <div className="connect-inner">
                <div class="like">Like this profile?</div>
                <div
                  className="connect-container"
                  // onClick={() =>
                  //   handleSentRequest(user._id, user.name, user.profilePicId)
                  // }
                >
                  <AiOutlineCheck className="connect-btn"></AiOutlineCheck>
                  <p className="connect-now">Connect now</p>
                   <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileList;
