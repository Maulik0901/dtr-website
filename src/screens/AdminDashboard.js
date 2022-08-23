import React, { Component }  from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminUnblockProfile from "./Admin/AdminUnblockProfile";
import AdminBlockProfile from "./Admin/AdminBlockProfile";
import AdminDeleteProfile from "./Admin/AdminDeleteProfile";
import AdminEditUser from "./Admin/AdminEditUser";
import AdminActiveProfile from "./Admin/AdminActiveProfile";
import CreateAdmin from "./Admin/CreateAdmin";
import AdminHoroscope from "./Admin/AdminHoroscope";

const AdminDashboard = ({ admin, logOutAdmin }) => {
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [id, setId] = useState(null);
  const history = useNavigate();
  const getuser = (target) => {
    setDataLoading(true);
    if (target === "search") {
      axios
        .get(
          process.env.REACT_APP_API_URL+`admin/get_single_user_id/${id}`
        )
        .then((res) => {
          setUsers(res.data);
          setDataLoading(false);
        })
        .catch((res) => {
          setDataLoading(false);
        });
    } else if (target === "all") {
      axios
        .get(process.env.REACT_APP_API_URL+"user/users")
        .then((res) => {
          setUsers(res.data.reverse());
          setDataLoading(false);
        });
    }
  };
  useEffect(() => {
    getuser("all");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true);
    if (id) {
      getuser("search");
    } else {
      getuser("all");
    }
  };
  const dataReload = () => {
    if (id) {
      getuser("search");
    } else {
      getuser("all");
    }
  };
  const clearSearch = (e) => {
    setDataLoading(true);
    setId("");
    getuser("all");
  };
  return (
    <div className="container" style={{ width: "100%" }}>
      <div className="container">
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h4>Admin Logged In as: {admin.name} </h4>
          <CreateAdmin />
          <button
            onClick={logOutAdmin}
            className="bnr-btn mx-2 font-14 btn btn-primary"
          >
            Logout
          </button>
        </div>
        <div></div>
        {dataLoading && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              zIndex: 999,
              width: "50px",
              height: "50px",
              background: "rgba(0,0,0,0.6)",
              left: "50%",
            }}
            class="spinner-border"
            role="status"
          ></div>
        )}
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <form className="form-control" onSubmit={handleSubmit}>
              <input
                style={{
                  // width: "600px",
                  height: "40px",
                  padding: "5px",
                  borderRadius: "5px",
                  fontSize: "18px",
                }}
                value={id}
                type="text"
                placeholder="Search by ID"
                onChange={(e) => setId(e.target.value)}
              />
            </form>
            {/* {id && (
                <button
                  type="text"
                  onClick={() => clearSearch()}
                  style={{
                    height: "40px",
                    padding: "5px",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    backgroundColor: "white",
                  }}
                >
                  Clear
                </button>
              )} */}
          </div>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User ID</th>
                <th style={{ textAlign: "center" }}>Action</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Profile</th>
              </tr>
            </thead>
            <tbody>
              {users.length &&
                users.map((each, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td
                      onClick={() => {
                        history("/profile", {
                          state: { data: [each] },
                        });
                      }}
                      style={{
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                      title="Visit Profile"
                    >
                      {each.name}
                    </td>
                    <td style={{ fontSize: "18px" }}>{each._id}</td>
                    <td style={{ textAlign: "start" }}>
                      <AdminEditUser
                        dataReload={dataReload}
                        userData={each}
                        setDataLoading={setDataLoading}
                      />
                      {each?.accountStatus === "Blocked" && (
                        <AdminUnblockProfile
                          dataReload={dataReload}
                          name={each.name}
                          id={each._id}
                          setDataLoading={setDataLoading}
                        />
                      )}
                      {each?.accountStatus === "Active" && (
                        <AdminBlockProfile
                          dataReload={dataReload}
                          name={each.name}
                          id={each._id}
                          setDataLoading={setDataLoading}
                        />
                      )}
                      {(each?.accountStatus === "Pending" ||
                        each?.accountStatus === undefined ||
                        each?.accountStatus === "Hidden") && (
                        <AdminActiveProfile
                          dataReload={dataReload}
                          name={each.name}
                          id={each._id}
                          setDataLoading={setDataLoading}
                        />
                      )}
                      <AdminDeleteProfile
                        dataReload={dataReload}
                        name={each.name}
                        id={each._id}
                        setDataLoading={setDataLoading}
                      />
                      <AdminHoroscope
                        dataReload={dataReload}
                        name={each.name}
                        id={each._id}
                        setDataLoading={setDataLoading}
                        horoscope={each?.horoscope}
                      />
                    </td>
                    <td style={{ fontSize: "18px" }}>{each?.accountStatus}</td>
                    <td style={{ fontSize: "18px" }}>{each?.profileStatus}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
