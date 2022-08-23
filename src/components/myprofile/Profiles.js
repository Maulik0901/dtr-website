import React, { useEffect, useState } from "react";
import "./profile.css";
import ManageProfile from "./ManageProfile";
import About from "./About";
import PartnerPreferences from "./PartnerPreferences";
import Contact from "./Contact";
import axios from "axios";

function Profile({ props, profilePicId, profilePicture }) {
  const [userData, setUserData] = useState();
  const getUserInfo = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL+`user/getuser/${props?.user?.tokenUser?.userId}`
      )
      .then((data) => {
        setUserData(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="profile">
      <div className="name">
        <h3>{userData?.name}</h3>
      </div>
      <ManageProfile
        userData={userData}
        profilePicture={profilePicture}
        profilePicId={profilePicId}
        getUserInfo={getUserInfo}
      />
      <About userData={userData} getUserInfo={getUserInfo} />
      {/* <PartnerPreferences userData={userData}  getUserInfo={getUserInfo}/> */}
      {/* <Contact userData={userData}  getUserInfo={getUserInfo}/> */}
    </div>
  );
}

export default Profile;
