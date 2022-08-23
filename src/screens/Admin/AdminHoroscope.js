import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AttachHoroscope from "../../components/myprofile/AttachHoroscope";

const AdminHoroscope = ({
  id,
  name,
  dataReload,
  setDataLoading,
  horoscope,
}) => {
  const adminInfo = localStorage.getItem("dtrmatrimonyjwtadmin");
  const [show, setShow] = useState(false);
  console.log(horoscope, name);
  return (
    <>
      <button
        className="bnr-btn mx-2 font-14 btn btn-primary"
        onClick={() => setShow(true)}
      >
        Horoscope
      </button>
      <Modal show={show}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{name}' Horoscope</Modal.Title>
          </Modal.Header>
          <AttachHoroscope
            getUserInfo={dataReload}
            name={name}
            id={id}
            setDataLoading={setDataLoading}
            horoscope={horoscope}
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            {/* <Button variant="primary" onClick={() => handleDelete(id)}>
              Yes
            </Button> */}
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default AdminHoroscope;
