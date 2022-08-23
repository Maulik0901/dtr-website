import React, { Component }  from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Requested = ({ user }) => {
  const history = useNavigate();
  const [data, setUserData] = useState([]);
  const userId = user && user.tokenUser;
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    setDataLoading(true)
    fetch(process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId.userId}`)
      .then((res) => res.json())
      .then((res) => {
        var datatostore = [];
        let maxLength = res.requestedReqs.length;
        res.requestedReqs.forEach((user) => {
          axios
            .get(
              process.env.REACT_APP_API_URL+`user/get_single_user_id/${user && user.id}`
            )
            .then((res) => {
               console.log(res.data)
              // setRecentlyViewedBy([...recentlyViewedBy,res.data]);
              datatostore.push(res.data);
              if (datatostore.length === maxLength) {
                setUserData(datatostore);
              }
            });
        });
        setDataLoading(false)
      });
  }, [userId.userId]);
  const reload = () => {
    setUserData([]);
    fetch(process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId.userId}`)
      .then((res) => res.json())
      .then((res) => {
        var datatostore = [];
        let maxLength = res.requestedReqs.length;
        res.requestedReqs.forEach((user) => {
          axios
            .get(
              process.env.REACT_APP_API_URL+`user/get_single_user_id/${user && user.id}`
            )
            .then((res) => {
               console.log(res.data)
              // setRecentlyViewedBy([...recentlyViewedBy,res.data]);
              datatostore.push(res.data);
              if (datatostore.length === maxLength) {
                setUserData(datatostore);
              }
            });
        });
      });
  }
  const handleReqsAccept = (id, name, profilePicId) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/accept_pending_request/${id}/${userId.userId}`
      )
      .then((res) => {
        //add to request sender profile in matched people after accepting by req recevier
        axios.post(
          process.env.REACT_APP_API_URL+`user/accept_pending_request_sender/${id}/${userId.userId}`
        );
        res.data.modifiedCount > 0 && console.log("Request Accepted");
        reload();
      });
  };
  const handleReqsDelete = (id, name, profilePicId) => {
    console.log(id);
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/delete_pending_request/${id}/${name}/${profilePicId}/${userId.userId}`
      )
      .then((res) => {
        axios.post(
          process.env.REACT_APP_API_URL+`user/delete_pending_request_sender/${id}/${userId.userId}`
        );
        res.data.modifiedCount > 0 && console.log("Request Deleted");
        
        reload();
      });
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
      <div><h4>
        Pending Requests</h4> <hr /> </div>
      <div className="row">
        {data && data.length ? (
          data.map((userMatched) => (
            // <ProfileList userData={data} id={each.id}  key={each.id}  />
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
                          className="d-block w-100 h-100 mb-3 profile-list-img"
                          src={userMatched?.profilePicId}
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
                            <p className="font-14 short-info mr-1">
                              <a target="_blank" href="/profile/20001825">
                                {userMatched?.id}
                              </a>
                            </p>
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
                              onClick={() => {
                                history("/profile", {
                                  state: { data: [userMatched], admin: false },
                                });
                                // handleProfleVisist(
                                //   userMatched._id,
                                //   userMatched.name,
                                //   userMatched.profilePicId
                                // );
                              }}
                            >
                              View Profile
                            </a>
                            <span className="d-inline-block">
                              <button
                                type="button"
                                className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                                onClick={() =>
                                  handleReqsAccept(
                                    userMatched._id,
                                    userMatched.name,
                                    userMatched.profilePicId
                                  )
                                }
                              >
                                Accept Interest
                              </button>
                            </span>
                            <span className="d-inline-block">
                              <button
                                type="button"
                                className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                                onClick={() =>
                                  handleReqsDelete(
                                    userMatched._id,
                                    userMatched.name,
                                    userMatched.profilePicId
                                  )
                                }
                              >
                                Reject Interest
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
            // <div className="user-card" key={each}>
            //   <RiFileUserLine size={"100%"} color="grey" />
            //   <div className="name">
            //     <button
            //       onClick={() => {
            //         history("/profile", {
            //           state: {
            //             user: user,
            //             // recommendedUser: recommendedUser,
            //           },
            //         });
            //       }}
            //     >
            //       {each.name}
            //     </button>
            //   </div>
            //   <button
            //       className="mt-2"
            //       style={{ backgroundColor: "green" }}
            //       onClick={() => handleReqsAccept(each.id, each.name, each.profilePicId)}
            //     >
            //       Accept
            //     </button>
            //   <button
            //       className="mt-2"
            //       style={{ backgroundColor: "red" }}
            //       onClick={() => handleReqsDelete(each.id, each.name, each.profilePicId)}
            //     >
            //       Delete
            //     </button>
            // </div>
          ))
        ) : (
          <div className="">
            <h4>No Pending Request</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requested;
