function ManageProfile({ userData ,profilePicId}) {

  return (
    <div className="manage-profile w-100">
      <div className="upload-photo w-100">
          <img
          alt=""
            src={process.env.REACT_APP_API_URL+`user/get-image/${profilePicId && profilePicId}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
      </div>
      <div className="user-details">
        <div class="row row-acc-1">
          <div className="data-1">
            <div class="single-data">
              <div className="property">ID:</div>
              <div className="value">{userData && userData?._id}</div>
            </div>
            <div class="single-data">
              <div className="property">Age:</div>
              <div className="value">{userData && userData?.BasicsAndLifestyle[0]?.Age}</div>
            </div>
            <div class="single-data">
              <div className="property">Height:</div>
              <div className="value">{userData &&userData?.BasicsAndLifestyle[0]?.Height}</div>
            </div>
            <div class="single-data">
              <div className="property">Marital Status:</div>
              <div className="value">{userData &&userData?.BasicsAndLifestyle[0]?.MaritalStatus}</div>
            </div>
            <div class="single-data">
              <div className="property">Diet:</div>
              <div className="value">{userData &&userData?.otherDetails[0]?.Diet}</div>
            </div>
          </div>
          <div className="data-2">
            <div class="single-data">
              <div className="property">Religion:</div>
              <div className="value">{userData && userData?.ReligiousBackground[0]?.Religion}</div>
            </div>
            <div class="single-data">
              <div className="property">Community:</div>
              <div className="value">{userData &&userData?.ReligiousBackground[0]?.Community}</div>
            </div>
            <div class="single-data">
              <div className="property">Location:</div>
              <div className="value">{userData &&userData?.contactDetails[0]?.state}</div>
            </div>
            <div class="single-data">
              <div className="property">Mother Tongue:</div>
              <div className="value">{userData &&userData?.ReligiousBackground[0]?.MotherTongue}</div>
            </div>
            <div class="single-data">
              <div className="property">Profile Created by:</div>
              <div className="value">{userData &&userData?.otherDetails[0]?.Profilecreatedby}</div>
            </div>
          </div>
        </div>
        
        {/* <div className="preview">
          <a onClick={()=>{  history("/profile",{ state:{user:userData,recommendedUser:[]} })}}>Preview your profile</a>
        </div> */}
      </div>
    </div>
  );
}

export default ManageProfile;
