import "./Sidebar.css";
import { BiLogIn, BiLogOut, BiSupport } from "react-icons/bi";
import menuIcon from "../../Assets/icons/menu-svgrepo-com.svg";
import leftArrow from "../../Assets/icons/left-arrow-svgrepo-com.svg";
import rightArrow from "../../Assets/icons/right-arrow-svgrepo-com.svg";
import downArrow from "../../Assets/icons/down-arrow-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/logo.png";
import { useState } from "react";
const Sidebar = ({ user, data, logOut }) => {
  const navigate = useNavigate();
  const [matchOptions, setMatchOptions] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [searchOptions, setSearchOptions] = useState(false);
  const [dashboardOptions, setDashboardOptions] = useState(false);
  const [sideShow, setSideShow] = useState(false);

  return (
    <div>
      <div
        className="bg-white w-100"
      >
        <div className="sideShowbtn">
          <img
            onClick={() => setSideShow(!sideShow)}
            src={menuIcon}
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
            alt=""
          />
          <a
            href=" "
            onClick={(e) => {
              navigate("/");
              e.preventDefault();
            }}
            className="logo-a"
          >
            <img src={logo} className="logo" alt="" />
          </a>
        </div>
      </div>
      {sideShow && (
        <div
          className="bg-light"
          style={{
            width: "200px",
            textAlign: "start",
            position: "fixed",
            top: 0,
            height: "100vh",
            zIndex: "1000",
            animation: `${
              sideShow ? "fadeIn 0.4s ease-in-out" : "fadeOut 0.4s ease-out"
            }`,
          }}
        >
          <div
            style={{
              margin: "0px 10px 0px 10px",
              height: "100%",
              overflow: "scroll",
            }}
          >
            {user ? (
              <>
                <div
                  className="mt-2"
                  style={{ borderBottom: "1px solid grey" }}
                >
                  <p style={{ fontSize: "14px", fontWeight: "700" }}>
                    {" "}
                    <img
                      onClick={() => setSideShow(!sideShow)}
                      src={leftArrow}
                      style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      alt=""
                    />
                    {user[0]?.name}
                  </p>
                </div>
                <div
                  className="sideBbtn"
                  onClick={() => setDashboardOptions(!dashboardOptions)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={dashboardOptions ? downArrow : rightArrow}
                      alt=""
                    />
                  </p>
                  <p
                    className="styles__Link-dWIqvV bsvHMq"
                    style={{ fontSize: "16px" }}
                  >
                    My DTR
                  </p>
                </div>
                {dashboardOptions && (
                  <div
                    style={{
                      animation: "fadeInDown 0.4s ease-in-out",
                    }}
                  >
                    <Link to="Dashboard">
                      <p
                        className={
                          window.location.pathname === "/Dashboard"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Dashboard
                      </p>
                    </Link>
                    <Link to="myProfile">
                      <p
                        className={
                          window.location.pathname === "/myProfile"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        My Profile
                      </p>
                    </Link>
                    <Link to="myPhotos">
                      <p
                        className={
                          window.location.pathname === "/myPhotos"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        My Photos
                      </p>
                    </Link>
                    <Link to="partnerPreference">
                      <p
                        className={
                          window.location.pathname === "/partnerPreference"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Partner Preferences
                      </p>
                    </Link>
                    <Link to="setting">
                      <p
                        className={
                          window.location.pathname === "/setting"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Settings
                      </p>
                    </Link>
                  </div>
                )}
                <div
                  className="sideBbtn"
                  onClick={() => setMatchOptions(!matchOptions)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={matchOptions ? downArrow : rightArrow}
                      alt=""
                    />
                  </p>
                  <p
                    className="styles__Link-dWIqvV bsvHMq"
                    style={{ fontSize: "16px" }}
                  >
                    Match
                  </p>
                </div>
                {matchOptions && (
                  <div
                    style={{
                      animation: "fadeInDown 0.4s ease-in-out",
                    }}
                  >
                    <Link to="TodaysMatches">
                      <p
                        className={
                          window.location.pathname === "/TodaysMatches"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Today's Matches
                      </p>
                    </Link>
                    <Link to="MyMatches">
                      <p
                        className={
                          window.location.pathname === "/MyMatches"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        My matches
                      </p>
                    </Link>
                    <Link to="MoreMatches">
                      <p
                        className={
                          window.location.pathname === "/MoreMatches"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        More Matches
                      </p>
                    </Link>
                    <Link to="Recentlyviewed">
                      <p
                        className={
                          window.location.pathname === "/Recentlyviewed"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Recently Viewed
                      </p>
                    </Link>
                  </div>
                )}
                <br />
                <div
                  className="sideBbtn"
                  onClick={() => setSearchOptions(!searchOptions)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={searchOptions ? downArrow : rightArrow}
                      alt=""
                    />
                  </p>
                  <p
                    className="styles__Link-dWIqvV bsvHMq"
                    style={{ fontSize: "16px" }}
                  >
                    Search
                  </p>
                </div>
                {searchOptions && (
                  <div style={{ animation: "fadeInDown 0.4s ease-in-out" }}>
                    <Link to="/Search">
                      <p
                        className={
                          window.location.pathname === "/Search"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Basic search
                      </p>
                    </Link>
                    <Link to="/Search">
                      <p>Advanced search</p>
                    </Link>
                  </div>
                )}
                <br />
                <div
                  className="sideBbtn"
                  onClick={() => setMoreOptions(!moreOptions)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p>
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={moreOptions ? downArrow : rightArrow}
                      alt=""
                    />
                  </p>
                  <p
                    className="styles__Link-dWIqvV bsvHMq"
                    style={{ fontSize: "16px" }}
                  >
                    More
                  </p>
                </div>
                {moreOptions && (
                  <div style={{ animation: "fadeInDown 0.4s ease-in-out" }}>
                    <Link to="/matched">
                      <p
                        className={
                          window.location.pathname === "/matched"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Matched
                      </p>
                    </Link>
                    <Link to="/request">
                      <p
                        className={
                          window.location.pathname === "/request"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Requested
                      </p>
                    </Link>
                    <Link to="/sent">
                      <p
                        className={
                          window.location.pathname === "/sent"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Sent
                      </p>
                    </Link>
                    <Link to="/deleted">
                      <p
                        className={
                          window.location.pathname === "/deleted"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Deleted
                      </p>
                    </Link>
                    <Link to="/shortlisted_by_you">
                      <p
                        className={
                          window.location.pathname === "/shortlisted_by_you"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Shortlisted by you
                      </p>
                    </Link>
                    <Link to="/who_shortlisted_you">
                      <p
                        className={
                          window.location.pathname === "/who_shortlisted_you"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Who shortlisted you
                      </p>
                    </Link>
                    <Link to="/contact_viewed ">
                      <p
                        className={
                          window.location.pathname === "/contact_viewed"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Contact Viewed
                      </p>
                    </Link>
                    <Link to="horoscope_downloader">
                      <p
                        className={
                          window.location.pathname === "/horoscope_downloader"
                            ? "styles__Link-dWIqvV euJzSi rounded"
                            : "styles__Link-dWIqvV bsvHMq"
                        }
                      >
                        Horoscope Downloader
                      </p>
                    </Link>
                  </div>
                )}
                <button
                  className="primary w-100"
                  style={{ marginBottom: "30px", marginLeft: "-5px" }}
                  onClick={() => {
                    logOut();
                  }}
                >
                  {" "}
                  <BiLogOut size={20} />
                  Log Out
                </button>
              </>
            ) : (
              <div>
                <div
                  className="mt-2"
                  style={{ borderBottom: "1px solid grey" }}
                >
                  <p style={{ fontSize: "14px", fontWeight: "700" }}>
                    {" "}
                    <img
                      onClick={() => setSideShow(!sideShow)}
                      src={leftArrow}
                      style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      alt=""
                    />
                    Welcome to DTR
                  </p>
                </div>
                <Link to="/login">
                  <p
                    className={
                      window.location.pathname === "/login"
                        ? "styles__Link-dWIqvV euJzSi rounded mt-5"
                        : " styles__Link-dWIqvV euJzSi rounded mt-5"
                    }
                    style={{textAlign: 'center'}}
                    onClick={() => setSideShow(!sideShow)}
                  >
                    Login
                  </p>
                </Link>
                  <p
                    className={
                      window.location.pathname === "/help"
                        ? "styles__Link-dWIqvV euJzSi rounded mt-5"
                        : "styles__Link-dWIqvV bsvHMq mt-5"
                    }
                  >
                    Help
                  </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
