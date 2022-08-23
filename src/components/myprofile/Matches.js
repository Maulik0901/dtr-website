import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Matches({ user, filter }) {
  const history = useNavigate();
  const [recommendedUser, setRecommendedUser] = useState([]);
  const [refreshView, setRefreshView] = useState(false);
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const [matchePageHeader, setMatchePageHeader] = useState("");
  const userId = user && user.tokenUser;
  const [dataLoading, setDataLoading] = useState(true);
  const [ignoreList, setIgnoreList] = useState([]);
  const [sentReqs, setSentReqs] = useState([]);
  const [shortListByMe, setShortListByMe] = useState([]);
  const [partnerPreference, setPartnerPreference] = useState([]);
  const mygender = localStorage.getItem("dtrusergender");
  // const [mygender, setMygender] = useState("")
  
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL+`user/get_single_user_id/${
          user && user.tokenUser.userId
        }`
      )
      .then((res) => {
        // setMygender(res.data.gender);
        setIgnoreList(res.data.ignore);
        setSentReqs(res.data.sentReqs);
        setShortListByMe(res.data.shortListByMe);
        setPartnerPreference(res.data.partnerPreference);
        if (filter === "TodaysMatches") {
          setMatchePageHeader("Today's MATCHES FOR YOU");
          axios
            .get(
              process.env.REACT_APP_API_URL+`life/todays_matches_by_user_preferrences?age=${partnerPreference.age?.from}&ageTo=${partnerPreference.age?.to}`
            )
            .then((res) => {
              setRecommendedUser(
                res.data.filter((e) => e.gender !== mygender).reverse()
              );
              setDataLoading(false);
              // history("/ViewProfile", { state: { data: res.data } })
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (filter === "MyMatches") {
          setMatchePageHeader("Your preferred MATCHES ");
              // &height=${height}&motherTongue=${motherTongue}&maritalStatus=${maritalStatus}&community=${cast}&subCommunity=${subCast}&education=${education}
              axios
                .get(
                  process.env.REACT_APP_API_URL+`life/matches_by_user_preferrences?age=${partnerPreference.age?.from}&ageTo=${partnerPreference.age?.to}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `${userInfo}`,
                    },
                  }
                )
                .then((res) => {
                  setRecommendedUser(
                    res.data.filter((e) => e.gender !== mygender).reverse()
                  );
                  setDataLoading(false);
                  // history("/ViewProfile", { state: { data: res.data } })
                })
                .catch((err) => {
                  console.log(err);
                });
        }
        if (filter === "MoreMatches") {
          setMatchePageHeader("More Matches for you");
          axios
            .get(process.env.REACT_APP_API_URL+"user/users")
            .then((res) => {
              setRecommendedUser(
                res.data
                  .filter((e) => e.gender && e.gender !== mygender)
                  .reverse()
              );

              setDataLoading(false);
            });
        }
      });
    //warp whole code
  }, [refreshView, userInfo, filter, user]);

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
        {matchePageHeader}
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
          }}
          class="spinner-border"
          role="status"
        ></div>
      )}
      <div
        className="recommended-match"
        style={{ flexWrap: "wrap", width: "70%" }}
      >
        {/* {recommendedUser.map((user, index) => console.log(ignoreList.map((e) => e._id === user._id)))} */}
        {recommendedUser && recommendedUser.length > 0 ? (
          recommendedUser.map(
            (user, index) =>
              user.gender !== mygender &&
              user?.accountStatus === "Active" && user?.profileStatus === "Vissible" &&  (
                <div
                  key={index}
                  className="col-sm-12 px-0"
                  style={{
                    margin: "0 auto",
                    // display: `${ignoreList?.map((ig) =>
                    //   ig._id === user._id && "none"
                    // )}`,
                  }}
                >
                  <div className="ribbon-card">
                    <div className="ribbon-box">
                      <div className="col-12 edit-phone p-3 mb-2">
                        <div className="row">
                          <div
                            className="col-sm-3"
                            style={{ paddingRight: "20px" }}
                          >
                            <img
                              className="d-block w-100 mb-3 profile-list-img"
                              src={user?.profilePic?.url}
                              alt="Dtr Search Profile"
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
                          </div>
                          <div className="col-sm-9">
                            <div className="row">
                              <div className="col-sm-5">
                                <div>
                                  <h5 className="font-weight-bold d-inline-block mr-2">
                                    {user?.name}
                                  </h5>
                                </div>
                                <p className="font-14 short-info mr-1">
                                  <a
                                    href=" "
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    {user?._id}
                                  </a>
                                </p>
                                <p className="font-14 pr-1 mb-0">
                                  {user?.BasicsAndLifestyle[0]?.Grewupin}
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
                                      state: { data: [user], admin: false },
                                    });
                                    handleProfleVisist(
                                      user._id,
                                      user.name,
                                      user.profilePicId
                                    );
                                  }}
                                >
                                  View Profile
                                </a>
                                {/* sdfs */}
                                <span className="d-inline-block">
                                  {user.matchedPeople &&
                                    user.matchedPeople.map(
                                      (each_user) =>
                                        each_user.id === userId.userId && (
                                          <button className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-success">
                                            <span className="">Matched</span>
                                          </button>
                                        )
                                    )}
                                  {user.requestedReqs.map(
                                    (each) =>
                                      each.id === userId.userId && (
                                        <div>
                                          <button
                                            className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                                            onClick={() =>
                                              handleReqsCancel(user._id)
                                            }
                                          >
                                            Cancel Interest
                                          </button>
                                        </div>
                                      )
                                  )}
                                  {user.requestedReqs.map(
                                    (each) =>
                                      each.id != userId.userId && (
                                        <button
                                          style={{
                                            display: `${
                                              each.id === userId.userId &&
                                              "none"
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
                                      )
                                  )}
                                  {user.requestedReqs.length ? (
                                    " "
                                  ) : (
                                    <button
                                      // style={{
                                      //   display: `${
                                      //     each.id !== userId.userId
                                      //       ? "inline-block"
                                      //       : "none"
                                      //   }`,
                                      // }}
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
                                  )}
                                  {/* {sentReqs.map(each => each.id === user._id ? <button
                                          className="bnr-btn mx-2 font-14 mobile-margin-top btn btn-primary"
                                          onClick={() =>
                                            handleReqsCancel(user._id)
                                          }
                                        >
                                          Cancel Interest
                                        </button> : <button
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
                                      Send Interest1
                                    </button>)} */}
                                </span>
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

                            <hr />
                            <div>
                              <div className="row">
                                <div className="col-sm-12 px-0">
                                  <div className="d-flex col-sm-12 px-0">
                                    <div className="col-sm-3">
                                      <p className="font-14 field-title">
                                        Age, Height
                                      </p>
                                    </div>
                                    <div className="col-sm-6">
                                      <p className="font-14">
                                        {user &&
                                          user?.BasicsAndLifestyle[0]?.Age}{" "}
                                        Yrs,{" "}
                                        {user &&
                                          user?.BasicsAndLifestyle[0]?.Height}
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
                                    <div className="col-sm-3">
                                      <p className="font-14 field-title">
                                        Caste:
                                      </p>
                                    </div>
                                    <div className="col-sm-6">
                                      <p className="font-14">
                                        {
                                          user?.ReligiousBackground[0]
                                            ?.Community
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-12 px-0">
                                  <div className="d-flex col-sm-12 px-0">
                                    <div className="col-sm-3">
                                      <p className="font-14 field-title">
                                        Education:
                                      </p>
                                    </div>
                                    <div className="col-sm-6">
                                      <p className="font-14">
                                        {
                                          user?.EducationAndCareer[0]
                                            ?.HighestQualification
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-12 px-0">
                                  <div className="d-flex col-sm-12 px-0">
                                    <div className="col-sm-3">
                                      <p className="font-14 field-title">
                                        Occupation:
                                      </p>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <h4
            className="mt-3"
            style={{
              display: `${dataLoading ? "none" : "block"}`,
            }}
          >
            Nothing Found :)
          </h4>
        )}
      </div>
    </div>
  );
}
