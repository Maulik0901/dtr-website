import React from "react";
import "./header.css";
import logo from "../../Assets/images/logo.png";
import { BiLogIn, BiLogOut, BiSupport } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { RiCustomerServiceFill } from "react-icons/ri";
import  {MdOutlineMail} from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiProfileLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Sidebar from "./Sidebar";
export default function Header(props) {
  const history = useNavigate();
  const navigate = useNavigate();
  const userData = props.user;
  const [user, setUser] = useState(null);
  const [dropDownBox, showDropDownBox] = useState(false);
  const userId = userData && userData.tokenUser.userId;
  const [data, setUserData] = useState([]);
  
  const isverified = localStorage.getItem("dtruserverified");
  const [userStatus,setUserStatus] = useState(0);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL+`user/get_single_user_id/${userId}`
      )
      .then((res) => {
        console.log(res.data.status)
        setUserData(res.data);
        setUserStatus(res.data.status)
      });
  }, [userId]);
  useEffect(() => {
    if (userData) {
      setUser([userData.tokenUser]);
    }
  }, [userData]);
  const clearNotifications = () => {
    navigate("/request");
    axios
      .delete(
        process.env.REACT_APP_API_URL+`user/clear_notifications/${userId}`
      )
      .then((res) => {
        console.log(res.data);
      });
  };
  function logOut(){
    console.log("aasdflkndsjf========================")
    localStorage.removeItem("dtrmatrimonyjwt");
    localStorage.removeItem("dtrusergender");
    history("/login")
  }
  return (
    <div>
      <div className="navbar-new">
        <div className='secondary-menu'>
             <div>
               <p>Welcome to dtrmatrimony.com</p>
             </div>
             <div>
                <p><BsWhatsapp></BsWhatsapp>WhatsApp: 9087757040</p>
              </div>
              <div>
                <p><RiCustomerServiceFill></RiCustomerServiceFill>Customer Support: 9087757041, 9087757042</p>
              </div>
              <div>
                <p><MdOutlineMail></MdOutlineMail>dtrmatrimony@gmail.com</p>
              </div>
          </div>

      {
        userStatus == 2 || userStatus == 3
        ? 
          <Navbar  expand="lg" style={{ width: "100%" }}>
            <Container>
              <Navbar.Brand>
                <div className="header__left">
                  <a
                    href=" "
                    onClick={(e) => {
                      navigate("/");
                      e.preventDefault();
                    }}
                    className="logo-a"
                  >
                    <img
                      src={logo}
                      className="logo"
                      alt=""
                    />
                  </a>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: "auto" }}>
                <Nav className="mt-2 mt-md-0" style={{ marginLeft: "auto" }}>
                 
                  {window.location.pathname !== "/complete-profile" ? (
                    <div className="header__right">
                      {user?.length > 0 && user[0] ? (
                        <div className="header__button-container">
                          <div
                            onClick={() => clearNotifications()}
                            style={{
                              padding: "5px",
                              cursor: "pointer",
                            }}
                          >
                            <IoMdNotifications size={35} color="black" />
                            <p
                              className="m-0"
                              style={{
                                position: "absolute",
                                top: "5px",
                                left: "20px",
                                backgroundColor: "red",
                                // color: "tomato",
                                borderRadius: "50%",
                                padding: "0px 5px",
                                fontSize: "12px",
                              }}
                            >
                              {data?.notifications?.length > 0 &&
                                data.notifications.length}
                            </p>
                          </div>
                          <a
                            href=" "
                            className="user"
                            onClick={(e) => e.preventDefault()}
                            onMouseOver={(e) => {
                              e.preventDefault();
                              showDropDownBox(true);
                            }}
                          >
                            {user[0].name}
                          </a>{" "}
                          {dropDownBox ? (
                            <RiArrowDropUpLine
                              style={{ cursor: "pointer" }}
                              size={30}
                              onClick={() => {
                                showDropDownBox(false);
                              }}
                            />
                          ) : (
                            <RiArrowDropDownLine
                              onClick={() => {
                                showDropDownBox(true);
                              }}
                              style={{ cursor: "pointer" }}
                              size={30}
                              onMouseEnter={() => {
                                showDropDownBox(true);
                              }}
                            />
                          )}
                          {dropDownBox ? (
                            <div
                              className="drowDownDiv"
                              onMouseLeave={() => {
                                showDropDownBox(false);
                              }}
                            >
                              
                              <button
                                className="primary drowDownDiv-b "
                                onClick={(e) => {
                                  if(userStatus == 1){
                                    navigate("/complete-profile");
                                  } else {
                                    navigate("/Dashboard");
                                  }
                                  
                                }}
                              >
                                {" "}
                                <RiProfileLine size={20} />
                                Dashboard
                              </button>
                              <button
                                className="primary drowDownDiv-b "
                                onClick={(e) => {
                                  navigate("/setting");
                                }}
                              >
                                {" "}
                                <RiUserSettingsLine size={20} />
                                Settings
                              </button>
                              <button
                                className="primary drowDownDiv-b "
                                onClick={() => {
                                  // props.logOut();
                                  logOut();
                                }}
                              >
                                {" "}
                                <BiLogOut size={20} />
                                Log Out
                              </button>
                              
                              
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="header__button-container">
                          {window.location.pathname !== "/complete-profile" ? (
                            <a href="/login">
                              Login <BiLogIn />
                            </a>
                          ) : null}
                        </div>
                      )}

                      <a href=" ">
                        {" "}
                        help <BiSupport />
                      </a>
                    </div>
                  ) : null}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        : 
          <Navbar  expand="lg" style={{ width: "100%" }}>
            <Container>
              <Navbar.Brand>
                <div className="header__left">
                  <a
                    href=" "
                    onClick={(e) => {
                      navigate("/");
                      e.preventDefault();
                    }}
                    className="logo-a"
                  >
                    <img
                      src={logo}
                      className="logo"
                      alt=""
                    />
                  </a>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: "auto" }}>
                <Nav className="mt-2 mt-md-0" style={{ marginLeft: "auto" }}>
                  {window.location.pathname !== "/" &&
                  window.location.pathname !== "/complete-profile" &&
                  window.location.pathname !== "/signup" &&
                  window.location.pathname !== "/login" ? (
                    <div
                      className="header__middle"
                      style={{
                        gap: "0.8rem",
                      }}
                    >
                      <Link to="Dashboard">My DTR</Link>
                      <div class="matches">
                        <button class="matchdropbtn">Match</button>
                        <div class="dropdown-content">
                          <Link to="TodaysMatches">Today's Matches</Link>
                          <Link to="MyMatches">My matches</Link>
                          <Link to="MoreMatches">More Matches</Link>
                          <Link to="Recentlyviewed">Recently Viewed</Link>
                        </div>
                      </div>
                      <div class="matches">
                        <button class="matchdropbtn">Search</button>
                        <div class="dropdown-content">
                          <Link to="/Search">Basic search</Link>
                          <Link to="/Search">Advanced search</Link>
                        </div>
                      </div>
                      <div class="matches">
                        <button class="matchdropbtn" onClick={() => navigate('/matched')} >More</button>
                        <div class="dropdown-content">
                          <Link to="/matched">Matched</Link>
                          <Link to="/request">Requested</Link>
                          <Link to="/sent">Sent</Link>
                          <Link to="/deleted">Deleted</Link>
                          <Link to="/shortlisted_by_you">Shortlisted by you</Link>
                          <Link to="/who_shortlisted_you">Who shortlisted you</Link>
                          <Link to="/contact_viewed ">Contact Viewed</Link>
                          <Link to="horoscope_downloader">Horoscope Downloader</Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {window.location.pathname !== "/complete-profile" ? (
                    <div className="header__right">
                      {user?.length > 0 && user[0] ? (
                        <div className="header__button-container">
                          <div
                            onClick={() => clearNotifications()}
                            style={{
                              padding: "5px",
                              cursor: "pointer",
                            }}
                          >
                            <IoMdNotifications size={35} color="black" />
                            <p
                              className="m-0"
                              style={{
                                position: "absolute",
                                top: "5px",
                                left: "20px",
                                backgroundColor: "red",
                                // color: "tomato",
                                borderRadius: "50%",
                                padding: "0px 5px",
                                fontSize: "12px",
                              }}
                            >
                              {data?.notifications?.length > 0 &&
                                data.notifications.length}
                            </p>
                          </div>
                          <a
                            href=" "
                            className="user"
                            onClick={(e) => e.preventDefault()}
                            onMouseOver={(e) => {
                              e.preventDefault();
                              showDropDownBox(true);
                            }}
                          >
                            {user[0].name}
                          </a>{" "}
                          {dropDownBox ? (
                            <RiArrowDropUpLine
                              style={{ cursor: "pointer" }}
                              size={30}
                              onClick={() => {
                                showDropDownBox(false);
                              }}
                            />
                          ) : (
                            <RiArrowDropDownLine
                              onClick={() => {
                                showDropDownBox(true);
                              }}
                              style={{ cursor: "pointer" }}
                              size={30}
                              onMouseEnter={() => {
                                showDropDownBox(true);
                              }}
                            />
                          )}
                          {dropDownBox ? (
                            <div
                              className="drowDownDiv"
                              onMouseLeave={() => {
                                showDropDownBox(false);
                              }}
                            >
                              <button
                                className="primary drowDownDiv-b "
                                onClick={() => {
                                  // props.logOut();
                                  logOut();
                                }}
                              >
                                {" "}
                                <BiLogOut size={20} />
                                Log Out
                              </button>
                              <button
                                className="primary drowDownDiv-b "
                                onClick={(e) => {
                                  navigate("/setting");
                                }}
                              >
                                {" "}
                                <RiUserSettingsLine size={20} />
                                Settings
                              </button>
                              <button
                                className="primary drowDownDiv-b "
                                onClick={(e) => {
                                  // navigate("/Dashboard");
                                  if(userStatus == 1){
                                    navigate("/complete-profile");
                                  } else {
                                    navigate("/Dashboard");
                                  }
                                }}
                              >
                                {" "}
                                <RiProfileLine size={20} />
                                Dashboard
                              </button>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="header__button-container">
                          {window.location.pathname !== "/complete-profile" ? (
                            <a href="/login">
                              Login <BiLogIn />
                            </a>
                          ) : null}
                        </div>
                      )}

                      <a href=" ">
                        {" "}
                        help <BiSupport />
                      </a>
                    </div>
                  ) : null}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
       
      }
      
      </div>
      <Sidebar user={user} logOut={logOut} data={data}/>
    </div>
  );
}
