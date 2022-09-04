import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FaUserEdit } from "react-icons/fa";
import { RiFileUserLine } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import AddIcon from "../Assets/icons/add-image-svgrepo-com.svg";
import Profile from "../components/myprofile/Profiles";
import "./dashboard.css";
import Setting from "./Setting";
import { Link, useNavigate } from "react-router-dom";
import { communityData } from "../communityData";
import { Nav } from "react-bootstrap";
const optionsMarital = [
  {
    label: "Divorce",
    value: "Divorce",
  },
  {
    label: "Widow",
    value: "Widow",
  },
  {
    label: "Never married",
    value: "Never married",
  },
  {
    label: "Never married",
    value: "Never married",
  },
];
const optionsReligion = [
  {
    label: "Hindu",
    value: "Hindu",
  },
  {
    label: "Muslim",
    value: "Muslim",
  },
  {
    label: "Sikh",
    value: "Sikh",
  },
  {
    label: "Pineapple",
    value: "pineapple",
  },
];
const optionsCommunity = [
  {
    label: "community 1",
    value: "community 1",
  },
  {
    label: "community 2",
    value: "community 2",
  },
  {
    label: "community 3",
    value: "community 4",
  },
  {
    label: "community y",
    value: "community y",
  },
];
const optionsMother = [
  {
    label: "english",
    value: "english",
  },
  {
    label: "hindi",
    value: "hindi",
  },
  {
    label: "tamil",
    value: "tamil",
  },
  {
    label: "gujarati",
    value: "gujarati",
  },
];
export default function Dashboard(props) {
  const [tabs, setTabs] = useState(props?.tab);
  useEffect(() => {
    setTabs(props?.tab);
  }, [props, setTabs]);
  const userData = props?.user;
  
  const [user, setUser] = useState([]);
  const [selectedFile, setSElectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef();
  const [profilePictureId, setProfilePictureId] = useState("");
  const history = useNavigate();
  const [recentlyViewedByME, setRecentlyViewedByMe] = useState([]);
  const [recentlyViewedBy, setRecentlyViewedBy] = useState([]);
  const [previewSrc, setPreviewSrc] = useState([]); //my photos
  const [fileType, setFileType] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  // const [images, setImages] = useState([]);
  let id = userData.tokenUser.userId;
  const [partnerPreference, setPartnerPreference] = useState({});
  const [shortListed, setShorlisted] = useState({});
  const [shortListedByMe, setShorlistedByMe] = useState({});
  const [interestSent, setInterestSent] = useState({});
  const [contactViewed, setContactViewed] = useState({});
  const [interestReceived, setInterestReceived] = useState({});
  const [horoscopeDownloader, setHoroscopeDownloader] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [age, setAge] = useState({});
  const [heightsFrom, setHeightFrom] = useState("");
  const [heightsTo, setHeightTo] = useState("");
  const [religion, setreligion] = useState("Hindu");
  const [community, setcommunity] = useState("");
  const [motherTongue, setmotherTongue] = useState("");
  const [maritalStatus, setmaritalStatus] = useState("");
  const [aboutPartner, setAboutPartner] = useState("");
  const [AnnualIncome, setAnnualIncome] = useState();
  const mygender = localStorage.getItem("dtrusergender");
  const [newMatches, setNewMatches] = useState([]);
  const [userStatus,setUserStatus] = useState(0);

  const handleChangeAge = (e) => {
    const { name, value } = e.target;
    

    setAge({
      ...age,
      [name]: value,
    });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        process.env.REACT_APP_API_URL+`user/get_single_user_id/${id}`
      )
      .then((res) => {
        console.log("get singleuser",res.data)
        if(res.data.status){
          setUserStatus(res.data.status);
        } else {
          setUserStatus(4);
        }
        
        if (!mygender) {
          localStorage.setItem("dtrusergender", res.data?.gender);
        }
        if (mygender !== res.data?.gender) {
          localStorage.setItem("dtrusergender", res.data?.gender);
        }
        setNewMatches(res.data.matchedPeople);
        setRecentlyViewedByMe(res.data.recentlyViewed);
        setPreviewSrc(res.data?.myPhotos.reverse());
        setProfilePicUrl(res.data?.profilePic?.url);
        setRecentlyViewedBy(res?.data?.profileViewedBy);
        setShorlisted(res?.data?.shortList);
        setShorlistedByMe(res?.data?.shortListByMe);
        setInterestSent(res?.data?.sentReqs);
        setInterestReceived(res?.data?.acceptedReqs);
        setContactViewed(res?.data?.contactViewed);
        setPartnerPreference(res?.data?.partnerPreference);
        setAge({
          from: res?.data?.partnerPreference?.age?.from,
          to: res?.data?.partnerPreference?.age?.to,
        });
        setHoroscopeDownloader(res?.data?.horoscopeDownloader);
        setHeightFrom(res?.data?.partnerPreference?.heightsFrom);
        setHeightTo(res?.data?.partnerPreference?.heightsTo);
        setcommunity(res.data?.partnerPreference?.community);
        setmotherTongue(res?.data?.partnerPreference?.motherTongue);
        setmaritalStatus(res?.data?.partnerPreference?.maritalStatus);
        setAboutPartner(res?.data?.partnerPreference?.aboutPartner);
        setAnnualIncome(res?.data?.partnerPreference?.annualIncome);
        setUser([res.data]);
        setLoading(false);
      });
  }, [id, refresh]);
  const [matchedUser, setMatchedUser] = useState([]);
  useEffect(() => {
    // setting new matched full profile
    let datatostore = [];
    let maxLength = newMatches.length;
    newMatches.forEach((user) => {
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
            setMatchedUser(datatostore);
          }
        });
    });
  }, [newMatches]);
  const [recommendedUser, setRecommendedUser] = useState([]);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL+`life/todays_matches_by_user_preferrences?age=${partnerPreference.age?.from}&ageTo=${partnerPreference.age?.to}`
      )
      .then((res) => {
        setRecommendedUser(
          res.data.filter((e) => e.gender !== mygender).reverse()
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const uploadFileHandler = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    console.log(file);
    setFileType(file.type);
    if (file.type.substring(0, 5) === "image") {
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      bodyFormData.set("key", "178218f045ee799c77be43a0e8b0ba0b");
      axios
        .post("https://api.imgbb.com/1/upload", bodyFormData)
        .then((res) => {
          setPreviewSrc([...previewSrc, URL.createObjectURL(file)]);
          const bodyData = {
            id: id,
            url: res.data.data.url,
          };
          axios
            .post(
              process.env.REACT_APP_API_URL+"user/upload_myphotos",
              bodyData
            )
            .then((res) => {
              setRefresh(!refresh);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  const makePrimaryPicture = (url) => {
    setLoading(true);
    const bodyData = {
      id: id,
      url: url,
    };
    axios
      .post(
        process.env.REACT_APP_API_URL+"user/set_profile_pic",
        bodyData
      )
      .then((res) => {
        setLoading(false);
        alert("Set as primary!");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const deletePhoto = (url) => {
    setLoading(true);
    const bodyData = {
      id: id,
      url: url,
    };
    axios
      .post(
        process.env.REACT_APP_API_URL+"user/delete_photo",
        bodyData
      )
      .then((res) => {
        setRefresh(!refresh);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const addPartnerPreference = (e) => {
    e.preventDefault();
    const data = {
      age: age,
      heightsFrom: heightsFrom,
      heightsTo: heightsTo,
      religion: religion,
      community: community,
      motherTongue: motherTongue,
      maritalStatus: maritalStatus,
      aboutPartner: aboutPartner,
      annualIncome: AnnualIncome,
    };
    axios
      .post(
        process.env.REACT_APP_API_URL+`user/partner_preference/${id}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("dtrmatrimonyjwt"),
          },
        }
      )
      .then((data) => {
        alert("Partner Preference Saved");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   if (userData) {
  //     setUser([userData.tokenUser]);
  //   }
  // }, []);

  const uploadImage = (event) => {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);
    axios
      .post(
        process.env.REACT_APP_API_URL+"user/editprofilepic",
        formData,
        {
          headers: { Authorization: localStorage.getItem("dtrmatrimonyjwt") },
        }
      )
      .then((res) => {
        if (res.status === 200 && res.data.updatedUser) {
          getProfilePic(res?.data?.updatedUser);
        } else {
          console.log("Error");
        }
      })
      .catch((Err) => console.log(Err));
  };
  const getProfilePic = (profilePicId) => {
    axios
      .get(process.env.REACT_APP_API_URL+`user/${profilePicId}`)
      .then((file) => setSElectedFile(file.data));
  };
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL+`user/getuser/${userData?.tokenUser?.userId}`
      )
      .then((data) => {
        getProfilePic(data?.data?.profilePicId);
        setProfilePictureId(data.data.profilePicId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <>
      
      
        <>
          <div className="" id="" style={{ borderTop: "1px solid #e5e2e2" }}>

            {
              userStatus && userStatus == 4 &&
              <Nav
                className="justify-content-center mt-1 dashboard-nav"
                activeKey="/home"
              >
                <p
                  className={
                    tabs == 0
                      ? "styles__Link-dWIqvV euJzSi rounded"
                      : "styles__Link-dWIqvV bsvHMq"
                  }
                  onClick={() => navigate("/Dashboard")}
                >
                  Dashboard
                </p>
                <p
                  className={
                    tabs == 1
                      ? "styles__Link-dWIqvV euJzSi rounded"
                      : "styles__Link-dWIqvV bsvHMq"
                  }
                  onClick={() => navigate("/myProfile")}
                >
                  My Profile
                </p>
                <p
                  className={
                    tabs == 2
                      ? "styles__Link-dWIqvV euJzSi rounded"
                      : "styles__Link-dWIqvV bsvHMq"
                  }
                  onClick={() => navigate("/myPhotos")}
                >
                  My Photos
                </p>
                <p
                  className={
                    tabs == 3
                      ? "styles__Link-dWIqvV euJzSi rounded"
                      : "styles__Link-dWIqvV bsvHMq"
                  }
                  onClick={() => navigate("/partnerPreference")}
                >
                  Partner Preferences
                </p>
                <p
                  className={
                    tabs == 4
                      ? "styles__Link-dWIqvV euJzSi rounded"
                      : "styles__Link-dWIqvV bsvHMq"
                  }
                  onClick={() => navigate("/setting")}
                >
                  Settings
                </p>
              </Nav>
            }
            
          </div>
          <div>
            <div>
              {tabs === 0 ? (
                <div>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-3">
                          <div style={{ width: "100%" }}>
                            <div
                              id="profilecard"
                              className="profile-card profile-card__under-screening w-100"
                            >
                              <div
                                id="profilecard-photo"
                                className="profile-card--photo-wrapper"
                              >
                                <div
                                  className="photo-carousel"
                                  name="SH09351806"
                                  style={{
                                    borderRadius:
                                      "5px 5px 0px 0px; overflow: hidden;",
                                  }}
                                >
                                  <div className="slick-slider slick-initialized">
                                    <div className="slick-list">
                                      <div
                                        className="slick-track"
                                        style={{
                                          width: "230px",
                                          opacity: 1,
                                          transform: "translate3d(0px, 0px, 0px)",
                                        }}
                                      >
                                        <div
                                          data-index="0"
                                          className="slick-slide slick-active slick-current"
                                          tabindex="-1"
                                          aria-hidden="false"
                                          style={{
                                            outline: "none",
                                            width: "100%",
                                          }}
                                        >
                                          <div>
                                            <div
                                              tabindex="-1"
                                              style={{
                                                width: "100%",
                                              }}
                                            >
                                              <div
                                                className="photo-carousel--photo w-100 mt-2 rounded"
                                                style={{
                                                  background: `url(${profilePicUrl}) center center / cover no-repeat`,
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="profile-card--photo--action">
                            <button
                              className="simpletiny-tooltip simpletiny-tooltip__hoverable profile-card--photo--action--button"
                              id="profileCardPhotoAction"
                              onClick={() => fileRef.current.click()}
                            >
                              <input
                                type="file"
                                ref={fileRef}
                                style={{ display: "none" }}
                                onChange={uploadImage}
                              />
                              <div className="simpletiny-tooltip--label simpletiny-tooltip--label__top  ">
                                Add Photos
                              </div>
                              <FaUserEdit />
                            </button>
                          </div> */}
                              </div>
                              <div className="profile-card--list">
                                <div
                                  id="profilecard-basicInfo"
                                  className="profile-card--list--item profile-card--list--item__basic"
                                >
                                  <div className="absolute-hr absolute-hr--bottom"></div>
                                  <div className="profile-card--user">
                                    <div
                                      className="profile-card--label profile-card--user--profileid"
                                      id="profileCardId"
                                      data-myshaadi-profilecard-profileid="true"
                                    >
                                      {user && user.length > 0 && user[0].email}
                                    </div>
                                    <div
                                      className="profile-card--user--name"
                                      id="profileCardName"
                                      data-myshaadi-profilecard-name="true"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {user && user.length > 0 && user[0].name}
                                    </div>
                                    {/* <div className="profile-card--screening-message">
                              Profile name is currently under screening.
                            </div> */}
                                  </div>
                                  {/* <div
                              className="profile-card--list--item--action"
                              data-myshaadi-profilecard-action="true"
                            >
                              <a
                                className="profile-card--link"
                                target=""
                                title=""
                                href="/my-shaadi/personal-profile?source=my_shaadi_profilecard"
                              >
                                Edit
                              </a>
                            </div> */}
                                </div>

                                <div
                                  id="profilecard-verification"
                                  className="profile-card--list--item profile-card--list--item__verify"
                                >
                                  <div className="absolute-hr absolute-hr--top"></div>
                                  <div className="profile-card--user">
                                    <div
                                      className="profile-card--label"
                                      id="profileCardVerification"
                                      data-myshaadi-profilecard-verification-text="true"
                                    >
                                      <div>Mobile number verified</div>
                                      <a
                                        className="hoverable"
                                        target=""
                                        title=""
                                        href="/my-shaadi/trust-badge?source=my_shaadi_profilecard"
                                      >
                                        Verify your ID
                                      </a>
                                    </div>
                                  </div>

                                  <div
                                    className="profile-card--list--item--action"
                                    data-myshaadi-profilecard-verification-badge="true"
                                    style={{ marginRight: "0px" }}
                                  >
                                    <svg
                                      width="25px"
                                      height="30px"
                                      viewBox="0 0 25 30"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <defs>
                                        <filter
                                          x="-40.0%"
                                          y="-32.0%"
                                          width="180.0%"
                                          height="164.0%"
                                          filterUnits="objectBoundingBox"
                                          id="filter-1"
                                        >
                                          <feOffset
                                            dx="0"
                                            dy="2"
                                            in="SourceAlpha"
                                            result="shadowOffsetOuter1"
                                          ></feOffset>
                                          <feGaussianBlur
                                            stdDeviation="1"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                          ></feGaussianBlur>
                                          <feColorMatrix
                                            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0985903533 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                            result="shadowMatrixOuter1"
                                          ></feColorMatrix>
                                          <feMerge>
                                            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                            <feMergeNode in="SourceGraphic"></feMergeNode>
                                          </feMerge>
                                        </filter>
                                      </defs>
                                      <g
                                        id="Mobile+Facebook+Verified"
                                        stroke="none"
                                        stroke-width="1"
                                        fill="none"
                                        fill-rule="evenodd"
                                      >
                                        <g
                                          id="Group-14"
                                          transform="translate(2.800000, 3.000000)"
                                          stroke="#9D9DA5"
                                        >
                                          <g
                                            id="Group-11"
                                            filter="url(#filter-1)"
                                            fill="#FFFFFF"
                                            stroke-width="1.5"
                                          >
                                            <path
                                              d="M9.81876794,0.880640393 L0.75,3.70956822 L0.75,15.1521359 C1.20861903,17.3830256 2.84941448,19.3773642 5.32486865,21.0990481 C6.38601226,21.8370758 7.52731085,22.4728322 8.66880987,23.0033355 C9.06815134,23.1889265 9.43835613,23.3478336 9.76948792,23.4798928 C9.81601234,23.4984472 9.85922525,23.5154768 9.89899381,23.5309801 C10.7826965,23.1328418 11.6002339,22.7220233 12.3538552,22.2997838 C15.28,20.6603214 17.1272316,18.9293727 18.1263825,17.2215407 C18.4690543,16.6358175 18.68403,16.0967681 18.7987348,15.6164707 C18.8661575,15.3341548 18.8858534,15.137002 18.8836958,15.0382849 C18.883764,15.0411042 18.883764,15.0411042 18.8833339,15.0155973 L18.8833339,3.6597253 L9.81876794,0.880640393 Z"
                                              id="Shape"
                                            ></path>
                                          </g>
                                          <path
                                            d="M9.07900017,16 L5.29295314,13.2471931 C5.08224381,13.0940287 4.97278385,12.8447436 5.00580575,12.5932411 C5.03882766,12.3417386 5.20931462,12.1262279 5.45304586,12.0278898 C5.69677709,11.9295517 5.97672402,11.963326 6.18743334,12.1164904 L8.72009808,13.9583156 L12.6421209,8.31898944 C12.788129,8.10663679 13.0415614,7.98546335 13.3063583,8.0013981 C13.5711552,8.01733286 13.8067887,8.16793694 13.9239453,8.39612613 C14.0411019,8.62431531 14.0218505,8.89516451 13.8734881,9.10601239 L9.07900017,16 Z"
                                            id="Shape"
                                            stroke-width="0.2"
                                            fill="#9D9DA5"
                                            fill-rule="nonzero"
                                          ></path>
                                        </g>
                                      </g>
                                    </svg>
                                  </div>
                                </div>
                                <div
                                  id="profilecard-verification"
                                  className="profile-card--list--item profile-card--list--item__verify"
                                >
                                  <div className="absolute-hr absolute-hr--top"></div>
                                  <div className="profile-card--user">
                                    <div
                                      className="profile-card--label"
                                      id="profileCardVerification"
                                      data-myshaadi-profilecard-verification-text="true"
                                    >
                                      <div>Email address verified</div>
                                      <a
                                        className="hoverable"
                                        target=""
                                        title=""
                                        href="/my-shaadi/trust-badge?source=my_shaadi_profilecard"
                                      >
                                        Verify your info
                                      </a>
                                    </div>
                                  </div>

                                  <div
                                    className="profile-card--list--item--action"
                                    data-myshaadi-profilecard-verification-badge="true"
                                    style={{ marginRight: "0px" }}
                                  >
                                    <svg
                                      width="25px"
                                      height="30px"
                                      viewBox="0 0 25 30"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <defs>
                                        <filter
                                          x="-40.0%"
                                          y="-32.0%"
                                          width="180.0%"
                                          height="164.0%"
                                          filterUnits="objectBoundingBox"
                                          id="filter-1"
                                        >
                                          <feOffset
                                            dx="0"
                                            dy="2"
                                            in="SourceAlpha"
                                            result="shadowOffsetOuter1"
                                          ></feOffset>
                                          <feGaussianBlur
                                            stdDeviation="1"
                                            in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"
                                          ></feGaussianBlur>
                                          <feColorMatrix
                                            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0985903533 0"
                                            type="matrix"
                                            in="shadowBlurOuter1"
                                            result="shadowMatrixOuter1"
                                          ></feColorMatrix>
                                          <feMerge>
                                            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                                            <feMergeNode in="SourceGraphic"></feMergeNode>
                                          </feMerge>
                                        </filter>
                                      </defs>
                                      <g
                                        id="Mobile+Facebook+Verified"
                                        stroke="none"
                                        stroke-width="1"
                                        fill="none"
                                        fill-rule="evenodd"
                                      >
                                        <g
                                          id="Group-14"
                                          transform="translate(2.800000, 3.000000)"
                                          stroke="#9D9DA5"
                                        >
                                          <g
                                            id="Group-11"
                                            filter="url(#filter-1)"
                                            fill="#FFFFFF"
                                            stroke-width="1.5"
                                          >
                                            <path
                                              d="M9.81876794,0.880640393 L0.75,3.70956822 L0.75,15.1521359 C1.20861903,17.3830256 2.84941448,19.3773642 5.32486865,21.0990481 C6.38601226,21.8370758 7.52731085,22.4728322 8.66880987,23.0033355 C9.06815134,23.1889265 9.43835613,23.3478336 9.76948792,23.4798928 C9.81601234,23.4984472 9.85922525,23.5154768 9.89899381,23.5309801 C10.7826965,23.1328418 11.6002339,22.7220233 12.3538552,22.2997838 C15.28,20.6603214 17.1272316,18.9293727 18.1263825,17.2215407 C18.4690543,16.6358175 18.68403,16.0967681 18.7987348,15.6164707 C18.8661575,15.3341548 18.8858534,15.137002 18.8836958,15.0382849 C18.883764,15.0411042 18.883764,15.0411042 18.8833339,15.0155973 L18.8833339,3.6597253 L9.81876794,0.880640393 Z"
                                              id="Shape"
                                            ></path>
                                          </g>
                                          <path
                                            d="M9.07900017,16 L5.29295314,13.2471931 C5.08224381,13.0940287 4.97278385,12.8447436 5.00580575,12.5932411 C5.03882766,12.3417386 5.20931462,12.1262279 5.45304586,12.0278898 C5.69677709,11.9295517 5.97672402,11.963326 6.18743334,12.1164904 L8.72009808,13.9583156 L12.6421209,8.31898944 C12.788129,8.10663679 13.0415614,7.98546335 13.3063583,8.0013981 C13.5711552,8.01733286 13.8067887,8.16793694 13.9239453,8.39612613 C14.0411019,8.62431531 14.0218505,8.89516451 13.8734881,9.10601239 L9.07900017,16 Z"
                                            id="Shape"
                                            stroke-width="0.2"
                                            fill="#9D9DA5"
                                            fill-rule="nonzero"
                                          ></path>
                                        </g>
                                      </g>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {
                          userStatus && userStatus == 2 &&
                          <div className="col-md-6 mt-1">
                            <div className="center">
                              <p>Please check your mail and verfy your email id</p>
                            </div>                            
                          </div>                          
                        }
                        {
                          userStatus && userStatus == 3 &&
                          <div className="col-md-6 mt-1">
                            <div className="center">
                              <p>Admin is not verify your profile Please wait for admin approvel</p>
                            </div>                            
                          </div>
                        }
                        {
                          userStatus && userStatus == 4 &&
                          <>
                            <div className="col-md-6 mt-1">
                              <div
                                className="container-fluid"
                                style={{ width: "100%" }}
                              >
                                <div className="row">
                                  <div
                                    role="presentation"
                                    className="col-md-4 col-sm-6 bg-white mt-1 rounded "
                                    data-test-activitysummary-count-wrapper="pending_invitations"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="pending_invitations"
                                      >
                                        0
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      className="count-card--label"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/request");
                                      }}
                                    >
                                      Notifications
                                    </a>
                                  </div>
                                  <div
                                    role="presentation"
                                    className="col-md-4 col-sm-6 bg-white mt-1 rounded "
                                    data-test-activitysummary-count-wrapper="accepted_invitations"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="accepted_invitations"
                                      >
                                        {shortListedByMe && shortListedByMe.length}
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/shortlisted_by_you");
                                      }}
                                      className="count-card--label"
                                    >
                                      Shortlisted by you
                                    </a>
                                  </div>
                                  <div
                                    role="presentation"
                                    className="col-md-4 bg-white mt-1 rounded"
                                    data-test-activitysummary-count-wrapper="recent_visitors"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="recent_visitors"
                                      >
                                        {shortListed && shortListed.length}
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/who_shortlisted_you");
                                      }}
                                      className="count-card--label"
                                    >
                                      Who Shortlisted you
                                    </a>
                                  </div>
                                  <div
                                    role="presentation"
                                    className="col-md-4 bg-white mt-1 rounded"
                                    data-test-activitysummary-count-wrapper="recent_visitors"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="recent_visitors"
                                      >
                                        {recentlyViewedBy && recentlyViewedBy.length}
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/Recentlyviewed");
                                      }}
                                      className="count-card--label"
                                    >
                                      Who viewed my profile
                                    </a>
                                  </div>
                                  <div
                                    role="presentation"
                                    className="col-md-4 bg-white mt-1 rounded"
                                    data-test-activitysummary-count-wrapper="contacts_viewed"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="contacts_viewed"
                                      >
                                        {recentlyViewedByME?.length}
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/Recentlyviewed");
                                      }}
                                      className="count-card--label"
                                    >
                                      Whom I viewed profile
                                    </a>
                                  </div>
                                  <div
                                    role="presentation"
                                    className="col-md-4 bg-white mt-1 rounded"
                                    data-test-activitysummary-count-wrapper="chats_started"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="chats_started"
                                      >
                                        {contactViewed?.length || "0"}
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/contact_viewed");
                                      }}
                                      className="count-card--label"
                                    >
                                      contacts viewed
                                    </a>
                                  </div>
                                  <div
                                    role="presentation"
                                    className="col-md-4 bg-white mt-1 rounded"
                                    data-test-activitysummary-count-wrapper="pending_invitations"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="pending_invitations"
                                      >
                                        {interestSent?.length}
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/sent");
                                      }}
                                      className="count-card--label"
                                    >
                                      Interest Expressed
                                    </a>
                                  </div>
                                  <div
                                    role="presentation"
                                    className="col-md-4 bg-white mt-1 rounded"
                                    data-test-activitysummary-count-wrapper="accepted_invitations"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="accepted_invitations"
                                      >
                                        {interestReceived?.length}
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/request");
                                      }}
                                      className="count-card--label"
                                    >
                                      Interest Received
                                    </a>
                                  </div>
                                  <div
                                    role="presentation"
                                    className="col-md-4 bg-white mt-1 rounded"
                                    data-test-activitysummary-count-wrapper="recent_visitors"
                                    target=""
                                  >
                                    <div className="count-card--number">
                                      <span
                                        className="count-card--number--value count-card--number--value__zero"
                                        data-test-activitysummary-count="recent_visitors"
                                      >
                                        {horoscopeDownloader?.length}
                                      </span>
                                    </div>
                                    <a
                                      href=" "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/horoscope_downloader");
                                      }}
                                      className="count-card--label"
                                    >
                                      Who downloaded my horosocpe
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3">
                                <div
                                  style={{
                                    color: "grey",
                                    textTransform: "uppercase",
                                    textAlign: "center",
                                  }}
                                >
                                  {" "}
                                  <h3>Recommended Matches</h3>
                                  <hr />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    overflowX: "scroll",
                                  }}
                                >
                                  {recommendedUser?.length ?
                                    recommendedUser.map(
                                      (user, index) =>
                                        index < 10 && (
                                          <div className="bg-light m-3 rounded">
                                            <RiFileUserLine
                                              style={{
                                                height: "120px",
                                                width: "100px",
                                              }}
                                              color="grey"
                                            />
                                            <div
                                              className="rounded"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "rgb(60, 156, 194)",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  color: "white",
                                                  textAlign: "center",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  history("/profile", {
                                                    state: {
                                                      data: [user],
                                                      admin: false,
                                                    },
                                                  });
                                                }}
                                              >
                                                {user.name}
                                              </p>
                                            </div>
                                          </div>
                                        )
                                    ): <div style={{
                                      display: "flex", justifyContent: "center"
                                    }}><div style={{
                                      textAlign: "center",
                                      color: "black",
                                      width: "100%"
                                    }}>
                                      <h4>Not matched found</h4>
                                      <div
                                                  className="rounded mt-3 p-2"
                                                  style={{
                                                    backgroundColor: "rgb(60, 156, 194)",

                                                  }}
                                                >
                                                  <h5
                                                    style={{
                                                      color: "white",
                                                      textAlign: "center",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                      history("/MoreMatches");
                                                    }}
                                                  >
                                                    Find a match here
                                                  </h5>
                                                </div>
                                    </div></div> }
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 name mt-4 mt-md-0">
                              <div
                                className="mb-2"
                                style={{
                                  width: "100%",
                                  color: "grey",
                                  textTransform: "uppercase",
                                  textAlign: "center",
                                  padding: "1px",
                                }}
                              >
                                {" "}
                                <h3>New Matches</h3>
                                <hr />
                              </div>

                              {matchedUser?.length ?
                                matchedUser.map(
                                  (user, index) =>
                                    index < 2 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <div className="user-card">
                                          <RiFileUserLine size={"100%"} color="grey" />
                                          <div className="name">
                                            <button
                                              onClick={() => {
                                                history("/profile", {
                                                  state: { data: [user], admin: false },
                                                });
                                              }}
                                            >
                                              {user.name}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                ) : <div style={{
                                  textAlign: "center",
                                  color: "black"
                                }}>
                                  <h4>Not matched yet</h4>
                                  <div
                                              className="rounded mt-3 p-2"
                                              style={{
                                                width: "100%",
                                                backgroundColor: "rgb(60, 156, 194)",
                                              }}
                                            >
                                              <h5
                                                style={{
                                                  color: "white",
                                                  textAlign: "center",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  history("/MyMatches");
                                                }}
                                              >
                                                Find a match here
                                              </h5>
                                            </div>
                                </div> }
                            </div>
                          </>                            
                        }
                        {/* <div className="col-md-2 name">
                          <h3>Available Online</h3>
                          <div className="chatUser">
                            <FaUserCircle size={30} />
                            <span>
                              Priya Sharma <HiChatAlt2 size={20} />
                            </span>
                          </div>
                          <div className="chatUser">
                            <FaUserCircle size={30} />
                            <span>
                              Priya Sharma <HiChatAlt2 size={20} />
                            </span>
                          </div>
                          <div className="chatUser">
                            <FaUserCircle size={30} />
                            <span>
                              Priya Sharma <HiChatAlt2 size={20} />
                            </span>
                          </div>
                          <div className="chatUser">
                            <FaUserCircle size={30} />
                            <span>
                              Priya Sharma <HiChatAlt2 size={20} />
                            </span>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="my-shaadi-dashboard-fade-in styles__WidgetWrapper-jHUczg jOrsT"
                    type="listView"
                  ></div>
                  <div
                    className="my-shaadi-dashboard-fade-in styles__WidgetWrapper-jHUczg jOrsT"
                    type="listView"
                  ></div>
                </div>
              ) : (
                ""
              )}
              {tabs === 1 ? (
                <Profile
                  props={props}
                  profilePicture={selectedFile}
                  profilePicId={profilePictureId}
                />
              ) : (
                ""
              )}
              {tabs === 2 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  {loading && (
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
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        width: "200px",
                        height: "250px",
                      }}
                    >
                      {previewSrc?.length < 7 ? (
                        <>
                          <label for="uploadPhoto">
                            <img
                              src={AddIcon}
                              alt=" "
                              style={{ cursor: "pointer" }}
                            />
                          </label>
                          <input
                            id="uploadPhoto"
                            hidden
                            type={"file"}
                            onChange={(e) => uploadFileHandler(e)}
                          />
                          <p>You can upload {7 - previewSrc?.length} more photos</p>
                        </>
                      ) : (
                        <p>
                          You have reached max upload limit, delete to add new Image
                        </p>
                      )}{" "}
                    </div>
                    {previewSrc &&
                      previewSrc.length > 0 &&
                      previewSrc.map((image) => (
                        <div className="card">
                          {" "}
                          <img
                            alt=""
                            src={image.url ? image.url : image}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
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
                          <button
                            className="btn btn-info"
                            onClick={() => makePrimaryPicture(image.url)}
                          >
                            Use as Profile Picture
                          </button>
                          <button
                            className="btn btn-danger mt-1"
                            onClick={() => deletePhoto(image.url)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              {tabs === 3 ? (
                <div id="pp_container_b">
                  <div className="page_section">
                    <div className="pp_wrapper">
                      <div id="pp_container">
                        <h2>Tell us what you are looking for in a life partner</h2>
                        <div
                          className="pp_info_container"
                          style={{ display: "none" }}
                        >
                          <div className="head_box">
                            <ul className="numbers">
                              <li className="left">
                                <span className="numbers">1</span>Tell us what you
                                would like in a partner
                              </li>
                              <li>
                                <span className="numbers">2</span> How important is
                                this criteria?
                              </li>
                            </ul>
                            <div className="clear"></div>
                          </div>
                        </div>

                        <form
                          method="post"
                          id="partnerprofile_frm"
                          onSubmit={(e) => addPartnerPreference(e)}
                          onsubmit="false"
                        >
                          <div className="src_field">
                            <label className="form_label">
                              <span>Age</span>
                              <div className="tt rightEnd">
                                <span
                                  onmouseover="cancelclosetime();img_tool_tip('tool_top100')"
                                  onmouseout="set_tooltip_timeout('tool_top100')"
                                  id="tool_top100"
                                  style={{ display: "none", padding: "0" }}
                                  className="tooltip"
                                >
                                  <span className="top"></span>
                                  <span className="middle-tip">
                                    Set a minimum age range of 3 years to get
                                    relevant matches.
                                  </span>
                                  <span className="bottom"></span>
                                </span>
                              </div>
                              <div className="clearfix"></div>
                            </label>
                            <div className="src_field_box_range_slider">
                              <div className="range_slider">
                                <p></p>
                                <div>
                                  <label for="agefrom">From</label>
                                  <input
                                    type="number"
                                    className="age_height"
                                    defaultValue={age.from}
                                    onChange={handleChangeAge}
                                    name="from"
                                  />
                                  years
                                </div>
                                <div className="to-field">
                                  <label for="ageto">To</label>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <input
                                    type="number"
                                    className="age_height"
                                    defaultValue={age.to}
                                    name="to"
                                    onChange={handleChangeAge}
                                  />
                                  years
                                </div>
                                <div className="clearfix"></div>
                                <p></p>
                              </div>
                            </div>
                            <div className="clear"></div>
                          </div>

                          <div className="src_field">
                            <label className="form_label">
                              <span>Height</span>
                              <div className="tt rightEnd">
                                <span
                                  onmouseover="cancelclosetime();img_tool_tip('tool_top101')"
                                  onmouseout="set_tooltip_timeout('tool_top101')"
                                  id="tool_top101"
                                  // style="display: none; padding: 0"
                                  className="tooltip"
                                >
                                  <span className="top"></span>
                                  <span className="middle-tip">
                                    Set a minimum height range of 6" to get relevant
                                    matches.
                                  </span>
                                  <span className="bottom"></span>
                                </span>
                              </div>
                              <div className="clearfix"></div>
                            </label>
                            <div className="src_field_box_range_slider">
                              <div className="range_slider">
                                <p></p>
                                <div className="fl">
                                  <select
                                    id="heightfrom"
                                    style={{
                                      width: "100%",
                                      padding: "4px",
                                      borderRadius: "4px",
                                    }}
                                    name="heightfrom"
                                    value={heightsFrom}
                                    onChange={(e) => {
                                      setHeightFrom(e.target.value);
                                    }}
                                  >
                                    <option>From</option>
                                    {[
                                      "4.1",
                                      "4.2",
                                      "4.3",
                                      "4.4",
                                      "4.5",
                                      "4.6",
                                      "4.7",
                                      "4.8",
                                      "4.9",
                                      "5.0",
                                      "5.1",
                                      "5.2",
                                      "5.3",
                                      "5.4",
                                      "5.5",
                                      "5.6",
                                      "5.7",
                                      "5.8",
                                      "5.9",
                                      "6.0",
                                    ].map((e) => (
                                      <option value={e}>
                                        {e.split(".").join("ft ")}in
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="fl">
                                  <select
                                    id="heightto"
                                    style={{
                                      width: "100%",
                                      padding: "4px",
                                      borderRadius: "4px",
                                    }}
                                    name="heightto"
                                    value={heightsTo}
                                    onChange={(e) => {
                                      setHeightTo(e.target.value);
                                    }}
                                  >
                                    <option>To</option>
                                    {[
                                      "4.1",
                                      "4.2",
                                      "4.3",
                                      "4.4",
                                      "4.5",
                                      "4.6",
                                      "4.7",
                                      "4.8",
                                      "4.9",
                                      "5.0",
                                      "5.1",
                                      "5.2",
                                      "5.3",
                                      "5.4",
                                      "5.5",
                                      "5.6",
                                      "5.7",
                                      "5.8",
                                      "5.9",
                                      "6.0",
                                    ].map((e) => (
                                      <option value={e}>
                                        {e.split(".").join("ft ")}in
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="clearfix"></div>
                                <p></p>
                              </div>
                            </div>

                            <div className="clear"></div>
                          </div>
                          <div className="src_field">
                            <label for="marital_status" className="form_label">
                              Marital status
                            </label>
                            <div className="src_field_box">
                              <select
                                value={maritalStatus}
                                onChange={(e) => setmaritalStatus(e.target.value)}
                                style={{
                                  width: "500px",
                                  padding: "4px",
                                  borderRadius: "4px",
                                }}
                              >
                                <option>Select</option>
                                <option value={"Never Married"}>
                                  Never Married
                                </option>
                                <option value={"Seperated"}>Seperated</option>

                                <option value={"Divorced"}>Divorced</option>
                                <option value={"Widow/Widower"}>
                                  Widow/Widower
                                </option>
                                <option value={"Awaiting Divorce"}>
                                  Awaiting Divorce
                                </option>
                                <option value={"Annulled"}>Annulled</option>
                              </select>

                              <div className="clear"></div>
                            </div>
                          </div>

                          <div className="src_field pos_rel">
                            <label for="religion" className="form_label">
                              Religion
                            </label>
                            <div className="src_field_box">
                              <option>Select</option>
                              <select
                                value={religion}
                                style={{
                                  width: "500px",
                                  padding: "4px",
                                  borderRadius: "4px",
                                }}
                                disabled
                                onChange={(e) => setreligion(e.target.value)}
                              >
                                {optionsReligion.map((option) => (
                                  <option value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="clear"></div>
                          </div>
                          <div id="show_hide_caste">
                            <div className="src_field pos_rel">
                              <label className="form_label">Community</label>
                              <div className="src_field_box">
                                <select
                                  style={{
                                    width: "500px",
                                    padding: "4px",
                                    borderRadius: "4px",
                                  }}
                                  type="text"
                                  onChange={(e) => setcommunity(e.target.value)}
                                  value={community}
                                >
                                  <option>select</option>
                                  {communityData.communities.map((data) => (
                                    <option value={data.community}>
                                      {data.community}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="clear"></div>
                              <div
                                className="toast_notification caste_toast_notification"
                                style={{ opacity: "0" }}
                              >
                                <span className="value">Brahmin Brahmbhatt</span>{" "}
                                has been added
                              </div>
                            </div>
                          </div>

                          <div id="mothertongue_wrap" className="src_field pos_rel">
                            <label className="form_label">Mother tongue</label>
                            <div className="src_field_box">
                              <select
                                value={motherTongue}
                                onChange={(e) => setmotherTongue(e.target.value)}
                                style={{
                                  width: "500px",
                                  padding: "4px",
                                  borderRadius: "4px",
                                }}
                              >
                                <option>Select</option>
                                {[
                                  "Assamese",
                                  "Bengali",
                                  "Gujarati",
                                  "Hindi",
                                  "Kannada",
                                  "Kashmiri",
                                  "Konkani",
                                  "Malayalam",
                                  "Manipuri",
                                  "Marathi",
                                  "Nepali",
                                  "Oriya",
                                  "Punjabi",
                                  "Sanskrit",
                                  "Sindhi",
                                  "Tamil",
                                  "Telugu",
                                  "Urdu",
                                  "Bodo",
                                  "Santhali",
                                  "Maithili",
                                  "Dogri",
                                ].map((option) => (
                                  <option value={option}>{option}</option>
                                ))}
                              </select>
                              <div className="clear"></div>
                            </div>
                          </div>
                          <div id="mothertongue_wrap" className="src_field pos_rel">
                            <label className="form_label">Annual income</label>
                            <select
                              type="text"
                              onChange={(e) => setAnnualIncome(e.target.value)}
                              value={AnnualIncome}
                            >
                              <option>Select</option>
                              {[
                                "0-50 Thousands",
                                "50-1 Lakh",
                                "1-2 Lakh",
                                "2-3 Lakh",
                                "3-4 Lakh",
                                "4-5 Lakh",
                                "5-6 Lakh",
                                "6-7 Lakh",
                                "7-8 Lakh",
                                "8-9 Lakh",
                                "9-10 Lakh",
                                "10-12 Lakh",

                                "12-14 Lakh",

                                "14-16 Lakh",
                                "16-18 Lakh",
                                "18-20 Lakh",
                                "20-25 Lakh",
                                "25-30 Lakh",
                                "30-35 Lakh",
                                "35-40 Lakh",
                                "40-45 Lakh",
                                "45-50 Lakh",
                                "50-60 Lakh",
                                "60-70 Lakh",
                                "70-80 Lakh",
                                "80-90 Lakh",
                                "1 cr",
                              ].map((e) => (
                                <option value={e}>{e}</option>
                              ))}
                            </select>
                          </div>
                          <div id="mothertongue_wrap" className="src_field pos_rel">
                            <label className="form_label">
                              About Partner (optinal).
                            </label>
                            <div className="src_field_box">
                              <textarea
                                defaultValue={aboutPartner}
                                onChange={(e) => setAboutPartner(e.target.value)}
                                name="about_partner"
                                id="about_parnter"
                                style={{
                                  width: "100%",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                              ></textarea>
                              <div className="clear"></div>
                            </div>
                          </div>
                          <div
                            id="mothertongue_sugg"
                            className="pp_suggestions_wrap"
                          ></div>

                          {/* <div
                            id="more_band_wrap"
                            className="more_band_wrap"
                            onclick="$.partnerprofile.showFullForm('partnerprofile_frm');"
                          >
                            MORE <span></span>
                          </div> */}
                          <div id="expand" style={{ display: "none" }}>
                            <div className="section_heding">Location Details</div>
                            <div>
                              <div className="src_field">
                                <label className="form_label">
                                  Country living in
                                </label>
                                <div className="src_field_box">
                                  <select
                                    name="countryofresidence[]"
                                    id="countryofresidence"
                                    multiple="multiple"
                                    style={{ display: "none" }}
                                  >
                                    <option value="" label="Open to all">
                                      Open to all
                                    </option>
                                    <optgroup
                                      id="countryofresidence-optgroup-Frequently Used"
                                      label="Frequently Used"
                                    >
                                      <option
                                        value="India"
                                        label="India"
                                        selected="selected"
                                        source="dd"
                                      >
                                        India
                                      </option>
                                      <option value="USA" label="USA">
                                        USA
                                      </option>
                                      <option value="United Kingdom" label="UK">
                                        UK
                                      </option>
                                      <option
                                        value="United Arab Emirates"
                                        label="UAE"
                                      >
                                        UAE
                                      </option>
                                      <option value="Canada" label="Canada">
                                        Canada
                                      </option>
                                      <option value="Australia" label="Australia">
                                        Australia
                                      </option>
                                      <option
                                        value="New Zealand"
                                        label="New Zealand"
                                      >
                                        New Zealand
                                      </option>
                                      <option value="Pakistan" label="Pakistan">
                                        Pakistan
                                      </option>
                                      <option
                                        value="Saudi Arabia"
                                        label="Saudi Arabia"
                                      >
                                        Saudi Arabia
                                      </option>
                                      <option value="Kuwait" label="Kuwait">
                                        Kuwait
                                      </option>
                                      <option
                                        value="South Africa"
                                        label="South Africa"
                                      >
                                        South Africa
                                      </option>
                                    </optgroup>
                                    <optgroup
                                      id="countryofresidence-optgroup-More"
                                      label="More"
                                    >
                                      <option
                                        value="Afghanistan"
                                        label="Afghanistan"
                                      >
                                        Afghanistan
                                      </option>
                                      <option value="Albania" label="Albania">
                                        Albania
                                      </option>
                                      <option value="Algeria" label="Algeria">
                                        Algeria
                                      </option>
                                      <option
                                        value="American Samoa"
                                        label="American Samoa"
                                      >
                                        American Samoa
                                      </option>
                                      <option value="Andorra" label="Andorra">
                                        Andorra
                                      </option>
                                      <option value="Angola" label="Angola">
                                        Angola
                                      </option>
                                      <option value="Anguilla" label="Anguilla">
                                        Anguilla
                                      </option>
                                      <option
                                        value="Antigua &amp; Barbuda"
                                        label="Antigua &amp; Barbuda"
                                      >
                                        Antigua &amp; Barbuda
                                      </option>
                                      <option value="Argentina" label="Argentina">
                                        Argentina
                                      </option>
                                      <option value="Armenia" label="Armenia">
                                        Armenia
                                      </option>
                                      <option value="Austria" label="Austria">
                                        Austria
                                      </option>
                                      <option value="Azerbaijan" label="Azerbaijan">
                                        Azerbaijan
                                      </option>
                                      <option value="Bahamas" label="Bahamas">
                                        Bahamas
                                      </option>
                                      <option value="Bahrain" label="Bahrain">
                                        Bahrain
                                      </option>
                                      <option value="Bangladesh" label="Bangladesh">
                                        Bangladesh
                                      </option>
                                      <option value="Barbados" label="Barbados">
                                        Barbados
                                      </option>
                                      <option value="Belarus" label="Belarus">
                                        Belarus
                                      </option>
                                      <option value="Belgium" label="Belgium">
                                        Belgium
                                      </option>
                                      <option value="Belize" label="Belize">
                                        Belize
                                      </option>
                                      <option value="Bermuda" label="Bermuda">
                                        Bermuda
                                      </option>
                                      <option value="Bhutan" label="Bhutan">
                                        Bhutan
                                      </option>
                                      <option value="Bolivia" label="Bolivia">
                                        Bolivia
                                      </option>
                                      <option
                                        value="Bosnia and Herzegovina"
                                        label="Bosnia and Herzegovina"
                                      >
                                        Bosnia and Herzegovina
                                      </option>
                                      <option value="Botswana" label="Botswana">
                                        Botswana
                                      </option>
                                      <option value="Brazil" label="Brazil">
                                        Brazil
                                      </option>
                                      <option value="Brunei" label="Brunei">
                                        Brunei
                                      </option>
                                      <option value="Bulgaria" label="Bulgaria">
                                        Bulgaria
                                      </option>
                                      <option
                                        value="Burkina Faso"
                                        label="Burkina Faso"
                                      >
                                        Burkina Faso
                                      </option>
                                      <option value="Burundi" label="Burundi">
                                        Burundi
                                      </option>
                                      <option value="Cambodia" label="Cambodia">
                                        Cambodia
                                      </option>
                                      <option value="Cameroon" label="Cameroon">
                                        Cameroon
                                      </option>
                                      <option value="Cape Verde" label="Cape Verde">
                                        Cape Verde
                                      </option>
                                      <option
                                        value="Cayman Islands"
                                        label="Cayman Islands"
                                      >
                                        Cayman Islands
                                      </option>
                                      <option
                                        value="Central African Republic"
                                        label="Central African Republic"
                                      >
                                        Central African Republic
                                      </option>
                                      <option value="Chad" label="Chad">
                                        Chad
                                      </option>
                                      <option value="Chile" label="Chile">
                                        Chile
                                      </option>
                                      <option value="China" label="China">
                                        China
                                      </option>
                                      <option value="Colombia" label="Colombia">
                                        Colombia
                                      </option>
                                      <option value="Comoros" label="Comoros">
                                        Comoros
                                      </option>
                                      <option
                                        value="Congo (DRC)"
                                        label="Congo (DRC)"
                                      >
                                        Congo (DRC)
                                      </option>
                                      <option value="Congo" label="Congo">
                                        Congo
                                      </option>
                                      <option
                                        value="Cook Islands"
                                        label="Cook Islands"
                                      >
                                        Cook Islands
                                      </option>
                                      <option value="Costa Rica" label="Costa Rica">
                                        Costa Rica
                                      </option>
                                      <option
                                        value="Cote d'Ivoire"
                                        label="Cote d'Ivoire"
                                      >
                                        Cote d'Ivoire
                                      </option>
                                      <option
                                        value="Croatia (Hrvatska)"
                                        label="Croatia (Hrvatska)"
                                      >
                                        Croatia (Hrvatska)
                                      </option>
                                      <option value="Cuba" label="Cuba">
                                        Cuba
                                      </option>
                                      <option value="Cyprus" label="Cyprus">
                                        Cyprus
                                      </option>
                                      <option
                                        value="Czech Republic"
                                        label="Czech Republic"
                                      >
                                        Czech Republic
                                      </option>
                                      <option value="Denmark" label="Denmark">
                                        Denmark
                                      </option>
                                      <option value="Djibouti" label="Djibouti">
                                        Djibouti
                                      </option>
                                      <option value="Dominica" label="Dominica">
                                        Dominica
                                      </option>
                                      <option
                                        value="Dominican Republic"
                                        label="Dominican Republic"
                                      >
                                        Dominican Republic
                                      </option>
                                      <option value="East Timor" label="East Timor">
                                        East Timor
                                      </option>
                                      <option value="Ecuador" label="Ecuador">
                                        Ecuador
                                      </option>
                                      <option value="Egypt" label="Egypt">
                                        Egypt
                                      </option>
                                      <option
                                        value="El Salvador"
                                        label="El Salvador"
                                      >
                                        El Salvador
                                      </option>
                                      <option
                                        value="Equatorial Guinea"
                                        label="Equatorial Guinea"
                                      >
                                        Equatorial Guinea
                                      </option>
                                      <option value="Eritrea" label="Eritrea">
                                        Eritrea
                                      </option>
                                      <option value="Estonia" label="Estonia">
                                        Estonia
                                      </option>
                                      <option value="Ethiopia" label="Ethiopia">
                                        Ethiopia
                                      </option>
                                      <option
                                        value="Falkland Islands"
                                        label="Falkland Islands"
                                      >
                                        Falkland Islands
                                      </option>
                                      <option
                                        value="Faroe Islands"
                                        label="Faroe Islands"
                                      >
                                        Faroe Islands
                                      </option>
                                      <option
                                        value="Fiji Islands"
                                        label="Fiji Islands"
                                      >
                                        Fiji Islands
                                      </option>
                                      <option value="Finland" label="Finland">
                                        Finland
                                      </option>
                                      <option value="France" label="France">
                                        France
                                      </option>
                                      <option
                                        value="French Guiana"
                                        label="French Guiana"
                                      >
                                        French Guiana
                                      </option>
                                      <option
                                        value="French Polynesia"
                                        label="French Polynesia"
                                      >
                                        French Polynesia
                                      </option>
                                      <option value="Gabon" label="Gabon">
                                        Gabon
                                      </option>
                                      <option value="Gambia" label="Gambia">
                                        Gambia
                                      </option>
                                      <option value="Georgia" label="Georgia">
                                        Georgia
                                      </option>
                                      <option value="Germany" label="Germany">
                                        Germany
                                      </option>
                                      <option value="Ghana" label="Ghana">
                                        Ghana
                                      </option>
                                      <option value="Gibraltar" label="Gibraltar">
                                        Gibraltar
                                      </option>
                                      <option value="Greece" label="Greece">
                                        Greece
                                      </option>
                                      <option value="Greenland" label="Greenland">
                                        Greenland
                                      </option>
                                      <option value="Grenada" label="Grenada">
                                        Grenada
                                      </option>
                                      <option value="Guadeloupe" label="Guadeloupe">
                                        Guadeloupe
                                      </option>
                                      <option value="Guam" label="Guam">
                                        Guam
                                      </option>
                                      <option value="Guatemala" label="Guatemala">
                                        Guatemala
                                      </option>
                                      <option value="Guinea" label="Guinea">
                                        Guinea
                                      </option>
                                      <option
                                        value="Guinea-Bissau"
                                        label="Guinea-Bissau"
                                      >
                                        Guinea-Bissau
                                      </option>
                                      <option value="Guyana" label="Guyana">
                                        Guyana
                                      </option>
                                      <option value="Haiti" label="Haiti">
                                        Haiti
                                      </option>
                                      <option value="Honduras" label="Honduras">
                                        Honduras
                                      </option>
                                      <option
                                        value="Hong Kong SAR"
                                        label="Hong Kong SAR"
                                      >
                                        Hong Kong SAR
                                      </option>
                                      <option value="Hungary" label="Hungary">
                                        Hungary
                                      </option>
                                      <option value="Iceland" label="Iceland">
                                        Iceland
                                      </option>
                                      <option value="Indonesia" label="Indonesia">
                                        Indonesia
                                      </option>
                                      <option value="Iran" label="Iran">
                                        Iran
                                      </option>
                                      <option value="Iraq" label="Iraq">
                                        Iraq
                                      </option>
                                      <option value="Ireland" label="Ireland">
                                        Ireland
                                      </option>
                                      <option value="Israel" label="Israel">
                                        Israel
                                      </option>
                                      <option value="Italy" label="Italy">
                                        Italy
                                      </option>
                                      <option value="Jamaica" label="Jamaica">
                                        Jamaica
                                      </option>
                                      <option value="Japan" label="Japan">
                                        Japan
                                      </option>
                                      <option value="Jordan" label="Jordan">
                                        Jordan
                                      </option>
                                      <option value="Kazakhstan" label="Kazakhstan">
                                        Kazakhstan
                                      </option>
                                      <option value="Kenya" label="Kenya">
                                        Kenya
                                      </option>
                                      <option value="Kiribati" label="Kiribati">
                                        Kiribati
                                      </option>
                                      <option value="Korea" label="Korea">
                                        Korea
                                      </option>
                                      <option value="Kyrgyzstan" label="Kyrgyzstan">
                                        Kyrgyzstan
                                      </option>
                                      <option value="Laos" label="Laos">
                                        Laos
                                      </option>
                                      <option value="Latvia" label="Latvia">
                                        Latvia
                                      </option>
                                      <option value="Lebanon" label="Lebanon">
                                        Lebanon
                                      </option>
                                      <option value="Lesotho" label="Lesotho">
                                        Lesotho
                                      </option>
                                      <option value="Liberia" label="Liberia">
                                        Liberia
                                      </option>
                                      <option value="Libya" label="Libya">
                                        Libya
                                      </option>
                                      <option
                                        value="Liechtenstein"
                                        label="Liechtenstein"
                                      >
                                        Liechtenstein
                                      </option>
                                      <option value="Lithuania" label="Lithuania">
                                        Lithuania
                                      </option>
                                      <option value="Luxembourg" label="Luxembourg">
                                        Luxembourg
                                      </option>
                                      <option value="Macao SAR" label="Macao SAR">
                                        Macao SAR
                                      </option>
                                      <option value="Macedonia" label="Macedonia">
                                        Macedonia
                                      </option>
                                      <option value="Madagascar" label="Madagascar">
                                        Madagascar
                                      </option>
                                      <option value="Malawi" label="Malawi">
                                        Malawi
                                      </option>
                                      <option value="Malaysia" label="Malaysia">
                                        Malaysia
                                      </option>
                                      <option value="Maldives" label="Maldives">
                                        Maldives
                                      </option>
                                      <option value="Mali" label="Mali">
                                        Mali
                                      </option>
                                      <option value="Malta" label="Malta">
                                        Malta
                                      </option>
                                      <option value="Martinique" label="Martinique">
                                        Martinique
                                      </option>
                                      <option value="Mauritania" label="Mauritania">
                                        Mauritania
                                      </option>
                                      <option value="Mauritius" label="Mauritius">
                                        Mauritius
                                      </option>
                                      <option value="Mayotte" label="Mayotte">
                                        Mayotte
                                      </option>
                                      <option value="Mexico" label="Mexico">
                                        Mexico
                                      </option>
                                      <option value="Micronesia" label="Micronesia">
                                        Micronesia
                                      </option>
                                      <option value="Moldova" label="Moldova">
                                        Moldova
                                      </option>
                                      <option value="Monaco" label="Monaco">
                                        Monaco
                                      </option>
                                      <option value="Mongolia" label="Mongolia">
                                        Mongolia
                                      </option>
                                      <option value="Montserrat" label="Montserrat">
                                        Montserrat
                                      </option>
                                      <option value="Morocco" label="Morocco">
                                        Morocco
                                      </option>
                                      <option value="Mozambique" label="Mozambique">
                                        Mozambique
                                      </option>
                                      <option value="Myanmar" label="Myanmar">
                                        Myanmar
                                      </option>
                                      <option value="Namibia" label="Namibia">
                                        Namibia
                                      </option>
                                      <option value="Nauru" label="Nauru">
                                        Nauru
                                      </option>
                                      <option value="Nepal" label="Nepal">
                                        Nepal
                                      </option>
                                      <option
                                        value="Netherlands Antilles"
                                        label="Netherlands Antilles"
                                      >
                                        Netherlands Antilles
                                      </option>
                                      <option
                                        value="Netherlands"
                                        label="Netherlands"
                                      >
                                        Netherlands
                                      </option>
                                      <option
                                        value="New Caledonia"
                                        label="New Caledonia"
                                      >
                                        New Caledonia
                                      </option>
                                      <option value="Nicaragua" label="Nicaragua">
                                        Nicaragua
                                      </option>
                                      <option value="Niger" label="Niger">
                                        Niger
                                      </option>
                                      <option value="Nigeria" label="Nigeria">
                                        Nigeria
                                      </option>
                                      <option value="Niue" label="Niue">
                                        Niue
                                      </option>
                                      <option
                                        value="Norfolk Island"
                                        label="Norfolk Island"
                                      >
                                        Norfolk Island
                                      </option>
                                      <option
                                        value="North Korea"
                                        label="North Korea"
                                      >
                                        North Korea
                                      </option>
                                      <option value="Norway" label="Norway">
                                        Norway
                                      </option>
                                      <option value="Oman" label="Oman">
                                        Oman
                                      </option>
                                      <option value="Panama" label="Panama">
                                        Panama
                                      </option>
                                      <option
                                        value="Papua New Guinea"
                                        label="Papua New Guinea"
                                      >
                                        Papua New Guinea
                                      </option>
                                      <option value="Paraguay" label="Paraguay">
                                        Paraguay
                                      </option>
                                      <option value="Peru" label="Peru">
                                        Peru
                                      </option>
                                      <option
                                        value="Philippines"
                                        label="Philippines"
                                      >
                                        Philippines
                                      </option>
                                      <option
                                        value="Pitcairn Islands"
                                        label="Pitcairn Islands"
                                      >
                                        Pitcairn Islands
                                      </option>
                                      <option value="Poland" label="Poland">
                                        Poland
                                      </option>
                                      <option value="Portugal" label="Portugal">
                                        Portugal
                                      </option>
                                      <option
                                        value="Puerto Rico"
                                        label="Puerto Rico"
                                      >
                                        Puerto Rico
                                      </option>
                                      <option value="Qatar" label="Qatar">
                                        Qatar
                                      </option>
                                      <option value="Reunion" label="Reunion">
                                        Reunion
                                      </option>
                                      <option value="Romania" label="Romania">
                                        Romania
                                      </option>
                                      <option value="Russia" label="Russia">
                                        Russia
                                      </option>
                                      <option value="Rwanda" label="Rwanda">
                                        Rwanda
                                      </option>
                                      <option value="Samoa" label="Samoa">
                                        Samoa
                                      </option>
                                      <option value="San Marino" label="San Marino">
                                        San Marino
                                      </option>
                                      <option
                                        value="Sao Tome and Principe"
                                        label="Sao Tome and Principe"
                                      >
                                        Sao Tome and Principe
                                      </option>
                                      <option value="Senegal" label="Senegal">
                                        Senegal
                                      </option>
                                      <option
                                        value="Serbia and Montenegro"
                                        label="Serbia and Montenegro"
                                      >
                                        Serbia and Montenegro
                                      </option>
                                      <option value="Seychelles" label="Seychelles">
                                        Seychelles
                                      </option>
                                      <option
                                        value="Sierra Leone"
                                        label="Sierra Leone"
                                      >
                                        Sierra Leone
                                      </option>
                                      <option value="Singapore" label="Singapore">
                                        Singapore
                                      </option>
                                      <option value="Slovakia" label="Slovakia">
                                        Slovakia
                                      </option>
                                      <option value="Slovenia" label="Slovenia">
                                        Slovenia
                                      </option>
                                      <option
                                        value="Solomon Islands"
                                        label="Solomon Islands"
                                      >
                                        Solomon Islands
                                      </option>
                                      <option value="Somalia" label="Somalia">
                                        Somalia
                                      </option>
                                      <option value="Spain" label="Spain">
                                        Spain
                                      </option>
                                      <option value="Sri Lanka" label="Sri Lanka">
                                        Sri Lanka
                                      </option>
                                      <option value="St. Helena" label="St. Helena">
                                        St. Helena
                                      </option>
                                      <option
                                        value="St. Kitts and Nevis"
                                        label="St. Kitts and Nevis"
                                      >
                                        St. Kitts and Nevis
                                      </option>
                                      <option value="St. Lucia" label="St. Lucia">
                                        St. Lucia
                                      </option>
                                      <option
                                        value="St. Pierre and Miquelon"
                                        label="St. Pierre and Miquelon"
                                      >
                                        St. Pierre and Miquelon
                                      </option>
                                      <option
                                        value="St. Vincent &amp; Grenadines"
                                        label="St. Vincent &amp; Grenadines"
                                      >
                                        St. Vincent &amp; Grenadines
                                      </option>
                                      <option value="Sudan" label="Sudan">
                                        Sudan
                                      </option>
                                      <option value="Suriname" label="Suriname">
                                        Suriname
                                      </option>
                                      <option value="Swaziland" label="Swaziland">
                                        Swaziland
                                      </option>
                                      <option value="Sweden" label="Sweden">
                                        Sweden
                                      </option>
                                      <option
                                        value="Switzerland"
                                        label="Switzerland"
                                      >
                                        Switzerland
                                      </option>
                                      <option value="Syria" label="Syria">
                                        Syria
                                      </option>
                                      <option value="Taiwan" label="Taiwan">
                                        Taiwan
                                      </option>
                                      <option value="Tajikistan" label="Tajikistan">
                                        Tajikistan
                                      </option>
                                      <option value="Tanzania" label="Tanzania">
                                        Tanzania
                                      </option>
                                      <option value="Thailand" label="Thailand">
                                        Thailand
                                      </option>
                                      <option value="Togo" label="Togo">
                                        Togo
                                      </option>
                                      <option value="Tokelau" label="Tokelau">
                                        Tokelau
                                      </option>
                                      <option value="Tonga" label="Tonga">
                                        Tonga
                                      </option>
                                      <option
                                        value="Trinidad and Tobago"
                                        label="Trinidad and Tobago"
                                      >
                                        Trinidad and Tobago
                                      </option>
                                      <option value="Tunisia" label="Tunisia">
                                        Tunisia
                                      </option>
                                      <option value="Turkey" label="Turkey">
                                        Turkey
                                      </option>
                                      <option
                                        value="Turkmenistan"
                                        label="Turkmenistan"
                                      >
                                        Turkmenistan
                                      </option>
                                      <option
                                        value="Turks and Caicos Islands"
                                        label="Turks and Caicos Islands"
                                      >
                                        Turks and Caicos Islands
                                      </option>
                                      <option value="Tuvalu" label="Tuvalu">
                                        Tuvalu
                                      </option>
                                      <option value="Uganda" label="Uganda">
                                        Uganda
                                      </option>
                                      <option value="Ukraine" label="Ukraine">
                                        Ukraine
                                      </option>
                                      <option value="Uruguay" label="Uruguay">
                                        Uruguay
                                      </option>
                                      <option value="Uzbekistan" label="Uzbekistan">
                                        Uzbekistan
                                      </option>
                                      <option value="Vanuatu" label="Vanuatu">
                                        Vanuatu
                                      </option>
                                      <option value="Venezuela" label="Venezuela">
                                        Venezuela
                                      </option>
                                      <option value="Vietnam" label="Vietnam">
                                        Vietnam
                                      </option>
                                      <option
                                        value="Virgin Islands (British)"
                                        label="Virgin Islands (British)"
                                      >
                                        Virgin Islands (British)
                                      </option>
                                      <option
                                        value="Virgin Islands"
                                        label="Virgin Islands"
                                      >
                                        Virgin Islands
                                      </option>
                                      <option
                                        value="Wallis and Futuna"
                                        label="Wallis and Futuna"
                                      >
                                        Wallis and Futuna
                                      </option>
                                      <option value="Yemen" label="Yemen">
                                        Yemen
                                      </option>
                                      <option value="Yugoslavia" label="Yugoslavia">
                                        Yugoslavia
                                      </option>
                                      <option value="Zambia" label="Zambia">
                                        Zambia
                                      </option>
                                      <option value="Zimbabwe" label="Zimbabwe">
                                        Zimbabwe
                                      </option>
                                    </optgroup>
                                  </select>
                                  <div
                                    className="ddSelWrap"
                                    id="ddSelWrap_countryofresidence"
                                  >
                                    <div
                                      className="ddOptHolderWrapper"
                                      id="ddOptHolderWrapper_countryofresidence"
                                    >
                                      <div
                                        className="ddOptHolder"
                                        id="ddOptHolder_countryofresidence"
                                      >
                                        <div
                                          className="ddSelOptHolder ddSelOptHolderOpen"
                                          id="ddSelOptHolder_countryofresidence"
                                        >
                                          <span
                                            className="ddSelectedOptSpan"
                                            rel="India"
                                          >
                                            India
                                            <span className="multi_select_close"></span>
                                          </span>
                                          <input
                                            type="text"
                                            className="ddSelOptText"
                                            id="ddSelOptText_countryofresidence"
                                            autocomplete="off"
                                            size="1"
                                            style={{ display: "none" }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="ddOptionHolder"
                                        id="ddOptionHolder_countryofresidence"
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="clear"></div>
                                </div>
                                <div className="clear"></div>
                              </div>

                              <div id="state_only">
                                <div className="src_field pos_rel">
                                  <label className="form_label">
                                    State living in
                                  </label>
                                  <div className="src_field_box">
                                    <select
                                      name="stateofresidence[]"
                                      id="stateofresidence"
                                      multiple="multiple"
                                      style={{ display: "none" }}
                                    >
                                      <option value="" label="Open to all">
                                        Open to all
                                      </option>
                                      <optgroup
                                        id="stateofresidence-optgroup-India"
                                        label="India"
                                      >
                                        <option
                                          value="India:Andaman &amp; Nicobar"
                                          label="Andaman &amp; Nicobar"
                                        >
                                          Andaman &amp; Nicobar
                                        </option>
                                        <option
                                          value="India:Andhra Pradesh"
                                          label="Andhra Pradesh"
                                        >
                                          Andhra Pradesh
                                        </option>
                                        <option
                                          value="India:Arunachal Pradesh"
                                          label="Arunachal Pradesh"
                                        >
                                          Arunachal Pradesh
                                        </option>
                                        <option value="India:Assam" label="Assam">
                                          Assam
                                        </option>
                                        <option value="India:Bihar" label="Bihar">
                                          Bihar
                                        </option>
                                        <option
                                          value="India:Chandigarh"
                                          label="Chandigarh"
                                        >
                                          Chandigarh
                                        </option>
                                        <option
                                          value="India:Chhattisgarh"
                                          label="Chhattisgarh"
                                        >
                                          Chhattisgarh
                                        </option>
                                        <option
                                          value="India:Dadra &amp; Nagar Haveli"
                                          label="Dadra &amp; Nagar Haveli"
                                        >
                                          Dadra &amp; Nagar Haveli
                                        </option>
                                        <option
                                          value="India:Daman &amp; Diu"
                                          label="Daman &amp; Diu"
                                        >
                                          Daman &amp; Diu
                                        </option>
                                        <option
                                          value="India:Delhi-NCR"
                                          label="Delhi-NCR"
                                        >
                                          Delhi-NCR
                                        </option>
                                        <option value="India:Goa" label="Goa">
                                          Goa
                                        </option>
                                        <option
                                          value="India:Gujarat"
                                          label="Gujarat"
                                        >
                                          Gujarat
                                        </option>
                                        <option
                                          value="India:Haryana"
                                          label="Haryana"
                                        >
                                          Haryana
                                        </option>
                                        <option
                                          value="India:Himachal Pradesh"
                                          label="Himachal Pradesh"
                                        >
                                          Himachal Pradesh
                                        </option>
                                        <option
                                          value="India:Jammu &amp; Kashmir"
                                          label="Jammu &amp; Kashmir"
                                        >
                                          Jammu &amp; Kashmir
                                        </option>
                                        <option
                                          value="India:Jharkhand"
                                          label="Jharkhand"
                                        >
                                          Jharkhand
                                        </option>
                                        <option
                                          value="India:Karnataka"
                                          label="Karnataka"
                                          selected="selected"
                                          source="dd"
                                        >
                                          Karnataka
                                        </option>
                                        <option
                                          value="India:Kerala"
                                          label="Kerala"
                                          selected="selected"
                                          source="dd"
                                        >
                                          Kerala
                                        </option>
                                        <option
                                          value="India:Lakshadweep"
                                          label="Lakshadweep"
                                        >
                                          Lakshadweep
                                        </option>
                                        <option
                                          value="India:Madhya Pradesh"
                                          label="Madhya Pradesh"
                                        >
                                          Madhya Pradesh
                                        </option>
                                        <option
                                          value="India:Maharashtra"
                                          label="Maharashtra"
                                          selected="selected"
                                          source="dd"
                                        >
                                          Maharashtra
                                        </option>
                                        <option
                                          value="India:Manipur"
                                          label="Manipur"
                                        >
                                          Manipur
                                        </option>
                                        <option
                                          value="India:Meghalaya"
                                          label="Meghalaya"
                                        >
                                          Meghalaya
                                        </option>
                                        <option
                                          value="India:Mizoram"
                                          label="Mizoram"
                                        >
                                          Mizoram
                                        </option>
                                        <option
                                          value="India:Nagaland"
                                          label="Nagaland"
                                        >
                                          Nagaland
                                        </option>
                                        <option value="India:Orissa" label="Orissa">
                                          Orissa
                                        </option>
                                        <option
                                          value="India:Pondicherry"
                                          label="Pondicherry"
                                        >
                                          Pondicherry
                                        </option>
                                        <option value="India:Punjab" label="Punjab">
                                          Punjab
                                        </option>
                                        <option
                                          value="India:Rajasthan"
                                          label="Rajasthan"
                                        >
                                          Rajasthan
                                        </option>
                                        <option value="India:Sikkim" label="Sikkim">
                                          Sikkim
                                        </option>
                                        <option
                                          value="India:Tamil Nadu"
                                          label="Tamil Nadu"
                                          selected="selected"
                                          source="dd"
                                        >
                                          Tamil Nadu
                                        </option>
                                        <option
                                          value="India:Telangana"
                                          label="Telangana"
                                        >
                                          Telangana
                                        </option>
                                        <option
                                          value="India:Tripura"
                                          label="Tripura"
                                        >
                                          Tripura
                                        </option>
                                        <option
                                          value="India:Uttar Pradesh"
                                          label="Uttar Pradesh"
                                        >
                                          Uttar Pradesh
                                        </option>
                                        <option
                                          value="India:Uttaranchal"
                                          label="Uttaranchal"
                                        >
                                          Uttaranchal
                                        </option>
                                        <option
                                          value="India:West Bengal"
                                          label="West Bengal"
                                        >
                                          West Bengal
                                        </option>
                                        <option value="India:Other" label="Other">
                                          Other
                                        </option>
                                      </optgroup>
                                    </select>
                                    <div
                                      className="ddSelWrap"
                                      id="ddSelWrap_stateofresidence"
                                    >
                                      <div
                                        className="ddOptHolderWrapper"
                                        id="ddOptHolderWrapper_stateofresidence"
                                      >
                                        <div
                                          className="ddOptHolder"
                                          id="ddOptHolder_stateofresidence"
                                        >
                                          <div
                                            className="ddSelOptHolder ddSelOptHolderOpen"
                                            id="ddSelOptHolder_stateofresidence"
                                          >
                                            <span
                                              className="ddSelectedOptSpan"
                                              rel="India:Karnataka"
                                            >
                                              Karnataka
                                              <span className="multi_select_close"></span>
                                            </span>
                                            <span
                                              className="ddSelectedOptSpan"
                                              rel="India:Kerala"
                                            >
                                              Kerala
                                              <span className="multi_select_close"></span>
                                            </span>
                                            <span
                                              className="ddSelectedOptSpan"
                                              rel="India:Maharashtra"
                                            >
                                              Maharashtra
                                              <span className="multi_select_close"></span>
                                            </span>
                                            <span
                                              className="ddSelectedOptSpan"
                                              rel="India:Tamil Nadu"
                                            >
                                              Tamil Nadu
                                              <span className="multi_select_close"></span>
                                            </span>
                                            <input
                                              type="text"
                                              className="ddSelOptText"
                                              id="ddSelOptText_stateofresidence"
                                              autocomplete="off"
                                              size="1"
                                              style={{ display: "none" }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          className="ddOptionHolder"
                                          id="ddOptionHolder_stateofresidence"
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="clear"></div>
                                  </div>
                                  <div className="clear"></div>
                                </div>
                              </div>
                              <div
                                className="tt rightEnd"
                                style={{ zIndex: "1700" }}
                              >
                                <span
                                  id="tool_top_d10tl"
                                  style={{ display: "none" }}
                                  className="tooltip org_bdr_tooltop"
                                >
                                  <span className="top"></span>
                                  <span className="middle-tip">
                                    <div
                                      className="tt_close"
                                      onclick="hideTGStatePopup();"
                                    ></div>
                                    Click here to add Telangana in the State living
                                    in field
                                  </span>
                                  <span className="bottom"></span>
                                </span>
                              </div>
                              <div id="city_only">
                                <div className="src_field pos_rel">
                                  <label className="form_label">
                                    City / District
                                  </label>
                                  <div className="src_field_box">
                                    <select
                                      name="nearest_city[]"
                                      id="nearest_city"
                                      multiple="multiple"
                                      style={{ display: "none" }}
                                    >
                                      <option
                                        value=""
                                        label="Open to all"
                                        selected="selected"
                                      >
                                        Open to all
                                      </option>
                                      <optgroup
                                        id="nearest_city-optgroup-India-Maharashtra"
                                        label="India-Maharashtra"
                                      >
                                        <option
                                          value="India:Maharashtra:Ahmednagar"
                                          label="Ahmednagar"
                                        >
                                          Ahmednagar
                                        </option>
                                        <option
                                          value="India:Maharashtra:Akola"
                                          label="Akola"
                                        >
                                          Akola
                                        </option>
                                        <option
                                          value="India:Maharashtra:Amravati"
                                          label="Amravati"
                                        >
                                          Amravati
                                        </option>
                                        <option
                                          value="India:Maharashtra:Aurangabad"
                                          label="Aurangabad"
                                        >
                                          Aurangabad
                                        </option>
                                        <option
                                          value="India:Maharashtra:Beed"
                                          label="Beed"
                                        >
                                          Beed
                                        </option>
                                        <option
                                          value="India:Maharashtra:Bhandara"
                                          label="Bhandara"
                                        >
                                          Bhandara
                                        </option>
                                        <option
                                          value="India:Maharashtra:Buldhana"
                                          label="Buldhana"
                                        >
                                          Buldhana
                                        </option>
                                        <option
                                          value="India:Maharashtra:Chandrapur"
                                          label="Chandrapur"
                                        >
                                          Chandrapur
                                        </option>
                                        <option
                                          value="India:Maharashtra:Dhule"
                                          label="Dhule"
                                        >
                                          Dhule
                                        </option>
                                        <option
                                          value="India:Maharashtra:Gadchiroli"
                                          label="Gadchiroli"
                                        >
                                          Gadchiroli
                                        </option>
                                        <option
                                          value="India:Maharashtra:Gondiya"
                                          label="Gondiya"
                                        >
                                          Gondiya
                                        </option>
                                        <option
                                          value="India:Maharashtra:Hingoli"
                                          label="Hingoli"
                                        >
                                          Hingoli
                                        </option>
                                        <option
                                          value="India:Maharashtra:Jalgaon"
                                          label="Jalgaon"
                                        >
                                          Jalgaon
                                        </option>
                                        <option
                                          value="India:Maharashtra:Jalna"
                                          label="Jalna"
                                        >
                                          Jalna
                                        </option>
                                        <option
                                          value="India:Maharashtra:Kolhapur"
                                          label="Kolhapur"
                                        >
                                          Kolhapur
                                        </option>
                                        <option
                                          value="India:Maharashtra:Latur"
                                          label="Latur"
                                        >
                                          Latur
                                        </option>
                                        <option
                                          value="India:Maharashtra:Malegaon"
                                          label="Malegaon"
                                        >
                                          Malegaon
                                        </option>
                                        <option
                                          value="India:Maharashtra:Mumbai"
                                          label="Mumbai"
                                        >
                                          Mumbai
                                        </option>
                                        <option
                                          value="India:Maharashtra:Nagpur"
                                          label="Nagpur"
                                        >
                                          Nagpur
                                        </option>
                                        <option
                                          value="India:Maharashtra:Nanded"
                                          label="Nanded"
                                        >
                                          Nanded
                                        </option>
                                        <option
                                          value="India:Maharashtra:Nandurbar"
                                          label="Nandurbar"
                                        >
                                          Nandurbar
                                        </option>
                                        <option
                                          value="India:Maharashtra:Nashik"
                                          label="Nashik"
                                        >
                                          Nashik
                                        </option>
                                        <option
                                          value="India:Maharashtra:Oras"
                                          label="Oras"
                                        >
                                          Oras
                                        </option>
                                        <option
                                          value="India:Maharashtra:Osmanabad"
                                          label="Osmanabad"
                                        >
                                          Osmanabad
                                        </option>
                                        <option
                                          value="India:Maharashtra:Parbhani"
                                          label="Parbhani"
                                        >
                                          Parbhani
                                        </option>
                                        <option
                                          value="India:Maharashtra:Pune"
                                          label="Pune"
                                        >
                                          Pune
                                        </option>
                                        <option
                                          value="India:Maharashtra:Raigad"
                                          label="Raigad"
                                        >
                                          Raigad
                                        </option>
                                        <option
                                          value="India:Maharashtra:Ratnagiri"
                                          label="Ratnagiri"
                                        >
                                          Ratnagiri
                                        </option>
                                        <option
                                          value="India:Maharashtra:Sangli"
                                          label="Sangli"
                                        >
                                          Sangli
                                        </option>
                                        <option
                                          value="India:Maharashtra:Satara"
                                          label="Satara"
                                        >
                                          Satara
                                        </option>
                                        <option
                                          value="India:Maharashtra:Sewagram"
                                          label="Sewagram"
                                        >
                                          Sewagram
                                        </option>
                                        <option
                                          value="India:Maharashtra:Solapur"
                                          label="Solapur"
                                        >
                                          Solapur
                                        </option>
                                        <option
                                          value="India:Maharashtra:Wardha"
                                          label="Wardha"
                                        >
                                          Wardha
                                        </option>
                                        <option
                                          value="India:Maharashtra:Washim"
                                          label="Washim"
                                        >
                                          Washim
                                        </option>
                                        <option
                                          value="India:Maharashtra:Yavatmal"
                                          label="Yavatmal"
                                        >
                                          Yavatmal
                                        </option>
                                      </optgroup>
                                      <optgroup
                                        id="nearest_city-optgroup-India-Kerala"
                                        label="India-Kerala"
                                      >
                                        <option
                                          value="India:Kerala:Alappuzha"
                                          label="Alappuzha"
                                        >
                                          Alappuzha
                                        </option>
                                        <option
                                          value="India:Kerala:Ernakulam"
                                          label="Ernakulam"
                                        >
                                          Ernakulam
                                        </option>
                                        <option
                                          value="India:Kerala:Idukki"
                                          label="Idukki"
                                        >
                                          Idukki
                                        </option>
                                        <option
                                          value="India:Kerala:Kannur"
                                          label="Kannur"
                                        >
                                          Kannur
                                        </option>
                                        <option
                                          value="India:Kerala:Kasaragod"
                                          label="Kasaragod"
                                        >
                                          Kasaragod
                                        </option>
                                        <option
                                          value="India:Kerala:Kollam"
                                          label="Kollam"
                                        >
                                          Kollam
                                        </option>
                                        <option
                                          value="India:Kerala:Kottayam"
                                          label="Kottayam"
                                        >
                                          Kottayam
                                        </option>
                                        <option
                                          value="India:Kerala:Kozhikode"
                                          label="Kozhikode"
                                        >
                                          Kozhikode
                                        </option>
                                        <option
                                          value="India:Kerala:Malappuram"
                                          label="Malappuram"
                                        >
                                          Malappuram
                                        </option>
                                        <option
                                          value="India:Kerala:Palakkad"
                                          label="Palakkad"
                                        >
                                          Palakkad
                                        </option>
                                        <option
                                          value="India:Kerala:Pathanamthitta"
                                          label="Pathanamthitta"
                                        >
                                          Pathanamthitta
                                        </option>
                                        <option
                                          value="India:Kerala:Pondicherry (Mahe)"
                                          label="Pondicherry (Mahe)"
                                        >
                                          Pondicherry (Mahe)
                                        </option>
                                        <option
                                          value="India:Kerala:Thiruvananthapuram"
                                          label="Thiruvananthapuram"
                                        >
                                          Thiruvananthapuram
                                        </option>
                                        <option
                                          value="India:Kerala:Thrissur"
                                          label="Thrissur"
                                        >
                                          Thrissur
                                        </option>
                                        <option
                                          value="India:Kerala:Wayanad"
                                          label="Wayanad"
                                        >
                                          Wayanad
                                        </option>
                                      </optgroup>
                                      <optgroup
                                        id="nearest_city-optgroup-India-Tamil Nadu"
                                        label="India-Tamil Nadu"
                                      >
                                        <option
                                          value="India:Tamil Nadu:Ariyalur"
                                          label="Ariyalur"
                                        >
                                          Ariyalur
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Chennai"
                                          label="Chennai"
                                        >
                                          Chennai
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Coimbatore"
                                          label="Coimbatore"
                                        >
                                          Coimbatore
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Cuddalore"
                                          label="Cuddalore"
                                        >
                                          Cuddalore
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Dharmapuri"
                                          label="Dharmapuri"
                                        >
                                          Dharmapuri
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Dindigul"
                                          label="Dindigul"
                                        >
                                          Dindigul
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Erode"
                                          label="Erode"
                                        >
                                          Erode
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Kanchipuram"
                                          label="Kanchipuram"
                                        >
                                          Kanchipuram
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Kanyakumari"
                                          label="Kanyakumari"
                                        >
                                          Kanyakumari
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Karur"
                                          label="Karur"
                                        >
                                          Karur
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Krishnagiri"
                                          label="Krishnagiri"
                                        >
                                          Krishnagiri
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Madurai"
                                          label="Madurai"
                                        >
                                          Madurai
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Nagapattinam"
                                          label="Nagapattinam"
                                        >
                                          Nagapattinam
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Namakkal"
                                          label="Namakkal"
                                        >
                                          Namakkal
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Nilgiris"
                                          label="Nilgiris"
                                        >
                                          Nilgiris
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Perambalur"
                                          label="Perambalur"
                                        >
                                          Perambalur
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Pudukkottai"
                                          label="Pudukkottai"
                                        >
                                          Pudukkottai
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Ramanathapuram"
                                          label="Ramanathapuram"
                                        >
                                          Ramanathapuram
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Salem"
                                          label="Salem"
                                        >
                                          Salem
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Sivaganga"
                                          label="Sivaganga"
                                        >
                                          Sivaganga
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Thanjavur"
                                          label="Thanjavur"
                                        >
                                          Thanjavur
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Theni"
                                          label="Theni"
                                        >
                                          Theni
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Thoothukudi / Tuticorin"
                                          label="Thoothukudi / Tuticorin"
                                        >
                                          Thoothukudi / Tuticorin
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Tiruchirappalli"
                                          label="Tiruchirappalli"
                                        >
                                          Tiruchirappalli
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Tirunelveli"
                                          label="Tirunelveli"
                                        >
                                          Tirunelveli
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Tiruppur"
                                          label="Tiruppur"
                                        >
                                          Tiruppur
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Tiruvallur"
                                          label="Tiruvallur"
                                        >
                                          Tiruvallur
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Tiruvannamalai"
                                          label="Tiruvannamalai"
                                        >
                                          Tiruvannamalai
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Tiruvarur"
                                          label="Tiruvarur"
                                        >
                                          Tiruvarur
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Vellore"
                                          label="Vellore"
                                        >
                                          Vellore
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Viluppuram"
                                          label="Viluppuram"
                                        >
                                          Viluppuram
                                        </option>
                                        <option
                                          value="India:Tamil Nadu:Virudhunagar"
                                          label="Virudhunagar"
                                        >
                                          Virudhunagar
                                        </option>
                                      </optgroup>
                                      <optgroup
                                        id="nearest_city-optgroup-India-Karnataka"
                                        label="India-Karnataka"
                                      >
                                        <option
                                          value="India:Karnataka:Bagalkot"
                                          label="Bagalkot"
                                        >
                                          Bagalkot
                                        </option>
                                        <option
                                          value="India:Karnataka:Ballari / Bellary"
                                          label="Ballari / Bellary"
                                        >
                                          Ballari / Bellary
                                        </option>
                                        <option
                                          value="India:Karnataka:Belagavi / Belagaum"
                                          label="Belagavi / Belagaum"
                                        >
                                          Belagavi / Belagaum
                                        </option>
                                        <option
                                          value="India:Karnataka:Bengaluru / Bangalore"
                                          label="Bengaluru / Bangalore"
                                        >
                                          Bengaluru / Bangalore
                                        </option>
                                        <option
                                          value="India:Karnataka:Bidar"
                                          label="Bidar"
                                        >
                                          Bidar
                                        </option>
                                        <option
                                          value="India:Karnataka:Chamrajnagar"
                                          label="Chamrajnagar"
                                        >
                                          Chamrajnagar
                                        </option>
                                        <option
                                          value="India:Karnataka:Chikballapur"
                                          label="Chikballapur"
                                        >
                                          Chikballapur
                                        </option>
                                        <option
                                          value="India:Karnataka:Chikkamagaluru"
                                          label="Chikkamagaluru"
                                        >
                                          Chikkamagaluru
                                        </option>
                                        <option
                                          value="India:Karnataka:Chitradurga"
                                          label="Chitradurga"
                                        >
                                          Chitradurga
                                        </option>
                                        <option
                                          value="India:Karnataka:Dakshina Kannada"
                                          label="Dakshina Kannada"
                                        >
                                          Dakshina Kannada
                                        </option>
                                        <option
                                          value="India:Karnataka:Davanagere"
                                          label="Davanagere"
                                        >
                                          Davanagere
                                        </option>
                                        <option
                                          value="India:Karnataka:Gadag"
                                          label="Gadag"
                                        >
                                          Gadag
                                        </option>
                                        <option
                                          value="India:Karnataka:Hassan"
                                          label="Hassan"
                                        >
                                          Hassan
                                        </option>
                                        <option
                                          value="India:Karnataka:Haveri"
                                          label="Haveri"
                                        >
                                          Haveri
                                        </option>
                                        <option
                                          value="India:Karnataka:Hubbali-Dharwad"
                                          label="Hubbali-Dharwad"
                                        >
                                          Hubbali-Dharwad
                                        </option>
                                        <option
                                          value="India:Karnataka:Kalaburagi / Gulbarga"
                                          label="Kalaburagi / Gulbarga"
                                        >
                                          Kalaburagi / Gulbarga
                                        </option>
                                        <option
                                          value="India:Karnataka:Kodagu"
                                          label="Kodagu"
                                        >
                                          Kodagu
                                        </option>
                                        <option
                                          value="India:Karnataka:Kolar"
                                          label="Kolar"
                                        >
                                          Kolar
                                        </option>
                                        <option
                                          value="India:Karnataka:Koppal"
                                          label="Koppal"
                                        >
                                          Koppal
                                        </option>
                                        <option
                                          value="India:Karnataka:Mandya"
                                          label="Mandya"
                                        >
                                          Mandya
                                        </option>
                                        <option
                                          value="India:Karnataka:Mysuru / Mysore"
                                          label="Mysuru / Mysore"
                                        >
                                          Mysuru / Mysore
                                        </option>
                                        <option
                                          value="India:Karnataka:Raichur"
                                          label="Raichur"
                                        >
                                          Raichur
                                        </option>
                                        <option
                                          value="India:Karnataka:Ramanagara"
                                          label="Ramanagara"
                                        >
                                          Ramanagara
                                        </option>
                                        <option
                                          value="India:Karnataka:Shivamogga"
                                          label="Shivamogga"
                                        >
                                          Shivamogga
                                        </option>
                                        <option
                                          value="India:Karnataka:Tumakuru"
                                          label="Tumakuru"
                                        >
                                          Tumakuru
                                        </option>
                                        <option
                                          value="India:Karnataka:Udupi"
                                          label="Udupi"
                                        >
                                          Udupi
                                        </option>
                                        <option
                                          value="India:Karnataka:Uttara Kannada"
                                          label="Uttara Kannada"
                                        >
                                          Uttara Kannada
                                        </option>
                                        <option
                                          value="India:Karnataka:Vijayapura / Bijapur"
                                          label="Vijayapura / Bijapur"
                                        >
                                          Vijayapura / Bijapur
                                        </option>
                                        <option
                                          value="India:Karnataka:Yadgir"
                                          label="Yadgir"
                                        >
                                          Yadgir
                                        </option>
                                      </optgroup>
                                    </select>
                                    <div
                                      className="ddSelWrap"
                                      id="ddSelWrap_nearest_city"
                                    >
                                      <div
                                        className="ddOptHolderWrapper"
                                        id="ddOptHolderWrapper_nearest_city"
                                      >
                                        <div
                                          className="ddOptHolder"
                                          id="ddOptHolder_nearest_city"
                                        >
                                          <div
                                            className="ddSelOptHolder ddSelOptHolderOpen"
                                            id="ddSelOptHolder_nearest_city"
                                          >
                                            <span
                                              className="ddSelectedOptSpan"
                                              id="ddSelectedOptSpan_nearest_city_"
                                            >
                                              Open to all
                                              <span className="multi_select_close"></span>
                                            </span>
                                            <input
                                              type="text"
                                              className="ddSelOptText"
                                              id="ddSelOptText_nearest_city"
                                              autocomplete="off"
                                              size="1"
                                              style={{ display: "none" }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          className="ddOptionHolder"
                                          id="ddOptionHolder_nearest_city"
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="clear"></div>
                                  </div>
                                  <div className="clear"></div>
                                  <div
                                    className="toast_notification nearest_city_toast_notification"
                                    style={{ opacity: "0" }}
                                  >
                                    <span className="value">
                                      Brahmin Brahmbhatt
                                    </span>{" "}
                                    has been added
                                  </div>
                                </div>

                                <div
                                  id="nearest_city_sugg"
                                  className="pp_suggestions_wrap"
                                  style={{ display: "block" }}
                                ></div>
                              </div>
                            </div>
                            <div className="section_heding">
                              Education &amp; Profession Details
                            </div>
                            <div>
                              <div className="src_field pos_rel">
                                <label className="form_label">Qualification</label>
                                <div className="src_field_box">
                                  <select
                                    name="education[]"
                                    id="education"
                                    multiple="multiple"
                                    style={{ display: "none" }}
                                  >
                                    <option
                                      value=""
                                      label="Open to all"
                                      selected="selected"
                                    >
                                      Open to all
                                    </option>
                                    <option value="Doctorate" label="Doctorate">
                                      Doctorate
                                    </option>
                                    <option value="Master" label="Master">
                                      Master
                                    </option>
                                    <option
                                      value="Bachelor|Honours|Undergraduate"
                                      label="Bachelor / Undergraduate"
                                    >
                                      Bachelor / Undergraduate
                                    </option>
                                    <option
                                      value="Diploma|Associate|Trade school"
                                      label="Associate / Diploma"
                                    >
                                      Associate / Diploma
                                    </option>
                                    <option
                                      value="High school|Less than high school"
                                      label="High School and below"
                                    >
                                      High School and below
                                    </option>
                                  </select>
                                  <div
                                    className="ddSelWrap"
                                    id="ddSelWrap_education"
                                  >
                                    <div
                                      className="ddOptHolderWrapper"
                                      id="ddOptHolderWrapper_education"
                                    >
                                      <div
                                        className="ddOptHolder"
                                        id="ddOptHolder_education"
                                      >
                                        <div
                                          className="ddSelOptHolder ddSelOptHolderOpen"
                                          id="ddSelOptHolder_education"
                                        >
                                          <span
                                            className="ddSelectedOptSpan"
                                            id="ddSelectedOptSpan_education_"
                                          >
                                            Open to all
                                            <span className="multi_select_close"></span>
                                          </span>
                                          <input
                                            type="text"
                                            className="ddSelOptText"
                                            id="ddSelOptText_education"
                                            autocomplete="off"
                                            size="1"
                                            style={{ display: "none" }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="ddOptionHolder"
                                        id="ddOptionHolder_education"
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="clear"></div>
                                </div>
                                <div className="clear"></div>
                                <div
                                  className="toast_notification education_toast_notification"
                                  style={{ opacity: "0" }}
                                >
                                  <span className="value">Brahmin Brahmbhatt</span>{" "}
                                  has been added
                                </div>
                              </div>
                              <div
                                id="education_sugg"
                                className="pp_suggestions_wrap"
                                style={{ display: "none" }}
                              >
                                <div>Suggested Qualifications for you</div>
                                <a
                                  href=" "
                                  className="pp_suggestions"
                                  selval="Bachelor|Honours|Undergraduate"
                                >
                                  <span rel="education">
                                    Bachelor / Undergraduate
                                  </span>
                                  <span
                                    className="pp_suggestions_add"
                                    rel="education"
                                  ></span>
                                </a>
                                <a
                                  href="javascript:void(0)"
                                  className="pp_suggestions"
                                  selval="Diploma|Associate|Trade school"
                                >
                                  <span rel="education">Associate / Diploma</span>
                                  <span
                                    className="pp_suggestions_add"
                                    rel="education"
                                  ></span>
                                </a>

                                <div className="clear"></div>
                              </div>
                              <div className="src_field">
                                <label className="form_label">Working with</label>
                                <div className="src_field_box">
                                  <select
                                    name="working_with[]"
                                    id="working_with"
                                    multiple="multiple"
                                    style={{ display: "none" }}
                                  >
                                    <option
                                      value=""
                                      label="Open to all"
                                      selected="selected"
                                    >
                                      Open to all
                                    </option>
                                    <option
                                      value="Private Company"
                                      label="Private Company"
                                    >
                                      Private Company
                                    </option>
                                    <option
                                      value="Government / Public Sector"
                                      label="Government / Public Sector"
                                    >
                                      Government / Public Sector
                                    </option>
                                    <option
                                      value="Defense / Civil Services"
                                      label="Defense / Civil Services"
                                    >
                                      Defense / Civil Services
                                    </option>
                                    <option
                                      value="Business / Self Employed"
                                      label="Business / Self Employed"
                                    >
                                      Business / Self Employed
                                    </option>
                                    <option value="Non Working" label="Not Working">
                                      Not Working
                                    </option>
                                  </select>
                                  <div
                                    className="ddSelWrap"
                                    id="ddSelWrap_working_with"
                                  >
                                    <div
                                      className="ddOptHolderWrapper"
                                      id="ddOptHolderWrapper_working_with"
                                    >
                                      <div
                                        className="ddOptHolder"
                                        id="ddOptHolder_working_with"
                                      >
                                        <div
                                          className="ddSelOptHolder ddSelOptHolderOpen"
                                          id="ddSelOptHolder_working_with"
                                        >
                                          <span
                                            className="ddSelectedOptSpan"
                                            id="ddSelectedOptSpan_working_with_"
                                          >
                                            Open to all
                                            <span className="multi_select_close"></span>
                                          </span>
                                          <input
                                            type="text"
                                            className="ddSelOptText"
                                            id="ddSelOptText_working_with"
                                            autocomplete="off"
                                            size="1"
                                            style={{ display: "none" }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="ddOptionHolder"
                                        id="ddOptionHolder_working_with"
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="clear"></div>
                                </div>
                                <div className="clear"></div>
                              </div>
                              <div className="src_field">
                                <label className="form_label">
                                  Profession area
                                </label>
                                <div className="src_field_box">
                                  <select
                                    name="occupation_area[]"
                                    id="occupation_area"
                                    multiple="multiple"
                                    style={{ display: "none" }}
                                  >
                                    <option
                                      value=""
                                      label="Open to all"
                                      selected="selected"
                                    >
                                      Open to all
                                    </option>
                                    <option
                                      value="Accounting, Banking &amp; Finance"
                                      label="Accounting, Banking &amp; Finance"
                                    >
                                      Accounting, Banking &amp; Finance
                                    </option>
                                    <option
                                      value="Administration &amp; HR"
                                      label="Administration &amp; HR"
                                    >
                                      Administration &amp; HR
                                    </option>
                                    <option
                                      value="Advertising, Media &amp; Entertainment"
                                      label="Advertising, Media &amp; Entertainment"
                                    >
                                      Advertising, Media &amp; Entertainment
                                    </option>
                                    <option value="Agriculture" label="Agriculture">
                                      Agriculture
                                    </option>
                                    <option
                                      value="Airline &amp; Aviation"
                                      label="Airline &amp; Aviation"
                                    >
                                      Airline &amp; Aviation
                                    </option>
                                    <option
                                      value="Architecture &amp; Design"
                                      label="Architecture &amp; Design"
                                    >
                                      Architecture &amp; Design
                                    </option>
                                    <option
                                      value="Artists, Animators &amp; Web Designers"
                                      label="Artists, Animators &amp; Web Designers"
                                    >
                                      Artists, Animators &amp; Web Designers
                                    </option>
                                    <option
                                      value="BPO, KPO, &amp; Customer Support"
                                      label="BPO, KPO, &amp; Customer Support"
                                    >
                                      BPO, KPO, &amp; Customer Support
                                    </option>
                                    <option
                                      value="Beauty, Fashion &amp; Jewellery Designers"
                                      label="Beauty, Fashion &amp; Jewellery Designers"
                                    >
                                      Beauty, Fashion &amp; Jewellery Designers
                                    </option>
                                    <option
                                      value="Civil Services / Law Enforcement"
                                      label="Civil Services / Law Enforcement"
                                    >
                                      Civil Services / Law Enforcement
                                    </option>
                                    <option
                                      value="Corporate Professionals"
                                      label="Corporate Professionals"
                                    >
                                      Corporate Professionals
                                    </option>
                                    <option value="Defense" label="Defense">
                                      Defense
                                    </option>
                                    <option
                                      value="Education &amp; Training"
                                      label="Education &amp; Training"
                                    >
                                      Education &amp; Training
                                    </option>
                                    <option value="Engineering" label="Engineering">
                                      Engineering
                                    </option>
                                    <option
                                      value="Hotel &amp; Hospitality"
                                      label="Hotel &amp; Hospitality"
                                    >
                                      Hotel &amp; Hospitality
                                    </option>
                                    <option
                                      value="IT &amp; Software Engineering"
                                      label="IT &amp; Software Engineering"
                                    >
                                      IT &amp; Software Engineering
                                    </option>
                                    <option value="Legal" label="Legal">
                                      Legal
                                    </option>
                                    <option
                                      value="Medical &amp; Healthcare"
                                      label="Medical &amp; Healthcare"
                                    >
                                      Medical &amp; Healthcare
                                    </option>
                                    <option
                                      value="Merchant Navy"
                                      label="Merchant Navy"
                                    >
                                      Merchant Navy
                                    </option>
                                    <option value="Non Working" label="Non Working">
                                      Non Working
                                    </option>
                                    <option value="Others" label="Others">
                                      Others
                                    </option>
                                    <option
                                      value="Sales &amp; Marketing"
                                      label="Sales &amp; Marketing"
                                    >
                                      Sales &amp; Marketing
                                    </option>
                                    <option value="Science" label="Science">
                                      Science
                                    </option>
                                  </select>
                                  <div
                                    className="ddSelWrap"
                                    id="ddSelWrap_occupation_area"
                                  >
                                    <div
                                      className="ddOptHolderWrapper"
                                      id="ddOptHolderWrapper_occupation_area"
                                    >
                                      <div
                                        className="ddOptHolder"
                                        id="ddOptHolder_occupation_area"
                                      >
                                        <div
                                          className="ddSelOptHolder ddSelOptHolderOpen"
                                          id="ddSelOptHolder_occupation_area"
                                        >
                                          <span
                                            className="ddSelectedOptSpan"
                                            id="ddSelectedOptSpan_occupation_area_"
                                          >
                                            Open to all
                                            <span className="multi_select_close"></span>
                                          </span>
                                          <input
                                            type="text"
                                            className="ddSelOptText"
                                            id="ddSelOptText_occupation_area"
                                            autocomplete="off"
                                            size="1"
                                            style={{ display: "none" }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="ddOptionHolder"
                                        id="ddOptionHolder_occupation_area"
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="clear"></div>
                                </div>
                                <div className="clear"></div>
                                <div
                                  id="occupation_area_statusWarn"
                                  className="edit_pp_alert_wrap"
                                  style={{ display: "none" }}
                                >
                                  This selection will significantly reduce the
                                  number of matches.
                                </div>
                                <div className="clear"></div>
                              </div>
                              <div id="working_as_div" style={{ display: "none" }}>
                                <div className="src_field">
                                  <label className="form_label">Working as</label>
                                  <div className="src_field_box">
                                    <select
                                      name="occupation[]"
                                      id="occupation"
                                      multiple="multiple"
                                      style={{ display: "none" }}
                                    >
                                      <option
                                        value=""
                                        label="Open to all"
                                        selected="selected"
                                      >
                                        Open to all
                                      </option>
                                    </select>
                                    <div
                                      className="ddSelWrap"
                                      id="ddSelWrap_occupation"
                                    >
                                      <div
                                        className="ddOptHolderWrapper"
                                        id="ddOptHolderWrapper_occupation"
                                      >
                                        <div
                                          className="ddOptHolder"
                                          id="ddOptHolder_occupation"
                                        >
                                          <div
                                            className="ddSelOptHolder ddSelOptHolderOpen"
                                            id="ddSelOptHolder_occupation"
                                          >
                                            <span
                                              className="ddSelectedOptSpan"
                                              id="ddSelectedOptSpan_occupation_"
                                            >
                                              Open to all
                                              <span className="multi_select_close"></span>
                                            </span>
                                            <input
                                              type="text"
                                              className="ddSelOptText"
                                              id="ddSelOptText_occupation"
                                              autocomplete="off"
                                              size="1"
                                              style={{ display: "none" }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          className="ddOptionHolder"
                                          id="ddOptionHolder_occupation"
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="clear"></div>
                                  </div>
                                  <div className="clear"></div>
                                </div>
                              </div>
                              <div className="src_field">
                                <label className="form_label">Annual income</label>
                                <div className="src_field_box">
                                  <label for="annualincome_applicable-">
                                    <input
                                      type="radio"
                                      name="annualincome_applicable"
                                      id="annualincome_applicable-"
                                      value=""
                                      className="rad_btn"
                                      onclick="show_hide_annualincome();"
                                    />
                                    Open to all
                                  </label>
                                  <label for="annualincome_applicable-range">
                                    <input
                                      type="radio"
                                      name="annualincome_applicable"
                                      id="annualincome_applicable-range"
                                      value="range"
                                      checked="checked"
                                      className="rad_btn"
                                      onclick="show_hide_annualincome();"
                                    />
                                    Specify an income range
                                  </label>
                                </div>
                                <div className="clear"></div>
                                <div id="annualincome_holder" className="">
                                  <div
                                    id="annualincome_container"
                                    className="pos_rel"
                                  >
                                    <div
                                      className="src_field_box big"
                                      id="annualincome_manual_inr"
                                    >
                                      <span className="currency_country">
                                        INR (Indian Rupee)
                                      </span>
                                      <div
                                        className="basecurrency_holder"
                                        style={{ display: "none" }}
                                      >
                                        <select
                                          name="basecurrency"
                                          id="basecurrency"
                                          className="income_section"
                                          style={{ display: "none" }}
                                        >
                                          <option
                                            value="INR"
                                            label="INR (Indian Rupee)"
                                            selected="selected"
                                          >
                                            INR (Indian Rupee)
                                          </option>
                                        </select>
                                        <div
                                          className="ddSelWrap"
                                          id="ddSelWrap_basecurrency"
                                        >
                                          <div
                                            className="ddOptHolderWrapper"
                                            id="ddOptHolderWrapper_basecurrency"
                                          >
                                            <div
                                              className="ddOptHolder"
                                              id="ddOptHolder_basecurrency"
                                            >
                                              <div
                                                className="ddSelOptHolder ddSelOptHolderOpen"
                                                id="ddSelOptHolder_basecurrency"
                                              >
                                                <span
                                                  className="ddSelectedOptSpan"
                                                  rel="INR"
                                                >
                                                  INR (Indian Rupee)
                                                </span>
                                                <input
                                                  type="text"
                                                  className="ddSelOptText"
                                                  id="ddSelOptText_basecurrency"
                                                  autocomplete="off"
                                                  size="1"
                                                  style={{ display: "none" }}
                                                />
                                              </div>
                                            </div>
                                            <div
                                              className="ddOptionHolder"
                                              id="ddOptionHolder_basecurrency"
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                      <select
                                        name="annualincome_inr_from"
                                        id="annualincome_inr_from"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="less than 1 lakh"
                                          label="below 1 lakh"
                                          selected="selected"
                                        >
                                          below 1 lakh
                                        </option>
                                        <option value="1 lakh" label="1 lakh">
                                          1 lakh
                                        </option>
                                        <option value="2 lakhs" label="2 lakhs">
                                          2 lakhs
                                        </option>
                                        <option value="4 lakhs" label="4 lakhs">
                                          4 lakhs
                                        </option>
                                        <option value="7 lakhs" label="7 lakhs">
                                          7 lakhs
                                        </option>
                                        <option value="10 lakhs" label="10 lakhs">
                                          10 lakhs
                                        </option>
                                        <option value="15 lakhs" label="15 lakhs">
                                          15 lakhs
                                        </option>
                                        <option value="20 lakhs" label="20 lakhs">
                                          20 lakhs
                                        </option>
                                        <option value="30 lakhs" label="30 lakhs">
                                          30 lakhs
                                        </option>
                                        <option value="50 lakhs" label="50 lakhs">
                                          50 lakhs
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_inr_from"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_inr_from"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_inr_from"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_inr_from"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="less than 1 lakh"
                                              >
                                                below 1 lakh
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_inr_from"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_inr_from"
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="rng">to</span>

                                      <select
                                        name="annualincome_inr_to"
                                        id="annualincome_inr_to"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="1 lakh"
                                          label="1 lakh"
                                          disabled="disabled"
                                        >
                                          1 lakh
                                        </option>
                                        <option value="2 lakhs" label="2 lakhs">
                                          2 lakhs
                                        </option>
                                        <option value="4 lakhs" label="4 lakhs">
                                          4 lakhs
                                        </option>
                                        <option value="7 lakhs" label="7 lakhs">
                                          7 lakhs
                                        </option>
                                        <option value="10 lakhs" label="10 lakhs">
                                          10 lakhs
                                        </option>
                                        <option value="15 lakhs" label="15 lakhs">
                                          15 lakhs
                                        </option>
                                        <option
                                          value="20 lakhs"
                                          label="20 lakhs"
                                          selected="selected"
                                        >
                                          20 lakhs
                                        </option>
                                        <option value="30 lakhs" label="30 lakhs">
                                          30 lakhs
                                        </option>
                                        <option value="50 lakhs" label="50 lakhs">
                                          50 lakhs
                                        </option>
                                        <option value="75 lakhs" label="75 lakhs">
                                          75 lakhs
                                        </option>
                                        <option value="1 crore" label="1 crore">
                                          1 crore
                                        </option>
                                        <option
                                          value="greater than 1 crore"
                                          label="above 1 crore"
                                        >
                                          above 1 crore
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_inr_to"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_inr_to"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_inr_to"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_inr_to"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="20 lakhs"
                                              >
                                                20 lakhs
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_inr_to"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_inr_to"
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="src_field_box big none"
                                      id="annualincome_manual_usd"
                                    >
                                      <span className="currency_country">
                                        USD (U.S. Dollar)
                                      </span>

                                      <select
                                        name="annualincome_usd_from"
                                        id="annualincome_usd_from"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="less than 40,000"
                                          label="below 40,000"
                                        >
                                          below 40,000
                                        </option>
                                        <option value="40,000" label="40,000">
                                          40,000
                                        </option>
                                        <option value="60,000" label="60,000">
                                          60,000
                                        </option>
                                        <option value="80,000" label="80,000">
                                          80,000
                                        </option>
                                        <option value="100,000" label="100,000">
                                          100,000
                                        </option>
                                        <option value="125,000" label="125,000">
                                          125,000
                                        </option>
                                        <option value="150,000" label="150,000">
                                          150,000
                                        </option>
                                        <option value="200,000" label="200,000">
                                          200,000
                                        </option>
                                        <option value="250,000" label="250,000">
                                          250,000
                                        </option>
                                        <option value="350,000" label="350,000">
                                          350,000
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_usd_from"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_usd_from"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_usd_from"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_usd_from"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="less than 40,000"
                                              >
                                                below 40,000
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_usd_from"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_usd_from"
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="rng">to</span>

                                      <select
                                        name="annualincome_usd_to"
                                        id="annualincome_usd_to"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="40,000"
                                          label="40,000"
                                          disabled="disabled"
                                        >
                                          40,000
                                        </option>
                                        <option value="60,000" label="60,000">
                                          60,000
                                        </option>
                                        <option value="80,000" label="80,000">
                                          80,000
                                        </option>
                                        <option value="100,000" label="100,000">
                                          100,000
                                        </option>
                                        <option value="125,000" label="125,000">
                                          125,000
                                        </option>
                                        <option value="150,000" label="150,000">
                                          150,000
                                        </option>
                                        <option value="200,000" label="200,000">
                                          200,000
                                        </option>
                                        <option value="250,000" label="250,000">
                                          250,000
                                        </option>
                                        <option value="350,000" label="350,000">
                                          350,000
                                        </option>
                                        <option value="500,000" label="500,000">
                                          500,000
                                        </option>
                                        <option
                                          value="greater than 500,000"
                                          label="above 500,000"
                                          selected="selected"
                                        >
                                          above 500,000
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_usd_to"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_usd_to"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_usd_to"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_usd_to"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="greater than 500,000"
                                              >
                                                above 500,000
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_usd_to"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_usd_to"
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="src_field_box big none"
                                      id="annualincome_manual_gbp"
                                    >
                                      <span className="currency_country">
                                        GBP (UK Pound)
                                      </span>

                                      <select
                                        name="annualincome_gbp_from"
                                        id="annualincome_gbp_from"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="less than 20,000"
                                          label="below 20,000"
                                        >
                                          below 20,000
                                        </option>
                                        <option value="20,000" label="20,000">
                                          20,000
                                        </option>
                                        <option value="30,000" label="30,000">
                                          30,000
                                        </option>
                                        <option value="40,000" label="40,000">
                                          40,000
                                        </option>
                                        <option value="50,000" label="50,000">
                                          50,000
                                        </option>
                                        <option value="75,000" label="75,000">
                                          75,000
                                        </option>
                                        <option value="100,000" label="100,000">
                                          100,000
                                        </option>
                                        <option value="125,000" label="125,000">
                                          125,000
                                        </option>
                                        <option value="150,000" label="150,000">
                                          150,000
                                        </option>
                                        <option value="200,000" label="200,000">
                                          200,000
                                        </option>
                                        <option value="250,000" label="250,000">
                                          250,000
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_gbp_from"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_gbp_from"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_gbp_from"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_gbp_from"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="less than 20,000"
                                              >
                                                below 20,000
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_gbp_from"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_gbp_from"
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="rng">to</span>

                                      <select
                                        name="annualincome_gbp_to"
                                        id="annualincome_gbp_to"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="20,000"
                                          label="20,000"
                                          disabled="disabled"
                                        >
                                          20,000
                                        </option>
                                        <option value="30,000" label="30,000">
                                          30,000
                                        </option>
                                        <option value="40,000" label="40,000">
                                          40,000
                                        </option>
                                        <option value="50,000" label="50,000">
                                          50,000
                                        </option>
                                        <option value="75,000" label="75,000">
                                          75,000
                                        </option>
                                        <option value="100,000" label="100,000">
                                          100,000
                                        </option>
                                        <option value="125,000" label="125,000">
                                          125,000
                                        </option>
                                        <option value="150,000" label="150,000">
                                          150,000
                                        </option>
                                        <option value="200,000" label="200,000">
                                          200,000
                                        </option>
                                        <option value="250,000" label="250,000">
                                          250,000
                                        </option>
                                        <option value="300,000" label="300,000">
                                          300,000
                                        </option>
                                        <option
                                          value="greater than 300,000"
                                          label="above 300,000"
                                          selected="selected"
                                        >
                                          above 300,000
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_gbp_to"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_gbp_to"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_gbp_to"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_gbp_to"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="greater than 300,000"
                                              >
                                                above 300,000
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_gbp_to"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_gbp_to"
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="src_field_box big none"
                                      id="annualincome_manual_aud"
                                    >
                                      <span className="currency_country">
                                        AUD (Australian Dollar)
                                      </span>

                                      <select
                                        name="annualincome_aud_from"
                                        id="annualincome_aud_from"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="less than 40,000"
                                          label="below 40,000"
                                        >
                                          below 40,000
                                        </option>
                                        <option value="40,000" label="40,000">
                                          40,000
                                        </option>
                                        <option value="60,000" label="60,000">
                                          60,000
                                        </option>
                                        <option value="80,000" label="80,000">
                                          80,000
                                        </option>
                                        <option value="100,000" label="100,000">
                                          100,000
                                        </option>
                                        <option value="125,000" label="125,000">
                                          125,000
                                        </option>
                                        <option value="150,000" label="150,000">
                                          150,000
                                        </option>
                                        <option value="200,000" label="200,000">
                                          200,000
                                        </option>
                                        <option value="250,000" label="250,000">
                                          250,000
                                        </option>
                                        <option value="350,000" label="350,000">
                                          350,000
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_aud_from"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_aud_from"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_aud_from"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_aud_from"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="less than 40,000"
                                              >
                                                below 40,000
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_aud_from"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_aud_from"
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="rng">to</span>

                                      <select
                                        name="annualincome_aud_to"
                                        id="annualincome_aud_to"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="40,000"
                                          label="40,000"
                                          disabled="disabled"
                                        >
                                          40,000
                                        </option>
                                        <option value="60,000" label="60,000">
                                          60,000
                                        </option>
                                        <option value="80,000" label="80,000">
                                          80,000
                                        </option>
                                        <option value="100,000" label="100,000">
                                          100,000
                                        </option>
                                        <option value="125,000" label="125,000">
                                          125,000
                                        </option>
                                        <option value="150,000" label="150,000">
                                          150,000
                                        </option>
                                        <option value="200,000" label="200,000">
                                          200,000
                                        </option>
                                        <option value="250,000" label="250,000">
                                          250,000
                                        </option>
                                        <option value="350,000" label="350,000">
                                          350,000
                                        </option>
                                        <option value="500,000" label="500,000">
                                          500,000
                                        </option>
                                        <option
                                          value="greater than 500,000"
                                          label="above 500,000"
                                          selected="selected"
                                        >
                                          above 500,000
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_aud_to"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_aud_to"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_aud_to"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_aud_to"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="greater than 500,000"
                                              >
                                                above 500,000
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_aud_to"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_aud_to"
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="src_field_box big none"
                                      id="annualincome_manual_aed"
                                    >
                                      <span className="currency_country">
                                        AED (UAE Dirham)
                                      </span>

                                      <select
                                        name="annualincome_aed_from"
                                        id="annualincome_aed_from"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="less than 60,000"
                                          label="below 60,000"
                                        >
                                          below 60,000
                                        </option>
                                        <option value="60,000" label="60,000">
                                          60,000
                                        </option>
                                        <option value="90,000" label="90,000">
                                          90,000
                                        </option>
                                        <option value="120,000" label="120,000">
                                          120,000
                                        </option>
                                        <option value="150,000" label="150,000">
                                          150,000
                                        </option>
                                        <option value="180,000" label="180,000">
                                          180,000
                                        </option>
                                        <option value="240,000" label="240,000">
                                          240,000
                                        </option>
                                        <option value="300,000" label="300,000">
                                          300,000
                                        </option>
                                        <option value="360,000" label="360,000">
                                          360,000
                                        </option>
                                        <option value="500,000" label="500,000">
                                          500,000
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_aed_from"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_aed_from"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_aed_from"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_aed_from"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="less than 60,000"
                                              >
                                                below 60,000
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_aed_from"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_aed_from"
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="rng">to</span>

                                      <select
                                        name="annualincome_aed_to"
                                        id="annualincome_aed_to"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="60,000"
                                          label="60,000"
                                          disabled="disabled"
                                        >
                                          60,000
                                        </option>
                                        <option value="90,000" label="90,000">
                                          90,000
                                        </option>
                                        <option value="120,000" label="120,000">
                                          120,000
                                        </option>
                                        <option value="150,000" label="150,000">
                                          150,000
                                        </option>
                                        <option value="180,000" label="180,000">
                                          180,000
                                        </option>
                                        <option value="240,000" label="240,000">
                                          240,000
                                        </option>
                                        <option value="300,000" label="300,000">
                                          300,000
                                        </option>
                                        <option value="360,000" label="360,000">
                                          360,000
                                        </option>
                                        <option value="500,000" label="500,000">
                                          500,000
                                        </option>
                                        <option value="750,000" label="750,000">
                                          750,000
                                        </option>
                                        <option
                                          value="greater than 750,000"
                                          label="above 750,000"
                                          selected="selected"
                                        >
                                          above 750,000
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_aed_to"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_aed_to"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_aed_to"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_aed_to"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="greater than 750,000"
                                              >
                                                above 750,000
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_aed_to"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_aed_to"
                                          ></div>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className="src_field_box big none"
                                      id="annualincome_manual_pkr"
                                    >
                                      <span className="currency_country">
                                        PKR (Pakistani Rupee)
                                      </span>

                                      <select
                                        name="annualincome_pkr_from"
                                        id="annualincome_pkr_from"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="less than 1 lakh"
                                          label="below 1 lakh"
                                        >
                                          below 1 lakh
                                        </option>
                                        <option value="1 lakh" label="1 lakh">
                                          1 lakh
                                        </option>
                                        <option value="2 lakhs" label="2 lakhs">
                                          2 lakhs
                                        </option>
                                        <option value="3 lakhs" label="3 lakhs">
                                          3 lakhs
                                        </option>
                                        <option value="5 lakhs" label="5 lakhs">
                                          5 lakhs
                                        </option>
                                        <option value="7 lakhs" label="7 lakhs">
                                          7 lakhs
                                        </option>
                                        <option value="10 lakhs" label="10 lakhs">
                                          10 lakhs
                                        </option>
                                        <option value="20 lakhs" label="20 lakhs">
                                          20 lakhs
                                        </option>
                                        <option value="30 lakhs" label="30 lakhs">
                                          30 lakhs
                                        </option>
                                        <option value="50 lakhs" label="50 lakhs">
                                          50 lakhs
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_pkr_from"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_pkr_from"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_pkr_from"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_pkr_from"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="less than 1 lakh"
                                              >
                                                below 1 lakh
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_pkr_from"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_pkr_from"
                                          ></div>
                                        </div>
                                      </div>
                                      <span className="rng">to</span>

                                      <select
                                        name="annualincome_pkr_to"
                                        id="annualincome_pkr_to"
                                        className="income_section"
                                        style={{ display: "none" }}
                                      >
                                        <option
                                          value="1 lakh"
                                          label="1 lakh"
                                          disabled="disabled"
                                        >
                                          1 lakh
                                        </option>
                                        <option value="2 lakhs" label="2 lakhs">
                                          2 lakhs
                                        </option>
                                        <option value="3 lakhs" label="3 lakhs">
                                          3 lakhs
                                        </option>
                                        <option value="5 lakhs" label="5 lakhs">
                                          5 lakhs
                                        </option>
                                        <option value="7 lakhs" label="7 lakhs">
                                          7 lakhs
                                        </option>
                                        <option value="10 lakhs" label="10 lakhs">
                                          10 lakhs
                                        </option>
                                        <option value="20 lakhs" label="20 lakhs">
                                          20 lakhs
                                        </option>
                                        <option value="30 lakhs" label="30 lakhs">
                                          30 lakhs
                                        </option>
                                        <option value="50 lakhs" label="50 lakhs">
                                          50 lakhs
                                        </option>
                                        <option value="75 lakhs" label="75 lakhs">
                                          75 lakhs
                                        </option>
                                        <option value="1 crore" label="1 crore">
                                          1 crore
                                        </option>
                                        <option
                                          value="greater than 1 crore"
                                          label="above 1 crore"
                                          selected="selected"
                                        >
                                          above 1 crore
                                        </option>
                                      </select>
                                      <div
                                        className="ddSelWrap"
                                        id="ddSelWrap_annualincome_pkr_to"
                                      >
                                        <div
                                          className="ddOptHolderWrapper"
                                          id="ddOptHolderWrapper_annualincome_pkr_to"
                                        >
                                          <div
                                            className="ddOptHolder"
                                            id="ddOptHolder_annualincome_pkr_to"
                                          >
                                            <div
                                              className="ddSelOptHolder ddSelOptHolderOpen"
                                              id="ddSelOptHolder_annualincome_pkr_to"
                                            >
                                              <span
                                                className="ddSelectedOptSpan"
                                                rel="greater than 1 crore"
                                              >
                                                above 1 crore
                                              </span>
                                              <input
                                                type="text"
                                                className="ddSelOptText"
                                                id="ddSelOptText_annualincome_pkr_to"
                                                autocomplete="off"
                                                size="1"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            className="ddOptionHolder"
                                            id="ddOptionHolder_annualincome_pkr_to"
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                    <a
                                      id="annualincome_auto_link"
                                      href="/"
                                      className="tooltip_icon waves-effect waves-circle"
                                    ></a>
                                    <div className="tt rightEnd">
                                      <span
                                        onmouseover="cancelclosetime();img_tool_tip('tool_top102')"
                                        onmouseout="set_tooltip_timeout('tool_top102')"
                                        id="tool_top102"
                                        style={{ display: "none", padding: "0" }}
                                        className="tooltip"
                                      >
                                        <span className="top"></span>
                                        <span className="middle-tip">
                                          We will automatically set an income range
                                          for other currencies, based on cost of
                                          living in different countries.
                                        </span>
                                        <span className="bottom"></span>
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    id="basecurrency_container_template"
                                    className="none"
                                  >
                                    <div className="basecurrency_holder">
                                      <select
                                        name="basecurrency_template"
                                        id="basecurrency_template"
                                        className="income_section"
                                      >
                                        <option
                                          value="INR"
                                          label="INR (Indian Rupee)"
                                          selected="selected"
                                        >
                                          INR (Indian Rupee)
                                        </option>
                                        <option
                                          value="PKR"
                                          label="PKR (Pakistani Rupee)"
                                        >
                                          PKR (Pakistani Rupee)
                                        </option>
                                        <option value="GBP" label="GBP (UK Pound)">
                                          GBP (UK Pound)
                                        </option>
                                        <option
                                          value="AED"
                                          label="AED (UAE Dirham)"
                                        >
                                          AED (UAE Dirham)
                                        </option>
                                        <option
                                          value="AUD"
                                          label="AUD (Australian Dollar)"
                                        >
                                          AUD (Australian Dollar)
                                        </option>
                                        <option
                                          value="USD"
                                          label="USD (U.S. Dollar)"
                                        >
                                          USD (U.S. Dollar)
                                        </option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="src_field_box big">
                                    <div id="annualincome_notspecified">
                                      <label for="annualincome_notspecified-Dontwanttospecify">
                                        <input
                                          type="checkbox"
                                          name="annualincome_notspecified[]"
                                          id="annualincome_notspecified-Dontwanttospecify"
                                          value="Dont want to specify"
                                          className="rad_btn"
                                        />
                                        Include Profiles who have not specified
                                        their income
                                      </label>
                                      <a
                                        id="annualincome_notspecified_link"
                                        href="/"
                                        onmouseover="cancelclosetime();show_bubble_tool_tip(this.id,'tool_top103');"
                                        onmouseout="canceldelayclosetime();set_tooltip_timeout('tool_top103');"
                                        className="tooltip_icon waves-effect waves-circle"
                                      ></a>
                                      <div className="tt rightEnd">
                                        <span
                                          onmouseover="cancelclosetime();img_tool_tip('tool_top103')"
                                          onmouseout="set_tooltip_timeout('tool_top103')"
                                          id="tool_top103"
                                          style={{ display: "none", padding: "0" }}
                                          className="tooltip"
                                        >
                                          <span className="top"></span>
                                          <span className="middle-tip">
                                            Please note that removing this option
                                            may reduce your results and remove
                                            relevant profiles from your search.
                                          </span>
                                          <span className="bottom"></span>
                                        </span>
                                      </div>
                                    </div>

                                    <div
                                      id="annualincome_auto_container"
                                      className="none"
                                    >
                                      <label for="annualincome_auto-auto">
                                        <input
                                          type="checkbox"
                                          name="annualincome_auto[]"
                                          id="annualincome_auto-auto"
                                          value="auto"
                                          checked="checked"
                                          className="rad_btn none"
                                        />
                                        Use Smart Income Search
                                      </label>
                                    </div>
                                    <div className="clear"></div>
                                  </div>
                                  <div className="clear"></div>
                                </div>
                              </div>
                            </div>

                            <div className="section_heding">Other Details</div>

                            <div className="section_container">
                              <div className="src_field">
                                <label className="form_label">
                                  Profile created by
                                </label>
                                <div className="src_field_box_created_by">
                                  <label for="relationship-">
                                    <input
                                      type="checkbox"
                                      name="relationship[]"
                                      id="relationship-"
                                      value=""
                                      checked="checked"
                                      className="src_check_bx"
                                    />
                                    Open to all
                                  </label>
                                  <label for="relationship-Self">
                                    <input
                                      type="checkbox"
                                      name="relationship[]"
                                      id="relationship-Self"
                                      value="Self"
                                      className="src_check_bx"
                                    />
                                    Self
                                  </label>
                                  <label for="relationship-ParentGuardian">
                                    <input
                                      type="checkbox"
                                      name="relationship[]"
                                      id="relationship-ParentGuardian"
                                      value="Parent / Guardian"
                                      className="src_check_bx"
                                    />
                                    Parent / Guardian
                                  </label>
                                  <label for="relationship-SiblingFriendOther">
                                    <input
                                      type="checkbox"
                                      name="relationship[]"
                                      id="relationship-SiblingFriendOther"
                                      value="Sibling|Friend|Other"
                                      className="src_check_bx"
                                    />
                                    Sibling / Friend / Others
                                  </label>
                                </div>
                                <div
                                  id="relationship_statusWarn"
                                  className="edit_pp_alert_wrap"
                                  style={{ display: "none" }}
                                >
                                  This selection will significantly reduce the
                                  number of matches.
                                </div>
                                <div className="slider_box none">
                                  <div className="slider_container slider_deactive">
                                    <a className="minus_btn" href="/"></a>
                                    <div className="slider_bar">
                                      <div className="slider"></div>
                                      <div className="slider_tooltip_container"></div>
                                    </div>
                                    <a className="plus_btn" href="/"></a>
                                    <div className="tooltip_help_container"></div>
                                    <div className="clear"></div>
                                  </div>
                                </div>
                                <div className="clear"></div>
                              </div>
                              <div className="src_field">
                                <label className="form_label">Diet</label>
                                <div className="src_field_box line_height">
                                  <label for="dietarray-">
                                    <input
                                      type="checkbox"
                                      name="diet[]"
                                      id="dietarray-"
                                      value=""
                                      checked="checked"
                                      className="src_check_bx"
                                    />
                                    Open to all
                                  </label>
                                  <label for="dietarray-Veg">
                                    <input
                                      type="checkbox"
                                      name="diet[]"
                                      id="dietarray-Veg"
                                      value="Veg"
                                      className="src_check_bx"
                                    />
                                    Veg
                                  </label>
                                  <label for="dietarray-OccasionallyNon-VegNon-Veg">
                                    <input
                                      type="checkbox"
                                      name="diet[]"
                                      id="dietarray-OccasionallyNon-VegNon-Veg"
                                      value="Occasionally Non-Veg|Non-Veg"
                                      className="src_check_bx"
                                    />
                                    Non-Veg
                                  </label>
                                  <label for="dietarray-Jain">
                                    <input
                                      type="checkbox"
                                      name="diet[]"
                                      id="dietarray-Jain"
                                      value="Jain"
                                      className="src_check_bx"
                                    />
                                    Jain
                                  </label>
                                  <label for="dietarray-Vegan">
                                    <input
                                      type="checkbox"
                                      name="diet[]"
                                      id="dietarray-Vegan"
                                      value="Vegan"
                                      className="src_check_bx"
                                    />
                                    Vegan
                                  </label>
                                </div>
                                <div className="clear"></div>
                                <div className="src_field_box big" id="egg_field">
                                  <label
                                    for="dietarray-Eggetarian"
                                    style={{ display: "none" }}
                                  >
                                    <input
                                      type="checkbox"
                                      name="diet[]"
                                      id="dietarray-Eggetarian"
                                      value="Eggetarian"
                                      className="src_check_bx"
                                      style={{ display: "none" }}
                                    />
                                    Include Eggetarian Profiles
                                  </label>
                                </div>
                                <div className="clear"></div>
                              </div>
                            </div>
                          </div>

                          <div id="slider_tooltip_patterns" className="none">
                            <div className="tooltip_green">
                              <div className="tooltip_inner">
                                Very Important
                                <div className="notch_green"></div>
                              </div>
                            </div>

                            <div className="tooltip_yellow">
                              <div className="tooltip_inner">
                                Somewhat Important
                                <div className="notch_yellow"></div>
                              </div>
                            </div>

                            <div className="tooltip_gray">
                              <div className="tooltip_inner">
                                Specify a preference before <br />
                                setting importance
                                <div className="notch_gray"></div>
                                <div className="arrow_tooltip"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="btn_wrapper"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "1rem",
                            }}
                          >
                            <button type="submit" className="primary">
                              Set &amp; Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {tabs === 4 ? (
                <Setting user={user} refresh={refresh} setRefresh={setRefresh} />
              ) : (
                ""
              )}
            </div>
            <br></br>
            {/* {tabs == 0 && (
              
              <div className="recommended-match container">
                <div
                className="name"
                style={{
                  width: "100%",
                  color: "grey",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {" "}
                <h3>Recommended Matches</h3>
              </div>
                {recommendedUser?.length > 0 &&
                  recommendedUser.map(
                    (user, index) =>
                      index < 5 && (
                        <div className="user-card">
                          <RiFileUserLine size={"100%"} color="grey" />
                          <div className="name">
                            <button
                              onClick={() => {
                                history("/profile", {
                                  state: { data: [user], admin: false },
                                });
                              }}
                            >
                              {user.name}
                            </button>
                          </div>
                        </div>
                      )
                  )}
              </div>
            )} */}
          </div>
        </>
       
      
      
    </>
  );
}