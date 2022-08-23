import React, { Component }  from 'react';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Accepted from "./Options/Accepted";
import ContactViewed from "./Options/ContactViewed";
import Deleted from "./Options/Deleted";
import Requested from "./Options/Requested";
import Sent from "./Options/Sent";
import Shortlisted from "./Options/ShortListed";
import ShortlistedYou from "./Options/ShortlistedYou";
import { Nav } from "react-bootstrap";
import HoroscopeDownloader from "./Options/HoroscopeDownloader";
const Invitations = (props) => {
  const [tabs, setTabs] = useState(0);
  useEffect(() => {
    setTabs(props.tab);
  }, [props.tab]);
  const userData = props.user;
  const userId = userData && userData.tokenUser.userId;
  const [data, setUserData] = useState([]);
  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        setUserData(res);
      });
  }, [userId]);
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          borderTop: "1px solid #e5e2e2",
          borderBottom: "1px solid #e5e2e2",
        }}
      >
        <div>
          <Nav className="justify-content-center mt-2 sticky dashboard-nav" activeKey="/home">
            <p
              className={
                tabs === 0
                  ? "styles__Link-dWIqvV euJzSi rounded"
                  : "styles__Link-dWIqvV bsvHMq"
              }
              onClick={() => {
                setTabs(0);
                navigate("/matched");
              }}
            >
              Matched ({data.matchedPeople && data.matchedPeople.length})
              {/* showing number of Accepted Reqs */}
            </p>
            <p
              className={
                tabs === 1
                  ? "styles__Link-dWIqvV euJzSi rounded"
                  : "styles__Link-dWIqvV bsvHMq"
              }
              onClick={() => {
                setTabs(1);
                navigate("/request");
              }}
            >
              Requested ({data.requestedReqs && data.requestedReqs.length})
            </p>
            <p
              className={
                tabs === 2
                  ? "styles__Link-dWIqvV euJzSi rounded"
                  : "styles__Link-dWIqvV bsvHMq"
              }
              onClick={() => {
                setTabs(2);
                navigate("/sent");
              }}
            >
              Sent ({data.sentReqs && data.sentReqs.length})
            </p>
            <p
              className={
                tabs === 3
                  ? "styles__Link-dWIqvV euJzSi rounded"
                  : "styles__Link-dWIqvV bsvHMq"
              }
              onClick={() => {
                setTabs(3);
                navigate("/deleted");
              }}
            >
              Deleted ({data.deletedReqs && data.deletedReqs.length})
            </p>
            <p
              className={
                tabs === 4
                  ? "styles__Link-dWIqvV euJzSi rounded"
                  : "styles__Link-dWIqvV bsvHMq"
              }
              onClick={() => {
                setTabs(4);
                navigate("/shortlisted_by_you");
              }}
            >
              Shortlisted by you (
              {data.shortListByMe && data.shortListByMe.length})
            </p>
            <p
              className={
                tabs === 5
                  ? "styles__Link-dWIqvV euJzSi rounded"
                  : "styles__Link-dWIqvV bsvHMq"
              }
              onClick={() => {
                setTabs(5);
                navigate("/who_shortlisted_you");
              }}
            >
              Who shortlisted you ({data.shortList && data.shortList.length})
            </p>
            <p
              className={
                tabs === 6
                  ? "styles__Link-dWIqvV euJzSi rounded"
                  : "styles__Link-dWIqvV bsvHMq"
              }
              onClick={() => {
                setTabs(6);
                navigate("/contact_viewed");
              }}
            >
              Contact Viewed ({data.contactViewed && data.contactViewed.length})
            </p>
            <p
              className={
                tabs === 7
                  ? "styles__Link-dWIqvV euJzSi rounded"
                  : "styles__Link-dWIqvV bsvHMq"
              }
              onClick={() => {
                setTabs(7);
                navigate("/horoscope_downloader");
              }}
            >
              Who downloaded your Horoscope (
              {data.horoscopeDownloader && data.horoscopeDownloader.length})
            </p>
          </Nav>
        </div>
      </div>
      <Container className="mt-1">
        {tabs === 0 ? <Accepted user={userData} /> : " "}
        {tabs === 1 ? <Requested user={userData} /> : " "}
        {tabs === 2 ? <Sent user={userData} /> : " "}
        {tabs === 3 ? <Deleted user={userData} /> : " "}
        {tabs === 4 ? <Shortlisted user={userData} /> : " "}
        {tabs === 5 ? <ShortlistedYou user={userData} /> : " "}
        {tabs === 6 ? <ContactViewed user={userData} /> : " "}
        {tabs === 7 ? <HoroscopeDownloader user={userData} /> : " "}
      </Container>
    </div>
  );
};

export default Invitations;
