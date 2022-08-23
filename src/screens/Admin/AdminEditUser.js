
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AboutEdit from "../../components/EditModal/AboutEdit";
import BasicInfo from "../../components/EditModal/BasicInfo";
import EducationInfo from "../../components/EditModal/educationInfo";
import FamilyInfo from "../../components/EditModal/FamilyInfo";
import LocationInfo from "../../components/EditModal/LocationInfor";
import OtherInfo from "../../components/EditModal/otherInfo";
import ReligiousModal from "../../components/EditModal/ReligiousModal";
import AdminEditUserCredentials from "./AdminEditUserCredentials";
const AdminEditUser = ({ userData, dataReload }) => {
  const [showModal, setShowModal] = useState(false);
  const handleEdit = (id) => {
    setShowModal(true);
  };
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [show7, setShow7] = useState(false);
  return (
    <>
      <button
        className="bnr-btn mx-2 font-14 btn btn-primary"
        onClick={() => handleEdit(userData._id)}
      >
        Edit
      </button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit <small>{userData?.name}'s</small> Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            className="bnr-btn mx-2 font-14 btn btn-primary"
            onClick={() => setShow(true)}
          >
            Edit Basic Info
          </button>
          <button
            className="bnr-btn mx-2 font-14 btn btn-primary"
            onClick={() => setShow1(true)}
          >
            Edit Religious Info
          </button>
          <button
            className="bnr-btn mx-2 font-14 btn btn-primary"
            onClick={() => setShow2(true)}
          >
            Edit Familiy Info
          </button>
          <div className="my-2">
            <button
              className="bnr-btn mx-2 font-14 btn btn-primary"
              onClick={() => setShow3(true)}
            >
              Edit Education Info
            </button>
            <button
              className="bnr-btn mx-2 font-14 btn btn-primary"
              onClick={() => setShow4(true)}
            >
              Edit Location Info
            </button>
            <button
              className="bnr-btn mx-2 font-14 btn btn-primary"
              onClick={() => setShow5(true)}
            >
              Edit Other Info
            </button>
          </div>
          <button
            className="bnr-btn mx-2 font-14 btn btn-primary"
            onClick={() => setShow6(true)}
          >
            Edit About Info
          </button>
          <button
            className="bnr-btn mx-2 font-14 btn btn-primary"
            onClick={() => setShow7(true)}
          >
            User's Credentials
          </button>
          {show && (
            <BasicInfo
              dataReload={dataReload}
              admin={true}
              setShow={setShow}
              show={show}
              userData={userData}
            />
          )}
          {show1 && (
            <ReligiousModal
              admin={true}
              setShow={setShow1}
              show={show1}
              userData={userData}
              dataReload={dataReload}
            />
          )}
          {show2 && (
            <FamilyInfo
              dataReload={dataReload}
              admin={true}
              setShow={setShow2}
              show={show2}
              userData={userData}
            />
          )}
          {show3 && (
            <EducationInfo
              admin={true}
              setShow={setShow3}
              show={show3}
              userData={userData}
              dataReload={dataReload}
            />
          )}
          {show4 && (
            <LocationInfo
              dataReload={dataReload}
              admin={true}
              setShow={setShow4}
              show={show4}
              userData={userData}
            />
          )}
          {show5 && (
            <OtherInfo
              dataReload={dataReload}
              admin={true}
              setShow={setShow5}
              show={show5}
              userData={userData}
            />
          )}
          {show6 && (
            <AboutEdit
              dataReload={dataReload}
              admin={true}
              setShow={setShow6}
              show={show6}
              userData={userData}
            />
          )}
          {show7 && (
            <AdminEditUserCredentials
              dataReload={dataReload}
              admin={true}
              setShow={setShow7}
              show={show7}
              userData={userData}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminEditUser;
