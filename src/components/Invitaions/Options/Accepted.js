import React, { Component }  from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { RiFileUserLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ProfileList from "../../profileList/ProfileList";

const Accepted = ({ user }) => {
  const history = useNavigate();
  const [data, setUserData] = useState([]);
  const userId = user && user.tokenUser;
  const [dataLoading, setDataLoading] = useState(false);
  const [refreshView, setRefreshView] = useState(false);
  const dataLoad = () => {
    setDataLoading(true);
    fetch(
      process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId?.userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        setUserData([])
        let datatostore = [];
        let maxLength = res.matchedPeople.length;
        res.matchedPeople.forEach((user) => {
          axios
            .get(
              process.env.REACT_APP_API_URL+`user/get_single_user_id/${
                user && user.id
              }`
            )
            .then((res) => {
              // setRecentlyViewedBy([...recentlyViewedBy,res.data]);
              datatostore.push(res.data);
              if (datatostore.length === maxLength) {
                setUserData(datatostore);
              }
            });
        });
        setDataLoading(false);
      });
  }
  useEffect(() => {
    dataLoad()
  }, [userId, refreshView]);
  const handleProfleVisist = (id, name, profilePicId, user) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/add_reviewed_profile/${id}/${name}/${profilePicId}/${userId.userId}` // add visited profile by this user to user's profile
      )
      .then((res) => {
        axios.post(
          process.env.REACT_APP_API_URL+`user/add_visitedby_profile/${id}/${userId.name}/${userId.userId}/n-a` // add this user's profile to user's profile visited by this user's
        );
        console.log("Viewed");
      })
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false); //show modal
  const handleRemoveMatched = (id) => {
    axios
      .delete(
        process.env.REACT_APP_API_URL+`user/remove_matched_receiver/${id}/${userId.userId}`
      )
      .then((res) => {
        axios.delete(
          process.env.REACT_APP_API_URL+`user/remove_matched_sender/${id}/${userId.userId}` //if succeed update sender array
        );
        res.data.modifiedCount > 0 && console.log("Matched Removed");
        setRefreshView(!refreshView);
        setShow(false)
        dataLoad()
      })
      .catch(err => {
        console.log(err);
      })
  };
  return (
    <div
      className="container"
      style={{
        textAlign: "center",
      }}
    >
      {dataLoading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            zIndex: 999,
            width: "50px",
            left: "50%",
            height: "50px",
            background: "rgba(0,0,0,0.6)",
          }}
          class="spinner-border"
          role="status"
        ></div>
      )}
      <div>
        <h4>Mathced Partner</h4> <hr />{" "}
      </div>
      <div className="row">
        {data && data.length ? (
          data.map((userMatched) => (
            // <ProfileList userData={"userData"} userMatched={each}  />
            <div className="col-sm-12 px-0" style={{ margin: "0 auto" }}>
              <div className="ribbon-card">
                <div className="ribbon-box">
                  <div className="col-12 edit-phone p-3 mb-2">
                    <div className="row">
                      <div
                        className="col-sm-3"
                        style={{ paddingRight: "20px" }}
                      >
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                          className="d-block mb-3 profile-list-img"
                          src={userMatched?.profilePic?.url}
                          alt="Dtr Search Profile"
                        />
                      </div>
                      <div className="col-sm-9">
                        <div className="row">
                          <div className="col-sm-5">
                            <div>
                              <h5 className="font-weight-bold d-inline-block mr-2">
                                {userMatched?.name}
                              </h5>
                            </div>
                            {/* <p className="font-14 short-info mr-1">
                              <a target="_blank" href="/profile/20001825">
                                {userMatched?._id}
                              </a>
                            </p> */}
                            <p className="font-14 pr-1 mb-0">
                              {/* {userMatched?.BasicsAndLifestyle[0]?.Grewupin} */}
                            </p>
                            <p className="blink">online now</p>
                          </div>
                          <div
                            className="col-sm-7 my-2 d-inline-block text-right search-profile-actions"
                            style={{ width: "100%" }}
                          >
                            <a
                              href=" "
                              className="bnr-btn mx-2 font-14 btn btn-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                history("/profile", {
                                  state: { data: [userMatched], admin: false },
                                });
                                handleProfleVisist(
                                  userMatched._id,
                                  userMatched.name,
                                  userMatched.profilePicId
                                );
                              }}
                            >
                              View Profile
                            </a>
                            <button
                              type="button"
                              className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                            >
                              Message
                            </button>
                            <button
                              type="button"
                              className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                              onClick={() => setShow(true)}
                            >
                              Remove Match
                            </button>
                          </div>
                          <Modal show={show}>
                            <Modal.Dialog>
                              <Modal.Header>
                                <Modal.Title>
                                  Unmatch "{userMatched?.name}"
                                </Modal.Title>
                              </Modal.Header>

                              <Modal.Body>
                                <p>Are you sure?</p>
                              </Modal.Body>

                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => setShow(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    handleRemoveMatched(userMatched?._id)
                                  }
                                >
                                  Yes
                                </Button>
                              </Modal.Footer>
                            </Modal.Dialog>
                          </Modal>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <h4>No Matched Partner</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accepted;
