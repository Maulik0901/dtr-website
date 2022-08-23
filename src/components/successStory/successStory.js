import React, { useEffect, useState } from "react";
import "./successStory.css";
import {
  RiLoginCircleFill,
  RiChatHeartFill,
  RiFileUserLine,
} from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import SuccessStoryCarousel from "./successStoryCarousel";
import couple from "../../Assets/images/couple.png";
import axios from "axios";

export default function SuccessStory({ user }) {
  const [recommendedUser, setRecommendedUser] = useState([]);
  const [refreshView, setRefreshView] = useState(false);
  const userId = user && user.tokenUser;
  const [gender, setGender] = useState("");
  const [Bride, setBride] = useState([]);
  const [Groom, setGroom] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+"user/users").then((res) => {
      setRecommendedUser(res.data?.reverse());
      // let bride=res.data.filter(user=>user.gender=="Woman")
      // let groom=res.data.filter(user=>user.gender=="Man")
      setBride(res.data.filter((user) => user.gender == "Woman").reverse());
      setGroom(res.data.filter((user) => user.gender == "Man").reverse());
    });
  }, [refreshView, user]);
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
        process.env.REACT_APP_API_URL+`user/cancel_request_receiver/${id}/${userId.userId}/`
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
  return (
    <div className="successStory">
      <div className="successStory__box-1">
        <h1 className="successStory__heading-1">Find your Special Someone</h1>
        <ul className="ul-1">
          <li className="card">
            <RiLoginCircleFill
              size={150}
              color="#ff5a60"
              style={{ margin: "auto" }}
            />
            <h3>Sign Up</h3>
            <p>Register for free & put up your Matrimony Profile</p>
          </li>
          <li className="card">
            <FaUserFriends
              size={150}
              color="#ff5a60"
              style={{ margin: "auto" }}
            />
            <h3>Connect</h3>
            <p>Select & Connect with Matches you like</p>
          </li>
          <li className="card">
            <RiChatHeartFill
              size={150}
              color="#ff5a60"
              style={{ margin: "auto" }}
            />

            <h3>Interact</h3>
            <p>Become a Premium Member & Start a Conversation</p>
          </li>
          {/* <li className="card">
          <img src={couple} className="couple-1" alt=""  style={{margin:'auto', filter:'grayscale(1)', width: '13.5rem'}}/>

            <h3>Latest Bride and Groom </h3>
            <p>Become a Premium Member & Start a Conversation</p>
          </li> */}
        </ul>
      </div>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="successStory__heading-1">Latest Bride</h1>
          <div className="recommended-match" style={{ width: "100%", height: "100%"}}>
            {Bride &&
              Bride.length > 0 &&
              Bride.map(
                (user, index) =>
                  user.gender == "Woman" &&
                  index < 4 && (
                    <div className="user-card" key={index}>
                      {user?.profilePic ? (
                        <img src={user?.profilePic?.url} alt="" style={{width: '100%', height: '100px'}} />
                      ) : (
                        <RiFileUserLine size={"100%"} color="grey" />
                      )}
                      <div className="name">
                        <button
                        // onClick={
                        //   () =>
                        //     handleProfleVisist(
                        //       user._id,
                        //       user.name,
                        //       user.profilePicId
                        //     )
                        //   //   {
                        //   //   history("/profile", {
                        //   //     state: { user: user, recommendedUser: recommendedUser },
                        //   // }
                        //   // );
                        // }
                        >
                          {user?.name}
                        </button>
                      </div>
                      {/* {user.matchedPeople &&
                    user.matchedPeople.map((each_user) =>
                      each_user.id === userId.userId ? (
                        <button className="mt-2 bg-success">Matched</button>
                      ) : (
                        <div
                          style={{
                            display: `${
                              each_user.id !== userId.userId && "none"
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
                                        each.id === userId.userId
                                          ? "block"
                                          : "none"
                                      }`,
                                    }}
                                    className="mt-2"
                                    onClick={() => handleReqsCancel(user._id)}
                                  >
                                    Cancel Request
                                  </button>
                                  <button
                                    style={{
                                      display: `${
                                        each.id !== userId.userId
                                          ? "block"
                                          : "none"
                                      }`,
                                    }}
                                    className="mt-2"
                                    onClick={() =>
                                      handleSentRequest(
                                        user._id,
                                        user.name,
                                        user.profilePicId
                                      )
                                    }
                                    // disabled
                                  >
                                    Send Request.
                                  </button>
                                </div>
                              );
                            })
                          ) : (
                            <button
                              className="mt-2"
                              onClick={() =>
                                handleSentRequest(
                                  user._id,
                                  user.name,
                                  user.profilePicId
                                )
                              }
                            >
                              Send Request
                            </button>
                          )}
                        </div>
                      )
                    )}
                  <div
                    style={{
                      display: `${user.matchedPeople.length && "none"}`,
                    }}
                  >
                    {user.requestedReqs && user.requestedReqs.length ? (
                      user.requestedReqs.map(function (each) {
                        return (
                          <div key={each.id}>
                            <button
                              style={{
                                display: `${
                                  each.id === userId.userId ? "block" : "none"
                                }`,
                              }}
                              className="mt-2"
                              onClick={() => handleReqsCancel(user._id)}
                            >
                              Cancel Request
                            </button>
                            <button
                              style={{
                                display: `${
                                  each.id !== userId.userId ? "block" : "none"
                                }`,
                              }}
                              className="mt-2"
                              onClick={() =>
                                handleSentRequest(
                                  user._id,
                                  user.name,
                                  user.profilePicId
                                )
                              }
                              // disabled
                            >
                              Send Request.
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <button
                        className="mt-2"
                        onClick={() =>
                          handleSentRequest(
                            user._id,
                            user.name,
                            user.profilePicId
                          )
                        }
                      >
                        Send Request..
                      </button>
                    )}
                  </div> */}
                    </div>
                  )
              )}
          </div>

          <h1 className="successStory__heading-1">Latest Groom</h1>
          <div className="recommended-match" style={{ width: "100%" }}>
            {Groom &&
              Groom.length > 0 &&
              Groom.map(
                (user, index) =>
                  user.gender == "Man" &&
                  index < 4 && (
                    <div className="user-card" key={index}>
                      {user?.profilePic ? (
                        <img src={user?.profilePic?.url} alt="" style={{width: '100%', height: '100px'}} />
                      ) : (
                        <RiFileUserLine size={"100%"} color="grey" />
                      )}
                      <div className="name">
                        <button
                        // onClick={
                        //   () =>
                        //     handleProfleVisist(
                        //       user._id,
                        //       user.name,
                        //       user.profilePicId
                        //     )
                        //   //   {
                        //   //   history("/profile", {
                        //   //     state: { user: user, recommendedUser: recommendedUser },
                        //   // }
                        //   // );
                        // }
                        >
                          {user?.name}
                        </button>
                      </div>
                      {/* {user.matchedPeople &&
                    user.matchedPeople.map((each_user) =>
                      each_user.id === userId.userId ? (
                        <button className="mt-2 bg-success">Matched</button>
                      ) : (
                        <div
                          style={{
                            display: `${
                              each_user.id !== userId.userId && "none"
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
                                        each.id === userId.userId
                                          ? "block"
                                          : "none"
                                      }`,
                                    }}
                                    className="mt-2"
                                    onClick={() => handleReqsCancel(user._id)}
                                  >
                                    Cancel Request
                                  </button>
                                  <button
                                    style={{
                                      display: `${
                                        each.id !== userId.userId
                                          ? "block"
                                          : "none"
                                      }`,
                                    }}
                                    className="mt-2"
                                    onClick={() =>
                                      handleSentRequest(
                                        user._id,
                                        user.name,
                                        user.profilePicId
                                      )
                                    }
                                    // disabled
                                  >
                                    Send Request.
                                  </button>
                                </div>
                              );
                            })
                          ) : (
                            <button
                              className="mt-2"
                              onClick={() =>
                                handleSentRequest(
                                  user._id,
                                  user.name,
                                  user.profilePicId
                                )
                              }
                            >
                              Send Request
                            </button>
                          )}
                        </div>
                      )
                    )}
                  <div
                    style={{
                      display: `${user.matchedPeople.length && "none"}`,
                    }}
                  >
                    {user.requestedReqs && user.requestedReqs.length ? (
                      user.requestedReqs.map(function (each) {
                        return (
                          <div key={each.id}>
                            <button
                              style={{
                                display: `${
                                  each.id === userId.userId ? "block" : "none"
                                }`,
                              }}
                              className="mt-2"
                              onClick={() => handleReqsCancel(user._id)}
                            >
                              Cancel Request
                            </button>
                            <button
                              style={{
                                display: `${
                                  each.id !== userId.userId ? "block" : "none"
                                }`,
                              }}
                              className="mt-2"
                              onClick={() =>
                                handleSentRequest(
                                  user._id,
                                  user.name,
                                  user.profilePicId
                                )
                              }
                              // disabled
                            >
                              Send Request.
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <button
                        className="mt-2"
                        onClick={() =>
                          handleSentRequest(
                            user._id,
                            user.name,
                            user.profilePicId
                          )
                        }
                      >
                        Send Request..
                      </button>
                    )}
                  </div> */}
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
