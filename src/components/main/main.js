import React from "react";
import "./main.css";
// import couple from "../../Assets/images/couple.png";
import MatchFinder from "../matchFinder/matchFinder";
import SuccessStory from "../successStory/successStory";
import Banner from "../../Assets/images/dtr-matrimony-web-banner.jpg";
import MobileBanner from "../../Assets/images/color-coordinated-couple.jpg";

export default function Main({user}) {
  return (
    <div className="main" style={{
      backgroundImage: `url(${Banner})`
    }}>
     
      <div className='banner'>
        <img src={Banner} className="banner-img" alt="banner" />
        <img src={MobileBanner} className='mobile-bg' alt="banner" />
        <div className='banner-content'>
          <h1 className="home-head">The Best Tamil Nadu Hindu Matrimony</h1>
          <p>For All Community</p>
        </div>
      </div>
      <MatchFinder />
      <SuccessStory user={user} />
    </div>
  );
}
