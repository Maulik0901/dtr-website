import React, { useState } from "react";
import BasicInfo from "../EditModal/BasicInfo";
import EducationInfo from "../EditModal/educationInfo";
import FamilyInfo from "../EditModal/FamilyInfo";
import ReligiousModal from "../EditModal/ReligiousModal";
import LocationInfo from "../EditModal/LocationInfor";
import OtherInfo from "../EditModal/otherInfo";
import AboutEdit from "../EditModal/AboutEdit";
import AttachHoroscope from "./AttachHoroscope";
import ImageUpload from "./ImageUpload";
function About({ userData, getUserInfo }) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  return (
    <>
      <div className="about">
        <hr />
        <div>
          <a onClick={(e) => e.preventDefault()} href=" " className="about-him">
            About {userData?.name}
          </a>
          {/* <a href="/" style={{ paddingLeft: "10px" }}>Partner Preferences</a> */}
        </div>
        <br />
        <h3 className="about-title">
          Personality, Family Details, Career, Partner Expectations etc.{" "}
          <span
            style={{ cursor: "pointer", color: "black" }}
            onClick={() => setShow6(!show6)}
          >
            Edit
          </span>
        </h3>
        <div class="row row-acc-1">
          <p>{userData && userData?.BasicsAndLifestyle[0]?.about}</p>
        </div>
        <div className="titles">
          <h3 className="about-title">Basics & Lifestyle :</h3>
          <p onClick={() => setShow(!show)}>Edit</p>
        </div>

        <div class="row row-acc-1">
          <div className="data-1">
            <div class="single-data">
              <div className="property">Age:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.Age}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Date of Birth:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.DateofBirth}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Marital Status:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.MaritalStatus}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Height:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.Height}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Sun Sign:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.SunSign}
              </div>
            </div>
          </div>
          <div className="data-2">    
            <div class="single-data">
              <div className="property">Star:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.Stars}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Laknam:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.Laknam}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Thisai Iruppu:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.Irupu}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Blood Group:</div>
              <div className="value">
                {userData && userData?.BasicsAndLifestyle[0]?.BloodGroup}
              </div>
            </div>
          </div>
        </div>
        <div className="titles">
          <h3 className="about-title">Religious Background :</h3>
          <p onClick={() => setShow1(true)}>Edit</p>
        </div>
        <div class="row row-acc-1">
          <div className="data-1">
            <div class="single-data">
              <div className="property">Religion:</div>
              <div className="value">
                {userData && userData?.ReligiousBackground[0]?.Religion}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Community:</div>
              <div className="value">
                {userData && userData?.ReligiousBackground[0]?.Community}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Sub Community:</div>
              <div className="value">
                {userData && userData?.ReligiousBackground[0]?.SubCommunity}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Mother Tongue:</div>
              <div className="value">
                {userData && userData?.ReligiousBackground[0]?.MotherTongue}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Can Speak:</div>

              {userData &&
                userData?.ReligiousBackground[0]?.CanSpeak.map((e) => (
                  <div className="value">{e.name},</div>
                ))}
            </div>
          </div>
        </div>
        <div className="titles">
          <h3 className="about-title">Family details :</h3>
          <p onClick={() => setShow2(true)}>Edit</p>
        </div>

        <div class="row row-acc-1">
          <div className="data-1">
            <div class="single-data">
              <div className="property">Father's Name:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.FatherName}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Father's Status:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.FatherStatus}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Father's Occupassion:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.FatherOccupation}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Mother's Name:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.MotherName}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Mother's Status:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.MotherStatus}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Mothers's Occupassion:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.MotherOccupation}
              </div>
            </div>
          </div>
          <div className="data-2">
            <div class="single-data">
              <div className="property">No. of Brothers:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.NoofBrothers}
              </div>
            </div>
            <div class="single-data">
              <div className="property">No. of Sisters:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.NoofSisters}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Family Type:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.FamilyType}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Family Values:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.FamilyValues}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Family Class:</div>
              <div className="value">
                {userData && userData?.Familydetails[0]?.FamilyClass}
              </div>
            </div>
          </div>
        </div>
        <div className="titles">
          <h3 className="about-title">Education & Career :</h3>
          <p onClick={() => setShow3(true)}>Edit</p>
        </div>
        <div class="row row-acc-1">
          <div className="data-1">
            <div class="single-data">
              <div className="property">Highest Qualification:</div>
              <div className="value">
                {userData &&
                  userData?.EducationAndCareer[0]?.HighestQualification}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Professional Area:</div>
              <div className="value">
                {userData && userData?.EducationAndCareer[0]?.ProfessionalArea}
              </div>
            </div>
            {/* <div class="single-data">
              <div className="property">College(s) Attended:</div>
              <div className="value">VI Institute of technologies</div>
            </div> */}
            <div class="single-data">
              <div className="property">Annual Income:</div>
              <div className="value">
                {userData && userData?.EducationAndCareer[0]?.AnnualIncome}
              </div>
            </div>
          </div>
          <div className="data-2">
            <div class="single-data">
              <div className="property">Working As:</div>
              <div className="value">
                {userData && userData?.EducationAndCareer[0]?.WorkingAs}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Working With:</div>
              <div className="value">
                {userData && userData?.EducationAndCareer[0]?.WorkingWith}
              </div>
            </div>
            {/* <div class="single-data">
              <div className="property">Employer Name:</div>
              <div className="value">Infoston</div>
            </div> */}
          </div>
        </div>
        <div className="titles">
          <h3 className="about-title">Location :</h3>
          <p onClick={() => setShow4(true)}>Edit</p>
        </div>
        <div class="row row-acc-1">
          <div className="data-1">
            <div class="single-data">
              <div className="property">Country:</div>
              <div className="value">
                {userData && userData?.contactDetails[0]?.country}
              </div>
            </div>
            <div class="single-data">
              <div className="property">State:</div>
              <div className="value">
                {userData && userData?.contactDetails[0]?.state}
              </div>
            </div>
          </div>
          <div className="data-2">
            <div class="single-data">
              <div className="property">City:</div>
              <div className="value">
                {userData && userData?.contactDetails[0]?.city}
              </div>
            </div>
            <div class="single-data">
              <div className="property">Zip / Pin code:</div>
              <div className="value">
                {userData && userData?.contactDetails[0]?.zipCode}
              </div>
            </div>
            {/* <div class="single-data">
              <div className="property">Phone Number:</div>
              <div className="value">{userData && userData?.contactDetails[0]?.phoneNumber}</div>
            </div> */}
          </div>
        </div>
        {/* <div className="titles">
          <h3 className="about-title">Hobbies,Interests & more</h3>
          <p onClick={() => setShow5(true)}>Edit</p>

        </div>
        <div class="row row-acc-1">
          <div className="data-1">
            <div class="single-data">
              <div className="property">Hobbies:</div>
              <div className="value">{userData && userData?.HobbiesInterestsMore[0]?.Hobbies}</div>
            </div>
            <div class="single-data">
              <div className="property">Interests:</div>
              <div className="value">{userData && userData?.HobbiesInterestsMore[0]?.Interests}</div>
            </div>
            <div class="single-data">
              <div className="property">Favourite Music:</div>
              <div className="value">{userData && userData?.HobbiesInterestsMore[0]?.FavouriteMusic}</div>
            </div>
            <div class="single-data">
              <div className="property">Favourite Reads:</div>
              <div className="value">{userData && userData?.HobbiesInterestsMore[0]?.FavouriteReads}</div>
            </div>
          </div>
          <div className="data-2">
            <div class="single-data">
              <div className="property">preferred Movies:</div>
              <div className="value">{userData && userData?.HobbiesInterestsMore[0]?.preferredMovies}</div>
            </div>
            <div class="single-data">
              <div className="property">Sports / Fitness Activities:</div>
              <div className="value">{userData && userData?.HobbiesInterestsMore[0]?.SportsFitnessActivities}</div>
            </div>
            <div class="single-data">
              <div className="property">Favourite Cusisine:</div>
              <div className="value">{userData && userData?.HobbiesInterestsMore[0]?.FavouriteCusisine}</div>
            </div>
            <div class="single-data">
              <div className="property">Preferred Dress Style:</div>
              <div className="value">{userData && userData?.HobbiesInterestsMore[0]?.PreferredDressStyle}</div>
            </div>
          </div>
        </div> */}
        {/* <div className="preview">
          <a href="/">Back to Top</a>
        </div> */}
      </div>
      {show && (
        <BasicInfo
          setShow={setShow}
          show={show}
          userData={userData}
          getUserInfo={getUserInfo}
        />
      )}
      {show1 && (
        <ReligiousModal
          setShow={setShow1}
          show={show1}
          userData={userData}
          getUserInfo={getUserInfo}
        />
      )}
      {show2 && (
        <FamilyInfo
          setShow={setShow2}
          show={show2}
          userData={userData}
          getUserInfo={getUserInfo}
        />
      )}
      {show3 && (
        <EducationInfo
          setShow={setShow3}
          show={show3}
          userData={userData}
          getUserInfo={getUserInfo}
        />
      )}
      {show4 && (
        <LocationInfo
          setShow={setShow4}
          show={show4}
          userData={userData}
          getUserInfo={getUserInfo}
        />
      )}
      {show5 && (
        <OtherInfo
          setShow={setShow5}
          show={show5}
          userData={userData}
          getUserInfo={getUserInfo}
        />
      )}
      {show6 && (
        <AboutEdit
          setShow={setShow6}
          show={show6}
          userData={userData}
          getUserInfo={getUserInfo}
        />
      )}
      <div className="titles">
        <h3 className="about-title">Horoscope :</h3>
      </div>
      <AttachHoroscope getUserInfo={getUserInfo} id={userData?._id} horoscope={userData?.horoscope} />
      <ImageUpload/>
    </>
  );
}

export default About;
