import React, { Component }  from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ContactViewed = ({ user }) => {
  const history = useNavigate();
  const [data, setUserData] = useState([]);
  const userId = user && user.tokenUser.userId;
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    setDataLoading(true)
    fetch(process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.contactViewed);
        var datatostore = [];
        let maxLength = res.contactViewed.length;
        res.contactViewed.forEach((user) => {
          axios
            .get(
              process.env.REACT_APP_API_URL+`user/get_single_user_id/${user && user._id}`
            )
            .then((res) => {
              //  console.log(res.data)
              // setRecentlyViewedBy([...recentlyViewedBy,res.data]);
              datatostore.push(res.data);
              if (datatostore.length === maxLength) {
                setUserData(datatostore);
              }
            });
        });
        setDataLoading(false)
      });
  }, [userId]);
  const handleProfleVisist = (id, name, profilePicId, user) => {
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/add_reviewed_profile/${id}/${name}/${profilePicId}/${userId}` // add visited profile by this user to user's profile
      )
      .then((res) => {
        axios.post(
          process.env.REACT_APP_API_URL+`user/add_visitedby_profile/${id}/${userId.name}/${userId}/n-a` // add this user's profile to user's profile visited by this user's
        );
        console.log("Viewed");
      })
      .catch((err) => console.log(err));
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
        Your contact viewed by</h4> <hr /> </div>
      <div className="row">
        {data && data.length ? (
          data.map((userMatched) => (
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
                          </div>
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
            <h4>No Contact Viewed</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactViewed;
