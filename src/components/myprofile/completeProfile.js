import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FaUser, FaUserShield } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import { countryList } from "./Country";
import ManageProfile from "./ManageProfile";
import { indianState } from "./states";
import { communityData } from "../../communityData";
import { educationData } from "../../EducationData";
import { occupation } from "../../occupation";
export default function CompleteProfile({ user }) {
  const history = useNavigate();
  const { state } = useLocation();
  const [userData, setUserData] = useState();
  const [showReligiousForm, setShowReligiousForm] = useState(false);
  const [showBasicForm, setShowBasicForm] = useState(true);
  const [showOthersInfoForm, setShowOthersInfoForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showEducationInfoForm, setShowEducationInfoForm] = useState(false);
  const [percentage, setPercentage] = useState(20);
  const [Religion, setReligion] = useState("Hindu");
  const [Community, setCommunity] = useState();
  const [SubCommunity, setSubCommunity] = useState();
  const [MotherTongue, setMotherTongue] = useState();
  const [CanSpeak, setCanSpeak] = useState([
    { name: "Assamese" },
    { name: "Bengali" },
    { name: "English" },
    { name: "Gujarati" },
    { name: "Hindi" },
    { name: "Kannada" },
    { name: "Kashmiri" },
    { name: "Konkani" },
    { name: "Malayalam" },
    { name: "Manipuri" },
    { name: "Marathi" },
    { name: "Nepali" },
    { name: "Oriya" },
    { name: "Punjabi" },
    { name: "Sanskrit" },
    { name: "Sindhi" },
    { name: "Tamil" },
    { name: "Telugu" },
    { name: "Urdu" },
    { name: "Bodo" },
    { name: "Santhali" },
    { name: "Maithili" },
    { name: "Dogri" },
  ]);
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  const [FatherStatus, setFatherStatus] = useState();
  const [MotherStatus, setMotherStatus] = useState();
  const [FatherName, setFatherName] = useState();
  const [MotherName, setMotherName] = useState();
  const [FatherOccupation, setFatherOccupation] = useState();
  const [MotherOccupation, setMotherOccupation] = useState();
  const [FamilyLocation, setFamilyLocation] = useState();
  const [NativePlace, setNativePlace] = useState();
  const [NoofBrothers, setNoofBrothers] = useState();
  const [NoofSisters, setNoofSisters] = useState();
  const [FamilyType, setFamilyType] = useState();
  const [FamilyValues, setFamilyValues] = useState();
  const [FamilyAffluence, setFamilyAffluence] = useState();
  const [country, setCountry] = useState("India");
  const [newstate, setState] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [Profilecreatedby, setProfilecreatedby] = useState();
  const [Age, setAge] = useState();
  const [DateofBirth, setDOB] = useState();
  const [MaritalStatus, setMaritalStatus] = useState();
  const [Height, setHeight] = useState();
  const [Grewupin, setGrowUpIn] = useState();
  const [PersonalValues, setPersonValue] = useState();
  const [SunSign, setSunSign] = useState();
  const [Stars , setStars] = useState();
  const [Laknam, setLaknam] = useState();
  const [Irupu , setIrupu] = useState();
  const [BloodGroup, setBloodGroup] = useState();
  const [Heal, setHeal] = useState();
  const [Diet, setDiet] = useState();
  const [HighestQualification, setHighestQualification] = useState();
  const [WorkingAs, setWorkingAs] = useState();
  const [AnnualIncome, setAnnualIncome] = useState();
  const [WorkingWith, setWorkingwith] = useState();
  const [ProfessionalArea, setProfessionalArea] = useState();
  const [previewSrc, setPreviewSrc] = useState({});
  const [FamilyClass, setFamilyClass] = useState("");
  const [fileType, setFileType] = useState("");
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const [items, setItems] = useState([]);
  const [about, setAbout] = useState("");
  const [profileName, setProfileName] = useState();
  const [loading, setLoading] = useState(false);
  
  const fileChangeHandler = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    // setFileType(file.type);
    if (file.type.substring(0, 5) === "image") {
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      bodyFormData.set("key", "178218f045ee799c77be43a0e8b0ba0b");
      axios
        .post("https://api.imgbb.com/1/upload", bodyFormData)
        .then((res) => {
          setPreviewSrc({ url: res.data.data.url });
          const bodyData = {
            id: user?.tokenUser?.userId,
            url: res.data.data.url,
          };
          axios
            .post(
              process.env.REACT_APP_API_URL+"user/attachHoroscope",
              bodyData
            )
            .then((res) => {
              setLoading(false);
              getUserInfo();
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
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  // console.log(state?.data,"skydata")
  // const userInfo = user;

  const handleChange = (event) => {
    setField({ ...field, [event.target.name]: event.target.value });
  };
  const handleSubmitBasicInfo = (e) => {
    if (Age && MaritalStatus && Height) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            BasicsAndLifestyle: {
              profileName: profileName,
              Age,
              DateofBirth,
              MaritalStatus,
              Height,
              Grewupin,
              PersonalValues,
              SunSign,
              Stars,
              BloodGroup,
              Heal,
              about,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then((data) => {
          setShowBasicForm(!showBasicForm);
          setShowFamilyForm(false);
          setShowReligiousForm(!showReligiousForm);
          setPercentage(20);
        })
        .catch((err) => console.log(err));
    } else alert("Fill required (*) fileds");
  };
  const handleSubmitReligiousInfo = (e) => {
    if (Community && SubCommunity && MotherTongue) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            ReligiousBackground: {
              Religion,
              Community,
              SubCommunity,
              MotherTongue,
              CanSpeak: items,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then(() => {
          setShowReligiousForm(!showReligiousForm);
          setShowBasicForm(false);
          setShowFamilyForm(!showFamilyForm);

          setPercentage(40);
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    } else alert("Fill required (*) fileds");

    // axios.post(process.env.REACT_APP_API_URL+"user/register", field).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log(err)
    // })
  };
  const handleSubmitFamilyInfo = (e) => {
    if (FatherStatus && MotherStatus) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            Familydetails: {
              FatherName,
              MotherName,
              FatherStatus,
              MotherStatus,
              FamilyLocation,
              NativePlace,
              NoofBrothers,
              NoofSisters,
              FamilyType,
              FamilyValues,
              FamilyAffluence,
              FamilyClass,
              FatherOccupation,
              MotherOccupation,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then(() => {
          setShowFamilyForm(!showFamilyForm);
          setShowLocationForm(!showLocationForm);

          setPercentage(60);
        })
        .catch((err) => alert(JSON.stringify(err)));
    } else alert("Fill required (*) fileds");
  };
  const handleSubmitLocationInfo = (e) => {
    if (country && newstate && city && zip) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            contactDetails: {
              country: country,
              state: newstate,
              city: city,
              zipCode: zip,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then((data) => {
          setShowLocationForm(!showLocationForm);
          setShowEducationInfoForm(!showEducationInfoForm);
          setPercentage(80);
        })
        .catch((err) => console.log(err));
    } else alert("Fill required (*) fileds");
  };
  const handleSubmitEductaionInfo = () => {
    if (HighestQualification && WorkingAs && AnnualIncome) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            EducationAndCareer: {
              HighestQualification,
              WorkingAs,
              AnnualIncome,
              WorkingWith,
              ProfessionalArea,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then((data) => {
          setShowEducationInfoForm(!showEducationInfoForm);
          setShowOthersInfoForm(!showOthersInfoForm);
          setPercentage(100);
        })
        .catch((err) => console.log(err));
    } else alert("Fill required (*) fileds");
  };
  const handleSubmitOthersInfo = (e) => {
    // axios.post(process.env.REACT_APP_API_URL+"user/register", field).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log(err)
    // })
    if (Profilecreatedby) {
      axios
        .post(
          process.env.REACT_APP_API_URL+"user/edituser",
          {
            otherDetails: {
              Profilecreatedby,
              Diet,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then((data) => {
          setShowOthersInfoForm(!showOthersInfoForm);

          setPercentage(100);
          history("/dashboard");
        })
        .catch((err) => console.log(err));
    } else alert("Fill required (*) fileds");
  };

  const getUserInfo = (id) => {
    axios
      .get(process.env.REACT_APP_API_URL+`user/getuser/${id}`)
      .then((data) => {
        setUserData(data?.data);
        setField(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let id = user?.tokenUser?.userId;
    if (id) {
      getUserInfo(id);
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelect = (selectedList) => {
    setItems(selectedList);
  };

  const handleRemove = (selectedList) => {
    setItems(selectedList);
  };
  var headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "ZzcyNVdUMnZwbEs3VXZHMWpzVU5BRmthbmNZNkRrSTJsa1h3UW45YQ=="
  );
  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };
  const [allCountries, setAllCountries] = useState([]);
  useEffect(() => {
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setAllCountries(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [states, setStates] = useState([]);
  const [countryCode, setCountryCode] = useState("IN");
  const [cities, setCities] = useState([]);
  const [stateCode, setStateCode] = useState("");
  useEffect(() => {
    if (countryCode) {
      fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          setStates(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [country]);
  useEffect(() => {
      fetch(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          setCities(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [countryCode, stateCode]);

  const [verified, setVerified] = useState(false)
  const isverified = localStorage.getItem("dtruserverified");
  const [otp, setOtp] = useState("");
  const handleOtpVerification = () => {
    if (otp == user.tokenUser.otpVerification) {
      setVerified(true);
      localStorage.setItem("dtruserverified", "true");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div
      className="login-box"
      style={{
        minHeight: showFamilyForm || showBasicForm ? "180vh" : "110vh",
        justifyContent: "flex-start",
      }}
    >
      {verified ? (
        <div
          className="login-card"
          style={{ minWidth: "60%", minHeight: "105vh" }}
        >
          <h3>
            Please Fill {showBasicForm ? "Basic Details" : null}{" "}
            {showReligiousForm ? "Religious Info" : ""}{" "}
            {showFamilyForm ? "Family Info" : ""}{" "}
            {showLocationForm ? "Location Info" : ""}{" "}
            {showOthersInfoForm ? "Final Info" : ""} To Continue
          </h3>
          {showBasicForm ? (
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group controlId="formFile" className="mb-3">
                {/* <Form.Label>Profile Name</Form.Label>
                <Form.Control
                  aria-label="Default select example"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                ></Form.Control> */}
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Date of Birth*</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => {
                      setDOB(e.target.value);
                      setAge(2022 - new Date(e.target.value).getFullYear());
                    }}
                    value={DateofBirth}
                  />
                  <Form.Label>Age*</Form.Label>
                  <Form.Control
                    aria-label="Default select example"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                    disabled
                  ></Form.Control>
                </Form.Group>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Marital Status*</Form.Label>
                <Form.Select
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  value={MaritalStatus}
                  required
                >
                  <option>select</option>
                  <option value={"Never Married"}>Never Married</option>
                  <option value={"Seperated"}>Seperated</option>

                  <option value={"Divorced"}>Divorced</option>
                  <option value={"Widow/Widower"}>Widow/Widower</option>
                  <option value={"Awaiting Divorce"}>Awaiting Divorce</option>
                  <option value={"Annulled"}>Annulled</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Height*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setHeight(e.target.value)}
                  value={Height}
                >
                  <option>select</option>
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
                    <option value={e}>{e.split(".").join("ft ")}in</option>
                  ))}
                </Form.Select>
              </Form.Group>
              {/* <Form.Group controlId="formFileLg" className="mb-3">
             <Form.Label>Grew up in:</Form.Label>
             <Form.Select
               type="text"
               onChange={(e) => setGrowUpIn(e.target.value)}
               value={Grewupin}
             >
             {indianState.states.map(data=>(<option value={data.state}>{data.state}</option>))}
             
             </Form.Select>
           </Form.Group>{" "} */}
              {/* <Form.Group controlId="formFileDisabled" className="mb-3">
             <Form.Label>Personal Values:</Form.Label>
             <Form.Select
               type="text"
               onChange={(e) => setPersonValue(e.target.value)}
               value={PersonalValues}
             >
               {["Orthodox","Traditional","Moderate","Liberal"].map(e=><option value={e}>{e}</option>)}
               </Form.Select>
           </Form.Group>{" "} */}
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Sun Sign:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setSunSign(e.target.value)}
                  value={SunSign}
                >
                  {[
                    "Capricorn / Magaram",
                    "Aquarius / Kumbam",
                    "Pisces /  Meenam",
                    "Aries /  Mesam",
                    "Taurus /  Rishabam",
                    "Gemini / Midhunam",
                    "Leo / Simmam",
                    "Virgo / Kanni",
                    "Libra / Thulam",
                    "Scorpio / Viruchigam",
                    "Sagittarius / Thanushu",
                    "Cancer /  Kadagam",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Star:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setStars(e.target.value)}
                  value={Stars}
                >
                  {[
                    "Anusham",
                    "Aswini",
                    "Avitam",
                    "Ayiliyam",
                    "Barani",
                    "Chitirai",
                    "Hastam",
                    "Kettai",
                    "Karthigai",
                    "Magam",
                    "Mirugasersham",
                    "Moolam",
                    "Pooradam",
                    "Pooram",
                    "Pooratathi",
                    "Poosam",
                    "Ponarpoorsam",
                    "Revathi",
                    "Rohini",
                    "Sathayam",
                    "Swathi",
                    "Thiruvathiri",
                    "Thiruvonam",
                    "Uthiram",
                    "Uthiratam",
                    "Uthiratathi",
                    "Visaham"
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Laknam:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setLaknam(e.target.value)}
                  value={Laknam}
                >
                  {[
                    "Dhanus",
                    "Kanni",
                    "Kadagam",
                    "Kumbam",
                    "Maharam",
                    "Meenam",
                    "Masham",
                    "Mithunam",
                    "Rishabam",
                    "Simmam",
                    "Tulam",
                    "Viruchikam",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Thisai Iruppu:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setIrupu(e.target.value)}
                  value={Irupu}
                />
              </Form.Group>
              {previewSrc.url === undefined  ? (
                <Form.Group controlId="formFileDisabled" className="mb-3">
                  <Form.Label>Attach Horoscope:</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={fileChangeHandler}
                  ></Form.Control>
                </Form.Group>
              ) : (
                <div>
                  <img className="w-100" src={previewSrc?.url} alt="" />
                </div>
              )}

              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Blood Group:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setBloodGroup(e.target.value)}
                  value={BloodGroup}
                >
                  <option>select</option>
                  {["A+", " A-", "B+", " B-", " O+", " O-", "AB+", "AB-"].map(
                    (e) => (
                      <option value={e}>{e}</option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>About Him/Her </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                />
              </Form.Group>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => handleSubmitBasicInfo()}
                  className="primary"
                  style={{ width: "100px", margin: "5px" }}
                >
                  Continue
                </button>
              </div>
            </Form>
          ) : null}

          {showReligiousForm ? (
            <Form onSubmit={(e) => e.preventDefault()}>
              <hr
                style={{
                  height: "8px",
                  backgroundColor: "white",
                  width: "100%",
                }}
              ></hr>
              <hr
                style={{
                  height: "8px",
                  backgroundColor: "blue",
                  width: `${percentage}%`,
                  marginTop: "-20px",
                }}
              ></hr>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Religion</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setReligion(e.target.value)}
                  value={Religion}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Community*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setCommunity(e.target.value)}
                  value={Community}
                >
                  <option>select</option>
                  {communityData.communities.map((data) => (
                    <option value={data.community}>{data.community}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Sub Community*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setSubCommunity(e.target.value)}
                  value={SubCommunity}
                >
                  <option>select</option>
                  {communityData.communities
                    .filter((e) => e.community == Community)[0]
                    ?.subCommunity.map((data) => (
                      <option value={data}>{data}</option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Mother Tongue*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setMotherTongue(e.target.value)}
                  value={MotherTongue}
                >
                  <option>select</option>
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
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Can Speak:</Form.Label>
                {/* <Form.Select
              type="text"
              onChange={(e) => setCanSpeak(e.target.value)}
              value={CanSpeak}
            >
              <option>select</option>
              {['Assamese', 'Bengali', 'English', 'Gujarati', 'Hindi', 'Kannada', 'Kashmiri', 'Konkani', 'Malayalam', 'Manipuri', 'Marathi', 'Nepali', 'Oriya', 'Punjabi', 'Sanskrit', 'Sindhi', 'Tamil', 'Telugu', 'Urdu', 'Bodo', 'Santhali', 'Maithili', 'Dogri'].map(e => <option value={e}>{e}</option>)}

            </Form.Select> */}
                <Multiselect
                  options={CanSpeak} // Options to display in the dropdown
                  selectedValues={items} // Preselected value to persist in dropdown
                  onSelect={handleSelect} // Function will trigger on select event
                  onRemove={handleRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
                {/* <Multiselect showArrow options={CanSpeak} isObject={false} /> */}
              </Form.Group>{" "}
              {/* <Button variant="primary" type="submit">
            Submit
          </Button> */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="primary"
                  style={{ width: "100px", margin: "5px" }}
                  onClick={() => {
                    setShowReligiousForm(false);
                    setShowBasicForm(true);
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    handleSubmitReligiousInfo();
                  }}
                  className="primary"
                  style={{ width: "100px", margin: "5px" }}
                >
                  Continue
                </button>
              </div>
            </Form>
          ) : null}

          {showFamilyForm ? (
            <Form onSubmit={(e) => e.preventDefault()}>
              <hr
                style={{
                  height: "8px",
                  backgroundColor: "white",
                  width: "100%",
                }}
              ></hr>
              <hr
                style={{
                  height: "8px",
                  backgroundColor: "blue",
                  width: `${percentage}%`,
                  marginTop: "-20px",
                }}
              ></hr>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Father's Name*</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setFatherName(e.target.value)}
                  value={FatherName}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Father's status*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setFatherStatus(e.target.value)}
                  value={FatherStatus}
                  required
                >
                  {" "}
                  <option>select</option>
                  {[
                    "Employed in Government",
                    "Employed in Private",
                    "Business",
                    "Retired",
                    "Not employed",
                    "Passed Away",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
                {FatherStatus &&
                FatherStatus !== "Not employed" &&
                FatherStatus !== "Passed Away" &&
                FatherStatus !== "Retired" ? (
                  <>
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setFatherOccupation(e.target.value)}
                      value={FatherOccupation}
                    />
                  </>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Mother's Name*</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMotherName(e.target.value)}
                  value={MotherName}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Mother's status*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setMotherStatus(e.target.value)}
                  value={MotherStatus}
                >
                  {" "}
                  <option>select</option>
                  {[
                    "Employed in Government",
                    "Employed in Private",
                    "Business",
                    "Retired",
                    "Not employed",
                    "Home Maker",
                    "Passed Away",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
                {MotherStatus &&
                MotherStatus !== "Not employed" &&
                MotherStatus !== "Passed Away" &&
                MotherStatus !== "Home Maker" &&
                MotherStatus !== "Retired" ? (
                  <>
                    <Form.Label>Occupation:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setMotherOccupation(e.target.value)}
                      value={MotherOccupation}
                    />
                  </>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>No of brothers:</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setNoofBrothers(e.target.value)}
                  value={NoofBrothers}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>No of sisters:</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setNoofSisters(e.target.value)}
                  value={NoofSisters}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Family type:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setFamilyType(e.target.value)}
                  value={FamilyType}
                >
                  <option>select</option>
                  <option value={"Join Family"}>Join Family</option>
                  <option value="Nuclear Family">Nuclear Family</option>
                  <option value="Others Family">Others Family</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Family value:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setFamilyValues(e.target.value)}
                  value={FamilyValues}
                >
                  <option>select</option>
                  {["Orthodox", "Traditional", "Moderate", "Liberal"].map(
                    (e) => (
                      <option value={e}>{e}</option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Family class:</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setFamilyClass(e.target.value)}
                  value={FamilyClass}
                >
                  <option>select</option>
                  {[
                    "lower middle class",
                    " middle class ",
                    "upper middle class",
                    "rich",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              {/* <Form.Group controlId="formFileDisabled" className="mb-3">
             <Form.Label>Family affluence</Form.Label>
             <Form.Control
                 type="text"
                 onChange={(e) => setFamilyAffluence(e.target.value)}
                 value={FamilyAffluence}
             />
         </Form.Group> */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="primary"
                  style={{ width: "100px", margin: "5px" }}
                  onClick={() => {
                    setShowReligiousForm(true);
                    setShowFamilyForm(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    handleSubmitFamilyInfo();
                  }}
                  style={{ width: "100px", margin: "5px" }}
                >
                  Continue
                </button>
              </div>
            </Form>
          ) : null}

          {showLocationForm ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <hr
                style={{
                  height: "8px",
                  backgroundColor: "white",
                  width: "100%",
                }}
              ></hr>
              <hr
                style={{
                  height: "8px",
                  backgroundColor: "blue",
                  width: `${percentage}%`,
                  marginTop: "-20px",
                }}
              ></hr>

              {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Current Residence</Form.Label>
            <Form.Control
              disabled
              type="text"
              onChange={(e) => setCurrentResidence(e.target.value)}
              value={CurrentResidence}
            >
            </Form.Control>
          </Form.Group> */}
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Country*</Form.Label>
                {allCountries.length ? <Form.Select
                  type="text"
                  onChange={(e) => {
                    setCountry(e.target.value.split(",")[0]);
                    setCountryCode(e.target.value.split(",")[1])
                  }}
                  defaultValue={country}
                >
                  <option>Select</option>
                  {allCountries?.map((data) => (
                    <option value={`${data.name},${data.iso2}`}>{data.name}</option>
                  ))}
                </Form.Select> : <Form.Select
                  type="text"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  defaultValue={country}
                >
                  <option>Select</option>
                  {countryList?.map((data) => (
                    <option value={data.name}>{data.name}</option>
                  ))}
                </Form.Select>}
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>State*</Form.Label>
                  {states.length ? <Form.Select
                    type="text"
                    onChange={(e) => {
                      setState(e.target.value.split(",")[0])
                      setStateCode(e.target.value.split(",")[1])
                    }}
                    defaultValue={newstate}
                    disabled={!country}
                  >
                    <option>Select</option>
                    {states.map((data) => (
                      <option value={`${data.name},${data.iso2}`}>{data.name}</option>
                    ))}
                  </Form.Select> : <Form.Control
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    defaultValue={newstate}
                  />}
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>District*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  defaultValue={city}
                  disabled={!states}
                >
                  <option>Select</option>
                  {cities?.length ? cities.map((data) => (
                      <option value={data.name}>{data.name}</option>
                    )): <Form.Control
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    defaultValue={city}
                  />}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                {" "}
                <Form.Label>Zip Code*</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setZip(e.target.value)}
                  value={zip}
                />
              </Form.Group>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="primary"
                  style={{ width: "100px", margin: "5px" }}
                  onClick={() => {
                    setShowFamilyForm(true);
                    setShowLocationForm(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    handleSubmitLocationInfo();
                  }}
                  style={{ width: "100px", margin: "5px" }}
                >
                  Continue
                </button>
              </div>
            </Form>
          ) : null}

          {showEducationInfoForm ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Highest qualification*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setHighestQualification(e.target.value)}
                  value={HighestQualification}
                >
                  <option>select</option>
                  {educationData?.HighestEducation?.map((data) => (
                    <option value={data.title}>{data.title}</option>
                  ))}
                </Form.Select>
                {HighestQualification ? (
                  <Form.Select type="text">
                    <option>select</option>
                    {educationData.HighestEducation.filter(
                      (data) => data.title == HighestQualification
                    )[0].course.map((e) => (
                      <option value={e}>{e}</option>
                    ))}
                  </Form.Select>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formFileDisabled" className="mb-3">
                <Form.Label>Annual income*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  value={AnnualIncome}
                >
                  <option>select</option>
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
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Working As*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setWorkingAs(e.target.value)}
                  value={WorkingAs}
                >
                  <option>Select</option>
                  {occupation.Occupation.map((data) => (
                    <option value={data}>{data}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="primary"
                  style={{ width: "100px", margin: "5px" }}
                  onClick={() => {
                    setShowEducationInfoForm(false);
                    setShowLocationForm(true);
                  }}
                >
                  Back
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    handleSubmitEductaionInfo();
                  }}
                  style={{ width: "100px", margin: "5px" }}
                >
                  Continue
                </button>
              </div>
            </Form>
          ) : null}
          {showOthersInfoForm ? (
            <Form onSubmit={(e) => e.preventDefault()}>
              <hr
                style={{
                  height: "8px",
                  backgroundColor: "white",
                  width: "100%",
                }}
              ></hr>
              <hr
                style={{
                  height: "8px",
                  backgroundColor: "blue",
                  width: `${percentage}%`,
                  marginTop: "-20px",
                }}
              ></hr>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile created by*</Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setProfilecreatedby(e.target.value)}
                  value={Profilecreatedby}
                >
                  <option>select</option>
                  {[
                    "Father",
                    "Mother",
                    "Gaurdian",
                    "My Self",
                    "Sibling",
                    "Friend",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Point Of Contact*</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              {/* <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Phone Number of Point Of Contact:</Form.Label>
                <Form.Control type="number" />
              </Form.Group> */}

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="primary"
                  style={{ width: "100px", margin: "5px" }}
                  onClick={() => {
                    setShowOthersInfoForm(false)
                    setShowEducationInfoForm(true)
                  }}
                >
                  Back
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    handleSubmitOthersInfo();
                  }}
                  style={{ width: "100px", margin: "5px" }}
                >
                  Continue
                </button>
              </div>
            </Form>
          ) : null}
        </div>
      ) : (
        <div
          className="login-card"
          style={{ minWidth: "60%", minHeight: "105vh" }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleOtpVerification();
            }}
          >
            <Form.Group>
              <label>Enter the OTP sent to your mobile number</label>
              <Form.Control
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      )}
    </div>
  );
}
