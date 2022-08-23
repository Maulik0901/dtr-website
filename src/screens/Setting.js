import React, { useState } from "react";
import "./setting.css";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Setting({ user, refresh, setRefresh }) {
  const [tabs, setTabs] = useState(0);
  const [passwordList, setPasswordList] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handlechange = (e) => {
    setPasswordList({ ...passwordList, [e.target?.name]: e.target?.value });
  };
  const [email, setEmail] = useState("");
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  console.log(user);
  const handleEditPassword = (e) => {
    e.preventDefault();
    // setDataLoading(true);
    if (passwordList.newPassword === passwordList.confirmNewPassword) {
      setErrMsg("");
      axios
        .post(
          process.env.REACT_APP_API_URL+`user/editPassword/${
            user && user[0]?._id
          }`,
          passwordList,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then((data) => {
          setDataLoading(false);
          if (data.data.modifiedCount > 0) {
            setErrMsg("Password changed successfully");
          } else setErrMsg(data?.data?.message);
          if (data.data.status === "401") {
            setErrMsg(data.data.message);
          }
        })
        .catch((err) => {
          setDataLoading(false);
          console.log(err);
          setErrMsg("Something went wrong");
        });
    } else {
      setDataLoading(false);
      setErrMsg("New password is not matching");
    }
  };
  const handleEditEmail = (e) => {
    e.preventDefault();
    if (email) {
      setErrMsg("");
      setDataLoading(true);
      axios
        .post(
          process.env.REACT_APP_API_URL+`user/editEmail/${
            user && user[0]?._id
          }`,
          { email: email },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userInfo}`,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
          setDataLoading(false);
          setErrMsg(res.data.message);
        })
        .catch((err) => {
          setDataLoading(false);
          setErrMsg(err.data.message);
        });
    }
  };
  const [showHide, setShowHide] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleHide = () => {
    setDataLoading(true);
    axios
      .post(
        process.env.REACT_APP_API_URL+"user/change_account_status",
        {
          id: user[0]?._id,
          profileStatus: "Hidden",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo}`,
          },
        }
      )
      .then((data) => {
        setShowHide(false);
        setDataLoading(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log(err);
      });
  };
  const handleActive = () => {
    setDataLoading(true);
    axios
      .post(
        process.env.REACT_APP_API_URL+"user/change_account_status",
        {
          id: user[0]?._id,
          profileStatus: "Vissible",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo}`,
          },
        }
      )
      .then((data) => {
        setShowActive(false);
        setDataLoading(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        setDataLoading(false);
        console.log(err);
      });
  };
  const handleDelete = () => {
    setDataLoading(true);
    axios
      .post(
        process.env.REACT_APP_API_URL+"user/delete_account_by_user",
        {
          id: user[0]?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo}`,
          },
        }
      )
      .then((data) => {
        setShowHide(false);
        setDataLoading(false);
        localStorage.removeItem("dtrmatrimonyjwt");
        window.location.href = "/";
      })
      .catch((err) => {
        setDataLoading(false);
        console.log(err);
        alert("Something went wrong");
      });
  };
  const [showActive, setShowActive] = useState(false);
  return (
    <div id="container-inner" className="left_border_new">
      <div id="left-nav-bg">
        {dataLoading && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 999,
              width: "50px",
              height: "50px",
              background: "rgba(0,0,0,0.6)",
            }}
            class="spinner-border"
            role="status"
          ></div>
        )}
        <div className="settings_left_nav">
          <ul>
            <li className="first" style={{ fontWeight: "bold" }}>
              Settings
            </li>
            <li
              className="first"
              onClick={() => setTabs(0)}
              style={{ cursor: "pointer" }}
            >
              Account Settings
            </li>
            {/* <li className="first" onClick={() => setTabs(1)}>
              Contact Filters
            </li>
            <li className="first" onClick={() => setTabs(2)}>
              Email / SMS Alerts
            </li>
            <li className="first" onClick={() => setTabs(3)}>
              Privacy Options
            </li> */}
            <li
              className="first"
              onClick={() => setTabs(4)}
              style={{ cursor: "pointer" }}
            >
              Hide / Delete Profile
            </li>
          </ul>
        </div>
      </div>
      {/* change email */}
      <Modal show={show1} onHide={() => setShow1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditEmail}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Current Email</Form.Label>
              <Form.Control type="text" value={user[0]?.email} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Enter New Email</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <p>{errMsg}</p>
            <Button
              variant="primary"
              type="submit"
              disabled={!email && dataLoading}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* change password */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditPassword}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Enter Old Password</Form.Label>
              <Form.Control
                type="text"
                name="oldPassword"
                onChange={handlechange}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control
                type="text"
                name="newPassword"
                onChange={handlechange}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="text"
                name="confirmNewPassword"
                onChange={handlechange}
              />
            </Form.Group>
            <p>{errMsg}</p>
            <Button
              variant="primary"
              type="submit"
              disabled={dataLoading}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* hide profile */}
      <Modal show={showHide} onHide={() => setShowHide(false)}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Hide Profile</Modal.Title>
          </Modal.Header>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <small>
                If Confirmed, other user in DTR won't see your profile
              </small>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure?</h4>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowHide(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleHide()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
      {/* delete profile */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Delete Profile</Modal.Title>
          </Modal.Header>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <small>
                Erase all of your data from DTR, after deletion, you won't be
                able to recover any of your data
              </small>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure?</h4>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDelete(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleDelete()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
      {/* active profile */}
      <Modal show={showActive} onHide={() => setShowActive(false)}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Active Profile</Modal.Title>
          </Modal.Header>
          <Modal.Header>
            <Modal.Title>
              {" "}
              <small>
                Active your profile and make it visible to other DTR user
              </small>{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure?</h4>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowActive(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleActive()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
      <div id="content_area">
        {tabs === 0 && (
          <>
            <div>
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                className="heading2"
              >
                <tbody>
                  <tr>
                    <td valign="bottom">
                      <h2>Settings</h2>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div id="formarea">
                <div class="bg">
                  <div class="pp-title">
                    <span>
                      <a
                        href=" "
                        rel="5"
                        class="edit-tab blue"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow1(true);
                        }}
                      >
                        Edit
                      </a>{" "}
                    </span>
                    <div class="fl">Email</div>
                    <div id="tab-box-1-msg"></div>
                  </div>
                  <div class="form">
                    <div id="tab-box-5">
                      <div>
                        <div class="wrapper wrapper1">
                          <div class="whitebgView">{user[0]?.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="spacer_5"></div>

                  <div class="pp-title">
                    <span>
                      <a
                        href=" "
                        // class="edit-tab blue"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                        }}
                      >
                        Edit
                      </a>
                    </span>
                    <div class="fl">Password</div>
                    <div id="tab-box-2-msg"></div>
                  </div>
                  <div class="form">
                    <div id="tab-box-2">
                      <div
                        style={{
                          minWidth: "395px",
                          float: "left",
                        }}
                      >
                        <div class="wrapper wrapper1">
                          <div class="whitebgView">
                            <label class="label">Password</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tabs === 1 && (
          <div>
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              className="heading2"
            >
              <tbody>
                <tr>
                  <td valign="bottom">
                    <h2>Who can contact me?</h2>
                  </td>
                </tr>
              </tbody>
            </table>

            <form style={{ margin: "0px" }}>
              <input
                type="hidden"
                name="hid_gender"
                value="Male"
                id="hid_gender"
              />
              <div id="filter_wrapper">
                <div className="filter_page_subheader">
                  Only Members matching the below criteria will get to see your
                  contact details.
                </div>
                <div className="details">
                  <div id="age-main" className="row">
                    <div className="col_01">Age</div>
                    <div className="col_02">
                      <span id="age-data_view_span">21 - 31</span>
                      <span id="age-data_edit_span" style={{ display: "none" }}>
                        <select
                          name="agefrom"
                          id="agefrom"
                          className="select_options"
                        >
                          <option value="18" label="18">
                            18
                          </option>

                          <option value="71" label="71">
                            71
                          </option>
                        </select>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="age-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="age-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="j/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="age-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="age-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div id="community-main" className="row">
                    <div className="col_01">Religion</div>
                    <div className="col_02">
                      <span id="community-data_view_span">Christian</span>
                      <span
                        id="community-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="community[]"
                          id="community"
                          multiple="multiple"
                          style={{ display: "none" }}
                        >
                          <option value="" label="Open to all">
                            Open to all
                          </option>
                          <option value="Hindu" label="Hindu">
                            Hindu
                          </option>
                          <option value="Muslim" label="Muslim">
                            Muslim
                          </option>
                          <option
                            value="Christian"
                            label="Christian"
                            selected="selected"
                          >
                            Christian
                          </option>
                        </select>
                        <div className="ddSelWrap" id="ddSelWrap_community">
                          <div
                            className="ddOptHolderWrapper"
                            id="ddOptHolderWrapper_community"
                          >
                            <div
                              className="ddOptHolder"
                              id="ddOptHolder_community"
                            >
                              <div
                                className="ddSelOptHolder ddSelOptHolderOpen"
                                id="ddSelOptHolder_community"
                              >
                                <span
                                  className="ddSelectedOptSpan"
                                  rel="Christian"
                                >
                                  Christian
                                </span>
                                <input
                                  type="text"
                                  className="ddSelOptText"
                                  id="ddSelOptText_community"
                                  autocomplete="off"
                                  size="1"
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                            <div
                              className="ddOptionHolder"
                              id="ddOptionHolder_community"
                            ></div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="community-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="community-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="community-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="community-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div id="show_hide_caste">
                    <div id="caste-main" className="row">
                      <div className="col_01">Community</div>
                      <div className="col_02">
                        <span id="caste-data_view_span">Open to all</span>
                        <span
                          id="caste-data_edit_span"
                          style={{ display: "none" }}
                        >
                          <select
                            name="caste[]"
                            id="caste"
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
                              id="caste-optgroup-Christian"
                              label="Christian"
                            >
                              <option
                                value="Christian:Anglo Indian"
                                label="Anglo Indian"
                              >
                                Anglo Indian
                              </option>
                              <option
                                value="Christian:Basel Mission"
                                label="Basel Mission"
                              >
                                Basel Mission
                              </option>
                              <option
                                value="Christian:Born Again"
                                label="Born Again"
                              >
                                Born Again
                              </option>
                              <option
                                value="Christian:Bretheren"
                                label="Bretheren"
                              >
                                Bretheren
                              </option>
                              <option
                                value="Christian:Cannonite"
                                label="Cannonite"
                              >
                                Cannonite
                              </option>
                              <option
                                value="Christian:Catholic"
                                label="Catholic"
                              >
                                Catholic
                              </option>
                            </optgroup>
                          </select>
                          <div className="ddSelWrap" id="ddSelWrap_caste">
                            <div
                              className="ddOptHolderWrapper"
                              id="ddOptHolderWrapper_caste"
                            >
                              <div
                                className="ddOptHolder"
                                id="ddOptHolder_caste"
                              >
                                <div
                                  className="ddSelOptHolder ddSelOptHolderOpen"
                                  id="ddSelOptHolder_caste"
                                >
                                  <span className="ddSelectedOptSpan" rel="">
                                    Open to all
                                  </span>
                                  <input
                                    type="text"
                                    className="ddSelOptText"
                                    id="ddSelOptText_caste"
                                    size="1"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              </div>
                              <div
                                className="ddOptionHolder"
                                id="ddOptionHolder_caste"
                              ></div>
                            </div>
                          </div>
                        </span>
                      </div>
                      <div className="col_03">
                        <span id="caste-edit_link_span">
                          <a id="edit" href="/" className="blue_11">
                            Edit
                          </a>
                        </span>
                        <span
                          id="caste-save_button_span"
                          style={{ display: "none" }}
                        >
                          <a className="btnGreen_setting" href="/">
                            Save
                          </a>{" "}
                          <a className="btnGrey_setting" href="/">
                            Cancel
                          </a>
                        </span>
                        <span
                          id="caste-save_loader_span"
                          className="pad_t_5"
                          style={{ display: "none" }}
                        >
                          <img
                            src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                            alt=""
                          />
                        </span>
                        <span
                          id="caste-save_success_span"
                          style={{ display: "none" }}
                        >
                          <span className="saved">Saved</span>
                        </span>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>

                  <div id="mothertongue-main" className="row">
                    <div className="col_01">Mother Tongue</div>
                    <div className="col_02">
                      <span id="mothertongue-data_view_span">Open to all</span>
                      <span
                        id="mothertongue-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="mothertongue[]"
                          id="mothertongue"
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
                          <option value="1" label="Aka">
                            Aka
                          </option>
                          <option value="2" label="Arabic">
                            Arabic
                          </option>
                        </select>
                        <div className="ddSelWrap" id="ddSelWrap_mothertongue">
                          <div
                            className="ddOptHolderWrapper"
                            id="ddOptHolderWrapper_mothertongue"
                          >
                            <div
                              className="ddOptHolder"
                              id="ddOptHolder_mothertongue"
                            >
                              <div
                                className="ddSelOptHolder ddSelOptHolderOpen"
                                id="ddSelOptHolder_mothertongue"
                              >
                                <span className="ddSelectedOptSpan" rel="">
                                  Open to all
                                </span>
                                <input
                                  type="text"
                                  className="ddSelOptText"
                                  id="ddSelOptText_mothertongue"
                                  autocomplete="off"
                                  size="1"
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                            <div
                              className="ddOptionHolder"
                              id="ddOptionHolder_mothertongue"
                            ></div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="mothertongue-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="mothertongue-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="mothertongue-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="mothertongue-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div id="maritalstatus-main" className="row">
                    <div className="col_01">Marital Status</div>
                    <div className="col_02">
                      <span id="maritalstatus-data_view_span">
                        Never Married
                      </span>
                      <span
                        id="maritalstatus-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="maritalstatus[]"
                          id="maritalstatus"
                          multiple="multiple"
                          style={{ display: "none" }}
                        >
                          <option value="" label="Open to all">
                            Open to all
                          </option>
                          <option
                            value="1"
                            label="Never Married"
                            selected="selected"
                          >
                            Never Married
                          </option>
                          <option value="2" label="Divorced">
                            Divorced
                          </option>
                          <option value="3" label="Widowed">
                            Widowed
                          </option>
                          <option value="4" label="Awaiting Divorce">
                            Awaiting Divorce
                          </option>
                          <option value="5" label="Annulled">
                            Annulled
                          </option>
                        </select>
                        <div className="ddSelWrap" id="ddSelWrap_maritalstatus">
                          <div
                            className="ddOptHolderWrapper"
                            id="ddOptHolderWrapper_maritalstatus"
                          >
                            <div
                              className="ddOptHolder"
                              id="ddOptHolder_maritalstatus"
                            >
                              <div
                                className="ddSelOptHolder ddSelOptHolderOpen"
                                id="ddSelOptHolder_maritalstatus"
                              >
                                <span className="ddSelectedOptSpan" rel="1">
                                  Never Married
                                </span>
                                <input
                                  type="text"
                                  className="ddSelOptText"
                                  id="ddSelOptText_maritalstatus"
                                  autocomplete="off"
                                  size="1"
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                            <div
                              className="ddOptionHolder"
                              id="ddOptionHolder_maritalstatus"
                            ></div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="maritalstatus-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="maritalstatus-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="maritalstatus-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="maritalstatus-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div id="height-main" className="row">
                    <div className="col_01">Height</div>
                    <div className="col_02">
                      <span id="height-data_view_span">4' 5'' - 7'</span>
                      <span
                        id="height-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="heightfrom"
                          id="heightfrom"
                          className="select_options"
                        >
                          <option
                            value="53"
                            label="4' 5'' - 134cm"
                            selected="selected"
                          >
                            4' 5'' - 134cm
                          </option>
                          <option value="54" label="4' 6'' - 137cm">
                            4' 6'' - 137cm
                          </option>
                        </select>{" "}
                        to
                        <select
                          name="heightto"
                          id="heightto"
                          className="select_options"
                        >
                          <option value="53" label="4' 5'' - 134cm">
                            4' 5'' - 134cm
                          </option>
                        </select>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="height-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="height-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="height-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="height-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div
                    id="countryofresidence-main"
                    className="row"
                    style={{ display: "none" }}
                  >
                    <div className="col_01">Country living in</div>
                    <div className="col_02">
                      <span id="countryofresidence-data_view_span">
                        Open to all
                      </span>
                      <span
                        id="countryofresidence-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="countryofresidence[]"
                          id="countryofresidence"
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
                            id="countryofresidence-optgroup-Frequently Used"
                            label="Frequently Used"
                          >
                            <option value="90" label="India">
                              India
                            </option>
                            <option value="211" label="USA">
                              USA
                            </option>
                            <option value="209" label="UK">
                              UK
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
                                <span className="ddSelectedOptSpan" rel="">
                                  Open to all
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
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="countryofresidence-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="countryofresidence-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="countryofresidence-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="countryofresidence-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div className="more_filter">
                    <a href="/">More Filter criteria</a>
                  </div>
                </div>
              </div>
              <div className="fliter_note">
                Connection requests from all other Members will appear in the{" "}
                <a href="/inbox/filteredout">Filtered out</a> folder of your
                Inbox. These members can Chat with you, but will not be able to
                see your contact details until you accept their Request.
              </div>

              <div
                id="modalContent"
                className="none"
                style={{ width: "563px" }}
              >
                <div className="align_l width_559 message_layer_main cursor_auto">
                  <div className="message_layer_header_bg">
                    <div> Review your changes</div>
                    <div className="layerClose fr">
                      <span id="layerClose"></span>
                    </div>
                    <div id="modalTitle"></div>
                  </div>
                  <div className="pos_rel" id="layer_data">
                    <div className="message_layer_inner_fb">
                      <div>
                        These criteria are too narrow!
                        <br />
                        <br /> Setting your Filters too narrow will change your
                        <a
                          className="light_link_blue"
                          href="/my-shaadi/partner-profile"
                          target="_blank"
                        >
                          Partner Preferences
                        </a>{" "}
                        as well, and you will get fewer Matches.
                        <br />
                        <br /> Are you sure you want to continue?
                        <br /> <br />
                        <div className="align_c">
                          <span id="ppConfirmContinue"></span>
                          <span id="ppConfirmClose"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        {tabs === 2 && (
          <div id="alert_manager">
            Manage your subscriptions to Shaadi.com Alerts on email listed
            below. You can also subscribe to Shaadi.com and ShaadiTimes
            Newsletters.
            <form name="frm_alerts">
              <div class="alert_heding">My Alerts</div>
              <div class="section">
                <div class="coloumn_left">
                  <p>Match Mail &amp; Photo Match Mail</p>
                  Personalized matches for you delivered via email as often as
                  you like. A very effective match-making tool.
                  <div id="recommended" class="broader_match_option">
                    <input type="hidden" name="recommended_matches" value="N" />
                    <input
                      type="checkbox"
                      name="recommended_matches"
                      id="recommended_matches"
                      value="Y"
                      checked="checked"
                    />
                    Send me Broader Matches if there are no new Preferred
                    Matches
                  </div>
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="checkmate-Daily">
                        <input
                          type="radio"
                          name="checkmate"
                          id="checkmate-Daily"
                          value="Daily"
                          checked="checked"
                        />
                        Daily
                      </label>
                      <label for="checkmate-Thriceaweek">
                        <input
                          type="radio"
                          name="checkmate"
                          id="checkmate-Thriceaweek"
                          value="Thrice a week"
                        />
                        Tri-Weekly
                      </label>{" "}
                      <label for="checkmate-Weekly">
                        <input
                          type="radio"
                          name="checkmate"
                          id="checkmate-Weekly"
                          value="Weekly"
                        />
                        Weekly
                      </label>{" "}
                      <label for="checkmate-N">
                        <input
                          type="radio"
                          name="checkmate"
                          id="checkmate-N"
                          value="N"
                        />
                        Unsubscribe
                      </label>{" "}
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>

              <div class="section">
                <div class="coloumn_left">
                  <p>Premium Match Mail</p>
                  An email notification containing your Matches who have
                  upgraded to a Premium Membership
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="premium_match_subscription-Weekly">
                        <input
                          type="radio"
                          name="premium_match_subscription"
                          id="premium_match_subscription-Weekly"
                          value="Weekly"
                          checked="checked"
                        />
                        Weekly
                      </label>{" "}
                      <label for="premium_match_subscription-Never">
                        <input
                          type="radio"
                          name="premium_match_subscription"
                          id="premium_match_subscription-Never"
                          value="Never"
                        />
                        Unsubscribe
                      </label>{" "}
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>

              <div class="section">
                <div class="coloumn_left">
                  <p>Recent Visitors Email</p>
                  An email notification of Members who have recently Viewed your
                  Profile
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul class="recent_visitor_email_alert">
                    <li>
                      <label for="recent_visitor_subscription-Weekly">
                        <input
                          type="radio"
                          name="recent_visitor_subscription"
                          id="recent_visitor_subscription-Weekly"
                          value="Weekly"
                          checked="checked"
                        />
                        Daily
                      </label>{" "}
                      <label for="recent_visitor_subscription-Never">
                        <input
                          type="radio"
                          name="recent_visitor_subscription"
                          id="recent_visitor_subscription-Never"
                          value="Never"
                        />
                        Unsubscribe
                      </label>
                      <div class="tt">
                        <span
                          onmouseover="cancelclosetime();img_tool_tip('tool_top84')"
                          onmouseout="set_tooltip_timeout('tool_top84')"
                          id="tool_top84"
                          style={{ display: "none" }}
                          class="tooltip"
                        >
                          <span class="top"></span>
                          <span class="middle-tip">
                            We might not send you this email on days when we
                            don't have any relevant Profiles for you.
                          </span>
                          <span class="bottom"></span>
                        </span>
                      </div>{" "}
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>
              <div class="section">
                <div class="coloumn_left">
                  <p>Members who Shortlisted you Email</p>
                  An email notification of Members who have recently Shortlisted
                  your Profile
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="shortlistnotify_subscription-Daily">
                        <input
                          type="radio"
                          name="shortlistnotify_subscription"
                          id="shortlistnotify_subscription-Daily"
                          value="Daily"
                          checked="checked"
                        />
                        Daily
                      </label>{" "}
                      <label for="shortlistnotify_subscription-Never">
                        <input
                          type="radio"
                          name="shortlistnotify_subscription"
                          id="shortlistnotify_subscription-Never"
                          value="Never"
                        />
                        Unsubscribe
                      </label>{" "}
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>
              <div class="section">
                <div class="coloumn_left">
                  <p>Viewed Profiles Email</p>
                  An email reminder containing Profiles you have Viewed recently
                  but have not yet invited to Connect.{" "}
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="viewedprofile_subscription-Weekly">
                        <input
                          type="radio"
                          name="viewedprofile_subscription"
                          id="viewedprofile_subscription-Weekly"
                          value="Weekly"
                          checked="checked"
                        />
                        Weekly
                      </label>{" "}
                      <label for="viewedprofile_subscription-Never">
                        <input
                          type="radio"
                          name="viewedprofile_subscription"
                          id="viewedprofile_subscription-Never"
                          value="Never"
                        />
                        Unsubscribe
                      </label>{" "}
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>
              <div class="section">
                <div class="coloumn_left">
                  <p>Similar Profiles Email</p>
                  An email containing Profiles that are similar to the ones you
                  have liked recently.
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="similarprofile_subscription-Bi-Weekly">
                        <input
                          type="radio"
                          name="similarprofile_subscription"
                          id="similarprofile_subscription-Bi-Weekly"
                          value="Bi-Weekly"
                          checked="checked"
                        />
                        Bi-Weekly
                      </label>{" "}
                      <label for="similarprofile_subscription-Never">
                        <input
                          type="radio"
                          name="similarprofile_subscription"
                          id="similarprofile_subscription-Never"
                          value="Never"
                        />
                        Unsubscribe
                      </label>{" "}
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>
              <div class="section">
                <div class="coloumn_left">
                  <p>Contact Alert</p>
                  Alerts you receive every time someone contacts you or you
                  receive a response to a contact initiated by you. Get them in
                  your mailbox at a frequency of your choice. Essential to keep
                  you informed of all responses received.
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="contact_lens-Instant">
                        <input
                          type="radio"
                          name="contact_lens"
                          id="contact_lens-Instant"
                          value="Instant"
                          checked="checked"
                        />
                        Instant - A mail for every response
                      </label>{" "}
                      <label for="contact_lens-Daily">
                        <input
                          type="radio"
                          name="contact_lens"
                          id="contact_lens-Daily"
                          value="Daily"
                        />
                        Daily - A digest of all responses received in a day
                      </label>{" "}
                      <label for="contact_lens-N">
                        <input
                          type="radio"
                          name="contact_lens"
                          id="contact_lens-N"
                          value="N"
                        />
                        Unsubscribe
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>
              <div class="section">
                <div class="coloumn_left">
                  <p>Message Received Alert</p>
                  An email notification of new messages received recently.
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="emailreceived_subscription-Instant">
                        <input
                          type="radio"
                          name="emailreceived_subscription"
                          id="emailreceived_subscription-Instant"
                          value="Instant"
                          checked="checked"
                        />
                        Daily - A digest of all messages received in a day
                      </label>{" "}
                      <label for="emailreceived_subscription-Never">
                        <input
                          type="radio"
                          name="emailreceived_subscription"
                          id="emailreceived_subscription-Never"
                          value="Never"
                        />
                        Unsubscribe
                      </label>{" "}
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>
              <div class="section">
                <div class="coloumn_left">
                  <p>SMS Alert</p>
                  All SMS alerts will be sent to you on this mobile phone number
                  - 8610756675{" "}
                </div>
                <div class="column_right">
                  <p>SMS Alert</p>
                  <ul>
                    <li>
                      <label>
                        <input
                          type="hidden"
                          name="sms_interest_received_alert"
                          value="0"
                        />
                        <input
                          type="checkbox"
                          name="sms_interest_received_alert"
                          id="sms_interest_received_alert"
                          value="Y"
                          checked="checked"
                        />{" "}
                        For every Invitation received (max 2 per/day)
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="hidden"
                          name="sms_interest_accepted_alert"
                          value="0"
                        />
                        <input
                          type="checkbox"
                          name="sms_interest_accepted_alert"
                          id="sms_interest_accepted_alert"
                          value="Y"
                          checked="checked"
                        />{" "}
                        For every Accept to my Invitation (max 2 per/day)
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>

              <div class="section bdr_bot_none">
                <div class="coloumn_left">
                  <p>Shaadi.com Profile Blaster</p>
                  Perfect matches for you through profile blaster delivered via
                  email as often as you like. The Exact match-making tool.
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="blaster_r-Y">
                        <input
                          type="radio"
                          name="blaster_r"
                          id="blaster_r-Y"
                          value="Y"
                          checked="checked"
                        />
                        Subscribe
                      </label>{" "}
                      <label for="blaster_r-N">
                        <input
                          type="radio"
                          name="blaster_r"
                          id="blaster_r-N"
                          value="N"
                        />
                        Unsubscribe
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>

              <div class="alert_heding">Shaadi.com Newsletters</div>
              <div class="section">
                <div class="coloumn_left">
                  <p>Shaadi Specials</p>
                  Invitations, Discounts, and Offers just for Shaadi.com
                  members. Offers range from free holidays to discounted
                  jewellery. Delivered not more than twice a month.
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="specials-Y">
                        <input
                          type="radio"
                          name="specials"
                          id="specials-Y"
                          value="Y"
                          checked="checked"
                        />
                        Occasionally - Not more than twice a month
                      </label>{" "}
                      <label for="specials-N">
                        <input
                          type="radio"
                          name="specials"
                          id="specials-N"
                          value="N"
                        />
                        Unsubscribe
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>

              <div class="section bdr_bot_none">
                <div class="coloumn_left">
                  <p>Shaadi InSite</p>
                  Advice and updates from Shaadi.com to help you get the most
                  out of your Shaadi.com experience. A must-have.
                </div>
                <div class="column_right">
                  <p>Email Alert</p>
                  <ul>
                    <li>
                      <label for="insite-Y">
                        <input
                          type="radio"
                          name="insite"
                          id="insite-Y"
                          value="Y"
                          checked="checked"
                        />
                        Monthly
                      </label>{" "}
                      <label for="insite-N">
                        <input
                          type="radio"
                          name="insite"
                          id="insite-N"
                          value="N"
                        />
                        Unsubscribe
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="clear"></div>
              </div>
            </form>
            <div class="alert_heding">Shaadi Times Newsletters</div>
            <div class="section">
              <div class="coloumn_left">
                Great reads on love, being single, fashion trends, celebs,
                wedding couture. Also subscribe to newsletters like Fashion
                Passion, Homemaker, Travelogue and HealthLine.
              </div>
              <div class="column_right">
                <a href="/" class="light_blue" target="_new">
                  Click here
                </a>{" "}
                to manage your subscriptions
              </div>
              <div class="clear"></div>
            </div>
            <div class="pad_t_20 align_c">
              <a
                class="green_btn white font_18 arrow_btn_pad rad_5 inline_block mar_r_7"
                id="btnSubmit"
                href="/"
              >
                Update
              </a>
              <a href="#/" class="light_link_blue">
                Reset
              </a>
            </div>
            <div class="pad_t_20">
              All your Shaadi.com emails and ShaadiTimes newsletters will be
              delivered to{" "}
              <a
                href="mailto:saranya.76890@gmail.com"
                class="light_link_blue font_bold"
              >
                saranya.76890@gmail.com
              </a>{" "}
              <a
                href="/my-shaadi/my-account"
                class="light_link_blue font_11 mar_l_20"
              >
                Edit
              </a>
            </div>
            <div class="pad_t_7 grey_66">
              Note: This is also the email for logging into your Shaadi.com
              account.
            </div>
          </div>
        )}
        {tabs === 3 && (
          <div>
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              className="heading2"
            >
              <tbody>
                <tr>
                  <td valign="bottom">
                    <h2>Privacy</h2>
                  </td>
                </tr>
              </tbody>
            </table>

            <form style={{ margin: "0px", paddingTop: "10px" }}>
              <input
                type="hidden"
                name="hid_gender"
                value="Male"
                id="hid_gender"
              />
              <div id="filter_wrapper">
                <div className="details">
                  <div id="age-main" className="row">
                    <div className="col_01">Age</div>
                    <div className="col_02">
                      <span id="age-data_view_span">21 - 31</span>
                      <span id="age-data_edit_span" style={{ display: "none" }}>
                        <select
                          name="agefrom"
                          id="agefrom"
                          className="select_options"
                        >
                          <option value="18" label="18">
                            18
                          </option>

                          <option value="71" label="71">
                            71
                          </option>
                        </select>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="age-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="age-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="j/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="age-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="age-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div id="community-main" className="row">
                    <div className="col_01">Religion</div>
                    <div className="col_02">
                      <span id="community-data_view_span">Christian</span>
                      <span
                        id="community-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="community[]"
                          id="community"
                          multiple="multiple"
                          style={{ display: "none" }}
                        >
                          <option value="" label="Open to all">
                            Open to all
                          </option>
                          <option value="Hindu" label="Hindu">
                            Hindu
                          </option>
                          <option value="Muslim" label="Muslim">
                            Muslim
                          </option>
                          <option
                            value="Christian"
                            label="Christian"
                            selected="selected"
                          >
                            Christian
                          </option>
                        </select>
                        <div className="ddSelWrap" id="ddSelWrap_community">
                          <div
                            className="ddOptHolderWrapper"
                            id="ddOptHolderWrapper_community"
                          >
                            <div
                              className="ddOptHolder"
                              id="ddOptHolder_community"
                            >
                              <div
                                className="ddSelOptHolder ddSelOptHolderOpen"
                                id="ddSelOptHolder_community"
                              >
                                <span
                                  className="ddSelectedOptSpan"
                                  rel="Christian"
                                >
                                  Christian
                                </span>
                                <input
                                  type="text"
                                  className="ddSelOptText"
                                  id="ddSelOptText_community"
                                  autocomplete="off"
                                  size="1"
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                            <div
                              className="ddOptionHolder"
                              id="ddOptionHolder_community"
                            ></div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="community-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="community-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="community-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="community-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div id="show_hide_caste">
                    <div id="caste-main" className="row">
                      <div className="col_01">Community</div>
                      <div className="col_02">
                        <span id="caste-data_view_span">Open to all</span>
                        <span
                          id="caste-data_edit_span"
                          style={{ display: "none" }}
                        >
                          <select
                            name="caste[]"
                            id="caste"
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
                              id="caste-optgroup-Christian"
                              label="Christian"
                            >
                              <option
                                value="Christian:Anglo Indian"
                                label="Anglo Indian"
                              >
                                Anglo Indian
                              </option>
                              <option
                                value="Christian:Basel Mission"
                                label="Basel Mission"
                              >
                                Basel Mission
                              </option>
                              <option
                                value="Christian:Born Again"
                                label="Born Again"
                              >
                                Born Again
                              </option>
                              <option
                                value="Christian:Bretheren"
                                label="Bretheren"
                              >
                                Bretheren
                              </option>
                              <option
                                value="Christian:Cannonite"
                                label="Cannonite"
                              >
                                Cannonite
                              </option>
                              <option
                                value="Christian:Catholic"
                                label="Catholic"
                              >
                                Catholic
                              </option>
                            </optgroup>
                          </select>
                          <div className="ddSelWrap" id="ddSelWrap_caste">
                            <div
                              className="ddOptHolderWrapper"
                              id="ddOptHolderWrapper_caste"
                            >
                              <div
                                className="ddOptHolder"
                                id="ddOptHolder_caste"
                              >
                                <div
                                  className="ddSelOptHolder ddSelOptHolderOpen"
                                  id="ddSelOptHolder_caste"
                                >
                                  <span className="ddSelectedOptSpan" rel="">
                                    Open to all
                                  </span>
                                  <input
                                    type="text"
                                    className="ddSelOptText"
                                    id="ddSelOptText_caste"
                                    size="1"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              </div>
                              <div
                                className="ddOptionHolder"
                                id="ddOptionHolder_caste"
                              ></div>
                            </div>
                          </div>
                        </span>
                      </div>
                      <div className="col_03">
                        <span id="caste-edit_link_span">
                          <a id="edit" href="/" className="blue_11">
                            Edit
                          </a>
                        </span>
                        <span
                          id="caste-save_button_span"
                          style={{ display: "none" }}
                        >
                          <a className="btnGreen_setting" href="/">
                            Save
                          </a>{" "}
                          <a className="btnGrey_setting" href="/">
                            Cancel
                          </a>
                        </span>
                        <span
                          id="caste-save_loader_span"
                          className="pad_t_5"
                          style={{ display: "none" }}
                        >
                          <img
                            src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                            alt=""
                          />
                        </span>
                        <span
                          id="caste-save_success_span"
                          style={{ display: "none" }}
                        >
                          <span className="saved">Saved</span>
                        </span>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>

                  <div id="mothertongue-main" className="row">
                    <div className="col_01">Mother Tongue</div>
                    <div className="col_02">
                      <span id="mothertongue-data_view_span">Open to all</span>
                      <span
                        id="mothertongue-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="mothertongue[]"
                          id="mothertongue"
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
                          <option value="1" label="Aka">
                            Aka
                          </option>
                          <option value="2" label="Arabic">
                            Arabic
                          </option>
                        </select>
                        <div className="ddSelWrap" id="ddSelWrap_mothertongue">
                          <div
                            className="ddOptHolderWrapper"
                            id="ddOptHolderWrapper_mothertongue"
                          >
                            <div
                              className="ddOptHolder"
                              id="ddOptHolder_mothertongue"
                            >
                              <div
                                className="ddSelOptHolder ddSelOptHolderOpen"
                                id="ddSelOptHolder_mothertongue"
                              >
                                <span className="ddSelectedOptSpan" rel="">
                                  Open to all
                                </span>
                                <input
                                  type="text"
                                  className="ddSelOptText"
                                  id="ddSelOptText_mothertongue"
                                  autocomplete="off"
                                  size="1"
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                            <div
                              className="ddOptionHolder"
                              id="ddOptionHolder_mothertongue"
                            ></div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="mothertongue-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="mothertongue-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="mothertongue-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="mothertongue-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div id="maritalstatus-main" className="row">
                    <div className="col_01">Marital Status</div>
                    <div className="col_02">
                      <span id="maritalstatus-data_view_span">
                        Never Married
                      </span>
                      <span
                        id="maritalstatus-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="maritalstatus[]"
                          id="maritalstatus"
                          multiple="multiple"
                          style={{ display: "none" }}
                        >
                          <option value="" label="Open to all">
                            Open to all
                          </option>
                          <option
                            value="1"
                            label="Never Married"
                            selected="selected"
                          >
                            Never Married
                          </option>
                          <option value="2" label="Divorced">
                            Divorced
                          </option>
                          <option value="3" label="Widowed">
                            Widowed
                          </option>
                          <option value="4" label="Awaiting Divorce">
                            Awaiting Divorce
                          </option>
                          <option value="5" label="Annulled">
                            Annulled
                          </option>
                        </select>
                        <div className="ddSelWrap" id="ddSelWrap_maritalstatus">
                          <div
                            className="ddOptHolderWrapper"
                            id="ddOptHolderWrapper_maritalstatus"
                          >
                            <div
                              className="ddOptHolder"
                              id="ddOptHolder_maritalstatus"
                            >
                              <div
                                className="ddSelOptHolder ddSelOptHolderOpen"
                                id="ddSelOptHolder_maritalstatus"
                              >
                                <span className="ddSelectedOptSpan" rel="1">
                                  Never Married
                                </span>
                                <input
                                  type="text"
                                  className="ddSelOptText"
                                  id="ddSelOptText_maritalstatus"
                                  autocomplete="off"
                                  size="1"
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                            <div
                              className="ddOptionHolder"
                              id="ddOptionHolder_maritalstatus"
                            ></div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="maritalstatus-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="maritalstatus-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="maritalstatus-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="maritalstatus-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div id="height-main" className="row">
                    <div className="col_01">Height</div>
                    <div className="col_02">
                      <span id="height-data_view_span">4' 5'' - 7'</span>
                      <span
                        id="height-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="heightfrom"
                          id="heightfrom"
                          className="select_options"
                        >
                          <option
                            value="53"
                            label="4' 5'' - 134cm"
                            selected="selected"
                          >
                            4' 5'' - 134cm
                          </option>
                          <option value="54" label="4' 6'' - 137cm">
                            4' 6'' - 137cm
                          </option>
                        </select>{" "}
                        to
                        <select
                          name="heightto"
                          id="heightto"
                          className="select_options"
                        >
                          <option value="53" label="4' 5'' - 134cm">
                            4' 5'' - 134cm
                          </option>
                        </select>
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="height-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="height-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="height-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="height-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div
                    id="countryofresidence-main"
                    className="row"
                    style={{ display: "none" }}
                  >
                    <div className="col_01">Country living in</div>
                    <div className="col_02">
                      <span id="countryofresidence-data_view_span">
                        Open to all
                      </span>
                      <span
                        id="countryofresidence-data_edit_span"
                        style={{ display: "none" }}
                      >
                        <select
                          name="countryofresidence[]"
                          id="countryofresidence"
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
                            id="countryofresidence-optgroup-Frequently Used"
                            label="Frequently Used"
                          >
                            <option value="90" label="India">
                              India
                            </option>
                            <option value="211" label="USA">
                              USA
                            </option>
                            <option value="209" label="UK">
                              UK
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
                                <span className="ddSelectedOptSpan" rel="">
                                  Open to all
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
                      </span>
                    </div>
                    <div className="col_03">
                      <span id="countryofresidence-edit_link_span">
                        <a id="edit" href="/" className="blue_11">
                          Edit
                        </a>
                      </span>
                      <span
                        id="countryofresidence-save_button_span"
                        style={{ display: "none" }}
                      >
                        <a className="btnGreen_setting" href="/">
                          Save
                        </a>{" "}
                        <a className="btnGrey_setting" href="/">
                          Cancel
                        </a>
                      </span>
                      <span
                        id="countryofresidence-save_loader_span"
                        className="pad_t_5"
                        style={{ display: "none" }}
                      >
                        <img
                          src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                          alt=""
                        />
                      </span>
                      <span
                        id="countryofresidence-save_success_span"
                        style={{ display: "none" }}
                      >
                        <span className="saved">Saved</span>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div className="more_filter">
                    <a href="/">More Filter criteria</a>
                  </div>
                </div>
              </div>
              <div className="fliter_note">
                Connection requests from all other Members will appear in the{" "}
                <a href="/inbox/filteredout">Filtered out</a> folder of your
                Inbox. These members can Chat with you, but will not be able to
                see your contact details until you accept their Request.
              </div>

              <div
                id="modalContent"
                className="none"
                style={{ width: "563px" }}
              >
                <div className="align_l width_559 message_layer_main cursor_auto">
                  <div className="message_layer_header_bg">
                    <div> Review your changes</div>
                    <div className="layerClose fr">
                      <span id="layerClose"></span>
                    </div>
                    <div id="modalTitle"></div>
                  </div>
                  <div className="pos_rel" id="layer_data">
                    <div className="message_layer_inner_fb">
                      <div>
                        These criteria are too narrow!
                        <br />
                        <br /> Setting your Filters too narrow will change your
                        <a
                          className="light_link_blue"
                          href="/my-shaadi/partner-profile"
                          target="_blank"
                        >
                          Partner Preferences
                        </a>{" "}
                        as well, and you will get fewer Matches.
                        <br />
                        <br /> Are you sure you want to continue?
                        <br /> <br />
                        <div className="align_c">
                          <span id="ppConfirmContinue"></span>
                          <span id="ppConfirmClose"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        {tabs === 4 && (
          <div id="filter_wrapper">
            <div className="details">
              <div id="community-main" className="row">
                <div className="col_01">Hide Profile</div>
                <div className="col_02">
                  {user[0]?.profileStatus === "Vissible" && (
                    <span id="community-data_view_span">
                      Your profile is currently visiable to other DTR users
                    </span>
                  )}
                  {user[0]?.profileStatus === "Hidden" && (
                    <span id="community-data_view_span">
                      Your profile is currently hidden from other DTR users
                    </span>
                  )}
                  <span
                    id="community-data_edit_span"
                    style={{ display: "none" }}
                  >
                    <select
                      name="community[]"
                      id="community"
                      multiple="multiple"
                      style={{ display: "none" }}
                    >
                      <option value="" label="Open to all">
                        Open to all
                      </option>
                      <option value="Hindu" label="Hindu">
                        Hindu
                      </option>
                      <option value="Muslim" label="Muslim">
                        Muslim
                      </option>
                      <option
                        value="Christian"
                        label="Christian"
                        selected="selected"
                      >
                        Christian
                      </option>
                    </select>
                    <div className="ddSelWrap" id="ddSelWrap_community">
                      <div
                        className="ddOptHolderWrapper"
                        id="ddOptHolderWrapper_community"
                      >
                        <div className="ddOptHolder" id="ddOptHolder_community">
                          <div
                            className="ddSelOptHolder ddSelOptHolderOpen"
                            id="ddSelOptHolder_community"
                          >
                            <span className="ddSelectedOptSpan" rel="Christian">
                              Christian
                            </span>
                            <input
                              type="text"
                              className="ddSelOptText"
                              id="ddSelOptText_community"
                              autocomplete="off"
                              size="1"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                        <div
                          className="ddOptionHolder"
                          id="ddOptionHolder_community"
                        ></div>
                      </div>
                    </div>
                  </span>
                </div>
                <div className="col_03">
                  <span id="community-edit_link_span">
                    {user[0]?.profileStatus === "Vissible" && (
                      <a
                        id="edit"
                        href=" "
                        onClick={(e) => {
                          e.preventDefault();
                          setShowHide(true);
                        }}
                        className="blue_11"
                      >
                        Hide
                      </a>
                    )}
                    {user[0]?.profileStatus === "Hidden" && (
                      <a
                        id="edit"
                        href=" "
                        onClick={(e) => {
                          e.preventDefault();
                          setShowActive(true);
                        }}
                        className="blue_11"
                      >
                        Active
                      </a>
                    )}
                  </span>
                  <span
                    id="community-save_button_span"
                    style={{ display: "none" }}
                  >
                    <a className="btnGreen_setting" href="/">
                      Save
                    </a>{" "}
                    <a className="btnGrey_setting" href="/">
                      Cancel
                    </a>
                  </span>
                  <span
                    id="community-save_loader_span"
                    className="pad_t_5"
                    style={{ display: "none" }}
                  >
                    <img
                      src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                      alt=""
                    />
                  </span>
                  <span
                    id="community-save_success_span"
                    style={{ display: "none" }}
                  >
                    <span className="saved">Saved</span>
                  </span>
                </div>
                <div className="clear"></div>
              </div>
              <div id="show_hide_caste">
                <div id="caste-main" className="row">
                  <div className="col_01">Delete Account</div>
                  <div className="col_02">
                    <span id="caste-data_view_span">
                      Delete all of your data, this is Irreversible
                    </span>
                    <span id="caste-data_edit_span" style={{ display: "none" }}>
                      <select
                        name="caste[]"
                        id="caste"
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
                          id="caste-optgroup-Christian"
                          label="Christian"
                        >
                          <option
                            value="Christian:Anglo Indian"
                            label="Anglo Indian"
                          >
                            Anglo Indian
                          </option>
                          <option
                            value="Christian:Basel Mission"
                            label="Basel Mission"
                          >
                            Basel Mission
                          </option>
                          <option
                            value="Christian:Born Again"
                            label="Born Again"
                          >
                            Born Again
                          </option>
                          <option value="Christian:Bretheren" label="Bretheren">
                            Bretheren
                          </option>
                          <option value="Christian:Cannonite" label="Cannonite">
                            Cannonite
                          </option>
                          <option value="Christian:Catholic" label="Catholic">
                            Catholic
                          </option>
                        </optgroup>
                      </select>
                      <div className="ddSelWrap" id="ddSelWrap_caste">
                        <div
                          className="ddOptHolderWrapper"
                          id="ddOptHolderWrapper_caste"
                        >
                          <div className="ddOptHolder" id="ddOptHolder_caste">
                            <div
                              className="ddSelOptHolder ddSelOptHolderOpen"
                              id="ddSelOptHolder_caste"
                            >
                              <span className="ddSelectedOptSpan" rel="">
                                Open to all
                              </span>
                              <input
                                type="text"
                                className="ddSelOptText"
                                id="ddSelOptText_caste"
                                size="1"
                                style={{ display: "none" }}
                              />
                            </div>
                          </div>
                          <div
                            className="ddOptionHolder"
                            id="ddOptionHolder_caste"
                          ></div>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="col_03">
                    <span id="caste-edit_link_span">
                      <a
                        id="edit"
                        href=" "
                        onClick={(e) => {
                          e.preventDefault();
                          setShowDelete(true);
                        }}
                        className="blue_11"
                      >
                        Delete
                      </a>
                    </span>
                    <span
                      id="caste-save_button_span"
                      style={{ display: "none" }}
                    >
                      <a className="btnGreen_setting" href="/">
                        Save
                      </a>{" "}
                      <a className="btnGrey_setting" href="/">
                        Cancel
                      </a>
                    </span>
                    <span
                      id="caste-save_loader_span"
                      className="pad_t_5"
                      style={{ display: "none" }}
                    >
                      <img
                        src="https://img.shaadi.com/imgs/profiles/ver2/loading.gif"
                        alt=""
                      />
                    </span>
                    <span
                      id="caste-save_success_span"
                      style={{ display: "none" }}
                    >
                      <span className="saved">Saved</span>
                    </span>
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="clearfix"></div>
    </div>
  );
}
