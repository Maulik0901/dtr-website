import React, { Component }  from 'react';
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Routes,useNavigate } from "react-router-dom";
import Landing from "./screens/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import TermsOfUse from "./components/terms-of-use/Terms";
import PrivacyPolicy from "./components/privacyPolicy/Privacy";
import Dashboard from "./screens/Dashboard";
import EmailVerify from "./screens/emailVerify";
import Setting from "./screens/Setting";
import axios from "axios";
import Matches from "./components/myprofile/Matches";
import CompleteProfile from "./components/myprofile/completeProfile";
import Searches from "./screens/Searches";
import ViewProfiles from "./screens/ViewProfiles";
import ProfileLists from "./screens/ProfileLists";
import Invitations from "./components/Invitaions/Invitations";
import RecentlyViewed from "./components/myprofile/RecentlyViewed";
import Chat from "./components/Chat/Chat";
import Admin from "./admin";
import AdminLanding from "./screens/Admin/AdminLanding";

function App() {
  // const history = useNavigate();
  const [user, setUser] = useState(null);
  const [userStauts,setUserStatus] = useState(0);

  // const isverified=localStorage.getItem('dtruserverified')
  const saveUser = (e) => {
    setUser(jwt_decode(e));
    // var tokenUser = jwt_decode(e);
    // console.log("tokenUser.tokenUser.userId", tokenUser.tokenUser.userId)
    // if(tokenUser.tokenUser.userId) {
    //    axios
    //   .get(
    //     process.env.REACT_APP_API_URL+`user/get_single_user_id/${tokenUser.tokenUser.userId}`
    //   )
    //   .then((res) => {
    //     console.log("app.js",res.data)
    //     if(res.data && res.data.status){
    //       setUserStatus(res.data.status)
    //     }
    //   });
    // }
  };
  useEffect(() => {
    
    let data = localStorage.getItem("dtrmatrimonyjwt");
    if (data) {
      saveUser(data);
      
     
    }
  }, []);

  const handleUserToken = (e) => {
    setUser(jwt_decode(e));
  };

  const logOut = () => {
    // localStorage.removeItem("dtrmatrimonyjwt");
    // localStorage.removeItem("dtrusergender");
    // history("/login")
    // window.location.href = "/";
  };
  const [admin, setAdmin] = useState(null);
  // const isverified=localStorage.getItem('dtruserverified')
  const saveadmin = (e) => {
    setAdmin(jwt_decode(e));
  };
  useEffect(() => {
    let data = localStorage.getItem("dtrmatrimonyjwtadmin");
    if (data) {
      saveadmin(data);
      
    }
  }, []);

  const handleAdminToken = (e) => {
    setAdmin(jwt_decode(e));
  };

  const logOutAdmin = () => {
    localStorage.removeItem("dtrmatrimonyjwtadmin");
    window.location.href = "/admin-dtr-rgvv734t5874rwrwsvdt52378432vhsssf872trsdfgvdvg27tr3-secured-user";
  };

  return (
    <Router>
       <Header
          user={user}
          logOut={() => {
            logOut();
          }}
        />
      
      
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/login"
          element={
            user && user.tokenUser ? (
              (// isverified=="true" ?
              <Dashboard user={user} /> /*: <CompleteProfile user={user} />*/)
            ) : (
              // : <CompleteProfile user={user} />

              <Login
                loginData={(e) => {
                  handleUserToken(e);
                }}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user && user.tokenUser ? (
              <CompleteProfile user={user} />
            ) : (
              <Signup
                signupData={(e) => {
                  handleUserToken(e);
                }}
              />
            )
          }
        />
        <Route path="/complete-profile" element={<CompleteProfile user={user} />} />
        {/* <Route
          path="/admin-dtr-rgvv734t5874rwrwsvdt52378432vhsssf872trsdfgvdvg27tr3-secured"
          element={<Admin />}
        /> */}
        {/* <Route path='/profile' element={<PublicProfile />} /> */}
        <Route path="/profile" element={<ViewProfiles />} />
        <Route
          path="/TodaysMatches"
          element={<Matches user={user} filter="TodaysMatches" />}
        />
        {/* <Route
          path="/NearMe"
          element={<Matches user={user} filter="NearMe" />}
        /> */}
        <Route
          path="/Recentlyviewed"
          element={<RecentlyViewed user={user} />}
        />
        <Route
          path="/MoreMatches"
          element={<Matches user={user} filter="MoreMatches" />}
        />
        <Route
          path="/MyMatches"
          element={<Matches user={user} filter="MyMatches" />}
        />
        <Route path="/Search" element={<Searches />} />
        {/* <Route
          path="/ViewProfile"
          element={<ProfileLists userId={user?.tokenUser.userId} />}
        /> */}
        <Route path="/matched" element={<Invitations user={user} tab={0} />} />
        <Route path="/request" element={<Invitations user={user} tab={1} />} />
        <Route path="/sent" element={<Invitations user={user} tab={2} />} />
        <Route path="/deleted" element={<Invitations user={user} tab={3} />} />
        <Route
          path="/shortlisted_by_you"
          element={<Invitations user={user} tab={4} />}
        />
        <Route
          path="/who_shortlisted_you"
          element={<Invitations user={user} tab={5} />}
        />
        <Route
          path="/contact_viewed"
          element={<Invitations user={user} tab={6} />}
        />
        <Route
          path="/horoscope_downloader"
          element={<Invitations user={user} tab={7} />}
        />
        <Route
          path="/Dashboard"
          element={
            user && user.tokenUser ? (
              <Dashboard user={user} tab={0} />
            ) : (
              <Landing user={user} />
            )
          }
        />
        <Route
          path="/myProfile"
          element={
            user && user.tokenUser ? (
              <Dashboard user={user} tab={1} />
            ) : (
              <Landing user={user} />
            )
          }
        />
        <Route
          path="/myPhotos"
          element={
            user && user.tokenUser ? (
              <Dashboard user={user} tab={2} />
            ) : (
              <Landing user={user} />
            )
          }
        />
        <Route
          path="/partnerPreference"
          element={
            user && user.tokenUser ? (
              <Dashboard user={user} tab={3} />
            ) : (
              <Landing user={user} />
            )
          }
        />
        <Route
          path="/setting"
          element={
            user && user.tokenUser ? (
              <Dashboard user={user} tab={4} />
            ) : (
              <Landing user={user} />
            )
          }
        />
        <Route path="/Chat" element={<Chat user={user} />} />
        <Route path="terms-of-use" element={<TermsOfUse />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/dashboard2" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/verify" element={<EmailVerify />} />
        
        {/* <Route
          exact
          path="/admin-dtr-rgvv734t5874rwrwsvdt52378432vhsssf872trsdfgvdvg27tr3-secured-user"
          element={
            <AdminLanding
              loginData={(e) => {
                handleAdminToken(e);
              }}
              logOutAdmin={logOutAdmin}
              admin={admin}
            />
          }
        /> */}
      </Routes>
      <Routes></Routes>
      <Footer />
    </Router>
  );
}

export default App;