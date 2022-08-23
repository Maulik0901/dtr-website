import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { RiFileUserLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const RecentlyViewed = ({ user }) => {
  const [recommendedUser, setRecommendedUser] = useState([]);
  const [recentlyViewedBy, setRecentlyViewedBy] = useState([]);
  const [refreshView, setRefreshView] = useState(false);
  const history = useNavigate();
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setUserData] = useState([]);
  const userId = user && user.tokenUser;
  useEffect(() => {
    setDataLoading(true)
    fetch(process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId?.userId}`)
      .then((res) => res.json())
      .then((res) => {
        var datatostore = [];
        let maxLength = res.recentlyViewed.length;
        res.recentlyViewed.forEach((user) => {
          axios
            .get(process.env.REACT_APP_API_URL+`user/get_single_user_id/${user._id}`)
            .then((res) => {
              setDataLoading(false)
              datatostore.push(res.data);
              if (datatostore.length === maxLength) {
                setRecommendedUser(datatostore);
              }
            });
        });
      });
  }, [userId, refreshView]);
  useEffect(() => {
    setDataLoading(true)
    fetch(process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId?.userId}`)
      .then((res) => res.json())
      .then((res) => {
        var datatostore = [];
        let maxLength = res.profileViewedBy.length;
        res.profileViewedBy.forEach((user) => {
          axios
            .get(process.env.REACT_APP_API_URL+`user/get_single_user_id/${user?._id}`)
            .then((res) => {
              setDataLoading(false)
              // setRecentlyViewedBy([...recentlyViewedBy,res.data]);
              datatostore.push(res.data);
              if (datatostore.length === maxLength) {
                setRecentlyViewedBy(datatostore);
              }
            });
        });
      });
  }, [userId, refreshView]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       process.env.REACT_APP_API_URL+`user/get_single_user_id/${
  //         user && user.tokenUser.userId
  //       }`
  //     )
  //     .then((res) => {
  //       setRecommendedUser(res.data.recentlyViewed.reverse());
  //       setRecentlyViewedBy(res.data.profileViewedBy.reverse());
  //     });
  // }, [user]);
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
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="name"
        style={{
          width: "70%",
          fontWeight: "bold",
          fontSize: "2rem",
          color: "grey",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Recently Viewed By You
      </div>
      {dataLoading && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              zIndex: 999,
              width: "50px",
              height: "50px",
              background: "rgba(0,0,0,0.6)",
              left: "50%",
            }}
            class="spinner-border"
            role="status"
          ></div>
        )}
      <div>
        {recommendedUser && recommendedUser.length ? (
          recommendedUser.map(
            (user, index) =>
              index < 5 && (
                <div className="" style={{ margin: "0 auto" }}>
                <div className="ribbon-card ">
                  <div className="ribbon-box ">
                    <div className="col-12 edit-phone p-4 mb-2">
                      <div className="row m-2" style={{ width: "100%" }}>
                        <div
                          className="col-sm-3"
                          style={{ paddingRight: "20px" }}
                        >
                          <img 
                          style={{
                            width: "100px", height: "100px"
                          }}
                            className="d-block mb-3 profile-list-img"
                            src={user?.profilePic?.url}
                            alt="Dtr Search Profile"
                          />
                        </div>
                        <div className="col-sm-9">
                          <div className="row">
                            <div className="">
                              <div>
                                <h5 className="w-100">{user?.name}</h5>
                              </div>
                            </div>
                            <div
                              className="col-sm-7 my-2 d-inline-block text-right search-profile-actions"
                              style={{ width: "100%" }}
                            >
                              <a
                                href=" "
                                className="bnr-btn mx-2 font-14 btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault()
                                  history("/profile", {
                                    state: { data: [user], admin: false },
                                  });
                                }}
                              >
                                View Profile
                              </a>
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
                                      user?.matchedPeople?.length
                                        ? "none"
                                        : "inline-block"
                                    }`,
                                  }}
                                >
                                  {user.requestedReqs &&
                                  user.requestedReqs.length ? (
                                    user.requestedReqs.map(function (each) {
                                      return (
                                        <div key={each.id}>
                                          <button
                                            style={{
                                              display: `${
                                                each.id === userId.userId
                                                  ? " "
                                                  : "none"
                                              }`,
                                            }}
                                            className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                                            onClick={() =>
                                              handleReqsCancel(user._id)
                                            }
                                          >
                                            Cancel Interest
                                          </button>

                                          <button
                                            style={{
                                              display: `${
                                                each.id !== userId.userId
                                                  ? " "
                                                  : "none"
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
                              <button
                                type="button"
                                className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                              >
                                Message
                              </button>
                              <span className="d-inline-block">
                                  <button
                                    onClick={() =>
                                      handleShortList(
                                        user._id,
                                        user.name,
                                        user.profilePicId
                                      )
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
                                  onClick={() => handleIgnore(user._id)}
                                >
                                  Ignore
                                </button>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )
          )
        ) : (
          <div>
            <h4>No Recent Views</h4>
          </div>
        )}
      </div>
      <div
        className="name"
        style={{
          width: "70%",
          fontWeight: "bold",
          fontSize: "2rem",
          color: "grey",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Your Profile Visitors
      </div>
      {recentlyViewedBy && recentlyViewedBy.length ? (
        recentlyViewedBy.map(
          (user, index) =>
            index < 5 && (
              <div className="" style={{ margin: "0 auto" }}>
                <div className="ribbon-card ">
                  <div className="ribbon-box ">
                    <div className="col-12 edit-phone p-4 mb-2">
                      <div className="row m-2" style={{ width: "100%" }}>
                        <div
                          className="col-sm-3"
                          style={{ paddingRight: "20px" }}>
                          <img style={{
                            width: "100px", height: "100px"
                          }}
                            className="d-block mb-3 profile-list-img"
                            src={user?.profilePic?.url}
                            alt="Dtr Search Profile"
                          />
                        </div>
                        <div className="col-sm-9">
                          <div className="row">
                            <div className="">
                              <div>
                                <h5 className="w-100">{user?.name}</h5>
                              </div>
                            </div>
                            <div
                              className="col-sm-7 my-2 d-inline-block text-right search-profile-actions"
                              style={{ width: "100%" }}
                            >
                              <a
                                href=" "
                                className="bnr-btn mx-2 font-14 btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault()
                                  history("/profile", {
                                    state: { data: [user], admin: false },
                                  });
                                }}
                              >
                                View Profile
                              </a>
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
                                      user?.matchedPeople?.length
                                        ? "none"
                                        : "inline-block"
                                    }`,
                                  }}
                                >
                                  {user.requestedReqs &&
                                  user.requestedReqs.length ? (
                                    user.requestedReqs.map(function (each) {
                                      return (
                                        <div key={each.id}>
                                          <button
                                            style={{
                                              display: `${
                                                each.id === userId.userId
                                                  ? " "
                                                  : "none"
                                              }`,
                                            }}
                                            className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                                            onClick={() =>
                                              handleReqsCancel(user._id)
                                            }
                                          >
                                            Cancel Interest
                                          </button>

                                          <button
                                            style={{
                                              display: `${
                                                each.id !== userId.userId
                                                  ? " "
                                                  : "none"
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
                              <button
                                type="button"
                                className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                              >
                                Message
                              </button>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )
      ) : (
        <div className="p-5">
          <h4>No Recent Views</h4>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
