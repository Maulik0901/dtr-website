import React, { Component }  from 'react';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Sent = ({ user }) => {
  const history = useNavigate();
  const [data, setUserData] = useState([]);
  const userId = user && user.tokenUser;
  const [refreshView, setRefreshView] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    setDataLoading(true)
    fetch(process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId.userId}`)
      .then((res) => res.json())
      .then((res) => {
        var datatostore = [];
        let maxLength = res?.sentReqs.length;
        res.sentReqs.forEach((user) => {
          axios
            .get(
              process.env.REACT_APP_API_URL+`user/get_single_user_id/${user && user.id}`
            )
            .then((res) => {
              datatostore.push(res.data);
              if (datatostore.length === maxLength) {
                setUserData(datatostore);
              }
            });
        });
        setDataLoading(false)
      });
  }, [refreshView, userId.userId]);
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
        Sent Requests</h4> <hr /> </div>
      <div className="row">
      {data && data.length ? (
          data.map((userMatched, index) => (
            // <ProfileList userData={data} id={each.id} userMatched={each}   key={each.id}/>
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
                            <span className="d-inline-block">
                              <button
                                type="button"
                                className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
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
                              </button>
                            </span>
                              <span className="d-inline-block">
                                <button
                                  type="button"
                                  className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                                  // style={{ backgroundColor: "red" }}
                                  onClick={() =>
                                    handleReqsCancel(userMatched._id)
                                  }
                                >
                                  Cancel Interest.
                                </button>
                              </span>
                            {/* <span className="d-inline-block">
                              <button
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
                            >
                              Ignore
                            </button> */}
                          </div>
                        </div>
                        <hr />
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            // <div className="user-card" key={each.id}>
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
            //       {each.name && each.name}
            //     </button>
            //   </div>
            //   {data.matchedPeople && data.matchedPeople.length ? (
            //     data.matchedPeople.map((user) => {
            //       return (
            //         <div>
            //           <button
            //             className="mt-2"
            //             style={{ backgroundColor: "green", display: `${user?.id === userId ? "block" : "none"}` }}
            //             // onClick={() => handleReqsCancel(each.id)}
            //           >
            //             Matched
            //           </button>
            //           <button
            //             className="mt-2"
            //             style={{ backgroundColor: "red", display: `${user?.id !== userId ? "block" : "none"}` }}
            //             onClick={() => handleReqsCancel(each.id)}
            //           >
            //             Cancel
            //           </button>
            //         </div>
            //       );
            //     })
            //   ) : (
            //     <button
            //       className="mt-2"
            //       style={{ backgroundColor: "red" }}
            //       onClick={() => handleReqsCancel(each.id)}
            //     >
            //       Cancel.
            //     </button>
            //   )}
            // </div>
          ))
        ) : (
          <div>
            <h4>No sent Request</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sent;
