import React, { useState } from "react";
import './matchFinder.css'
import { BsFillPersonCheckFill } from "react-icons/bs";
import banner2 from "../../Assets/images/dtr-banner.jpg"
export default function MatchFinder(props) {
  return (
    <div className="container-fluid" style={{marginTop:'20px', backgroundColor:'burlywood' , padding:'0'}}>
      <div className="row" style={{margin:'0'}}>
      <div className="col-lg-6" style={{padding:'0'}}>
       <img src={banner2} alt="banner" className="banner2" />
      </div>
      <div className="col-lg-6 register">
        <div className="register-card">
        <div><BsFillPersonCheckFill></BsFillPersonCheckFill></div>
        <h3>Free Registration</h3>
        <p>Register your complete profile with Photo + Horoscope - It's 100% Free</p>
        <a href='/signup' className='register-btn'>Register Here</a>
      </div>
      </div>
      </div>
    </div>
  );
}
