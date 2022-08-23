import axios from "axios";
import React, { useState } from "react";
import AddIcon from "../../Assets/icons/add-image-svgrepo-com.svg";
const AttachHoroscope = ({ id, horoscope, getUserInfo }) => {
  const [loading, setLoading] = useState(false);
  
  const uploadFileHandler = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    // setFileType(file.type);
    if (file.type.substring(0, 5) === "image") {
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      bodyFormData.set("key", "178218f045ee799c77be43a0e8b0ba0b");
      axios
        .post("https://api.imgbb.com/1/upload", bodyFormData)
        .then((res) => {
          //   setPreviewSrc([...previewSrc, URL.createObjectURL(file)]);
          const bodyData = {
            id: id,
            url: res.data.data.url,
          };
          axios
            .post(
              process.env.REACT_APP_API_URL+"user/attachHoroscope",
              bodyData
            )
            .then((res) => {
              setLoading(false);
              getUserInfo();
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  const removeHoroscope = (url) => {
    setLoading(true);
    const bodyData = {
      id: id,
      url: url,
    };
    axios
      .post(
        process.env.REACT_APP_API_URL+"user/remove_horoscope",
        bodyData
      )
      .then((res) => {
        setLoading(false);
        getUserInfo();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {loading && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              zIndex: 999,
              width: "50px",
              height: "50px",
              background: "rgba(0,0,0,0.6)",
            }}
            class="spinner-border"
            role="status"
          ></div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {horoscope?.url ? (
            <div className="card">
              {" "}
              <img
                alt=""
                src={horoscope?.url}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <p
                className="p-0 m-0"
                style={{
                  position: "absolute",
                  top: "10%",
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  fontSize: "8px",
                }}
              >
                Image-by-DTR
              </p>
              <a target="blank" href={horoscope?.url} download style={{width: '100%'}}>
                <button
                style={{width: '100%'}}
                  type="button"
                  className="bnr-btn font-14 mobile-margin-top btn btn-primary"
                >
                  Download
                </button>
              </a>
              <button
                className="btn btn-danger mt-1 font-14"
                onClick={() => removeHoroscope(horoscope?.url)}
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              className="card"
              style={{
                width: "200px",
                height: "250px",
              }}
            >
              <>
                <label for="uploadPhoto">
                  <img src={AddIcon} alt=" " style={{ cursor: "pointer" }} />
                </label>
                <input
                  id="uploadPhoto"
                  hidden
                  type={"file"}
                  onChange={(e) => uploadFileHandler(e)}
                />
                <p>Upload image of your horoscope</p>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AttachHoroscope;
