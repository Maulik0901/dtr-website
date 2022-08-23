import React from 'react';
import { useState } from 'react';
import ReligiousModal from "../EditModal/ReligiousModal"
import OtherInfo from '../EditModal/otherInfo';
import EducationInfo from '../EditModal/educationInfo';
import LocationInfo from '../EditModal/LocationInfor';
import BasicInfo from '../EditModal/BasicInfo';

function PartnerPreferences({userData}) {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    console.log(show,userData, "showshow")
    return (
        <>
            <div className='partner'>
                <div>
                    <h3 className='partner-heading'>Partner Preferences</h3>
                </div>
                <div className='titles'>
                    <h3 className='about-title'>Basic Info</h3>
                    <p onClick={() => setShow(!show)}>Edit</p>
                </div>
                <div class="row row-acc-1">
                    <div className='data-1'>
                        <div class="single-data">
                            <div className='property'>Age:</div>
                            <div className='value'>{userData?.BasicInfo[0]?.Height}</div>
                        </div>
                        <div class="single-data">
                            <div className='property'>Height:</div>
                            <div className='value'>{userData?.BasicInfo[0]?.Height}</div>
                        </div>
                        <div class="single-data">
                            <div className='property'>Religion / Community:</div>
                            <div className='value'>{userData?.BasicInfo[0]?.Religion}</div>
                        </div>
                    </div>
                    <div className='data-2'>
                        <div class="single-data">
                            <div className='property'>Mother tongue:</div>
                            <div className='value'>{userData?.BasicInfo[0]?.Mothertongue}</div>
                        </div>
                        <div class="single-data">
                            <div className='property'>Marital Status:</div>
                            <div className='value'>{userData?.BasicInfo[0]?.MaritalStatus}</div>
                        </div>
                    </div>
                </div>
                <div className='titles'>
                    <h3 className='about-title'>Location Details</h3>
                    <p onClick={() => setShow3(true)}>Edit</p>
                </div>
                <div class="row row-acc-1">
                    <div className='data-1'>
                        <div class="single-data">
                            <div className='property'>Country living in:</div>
                            <div className='value'>India</div>
                        </div>
                        <div class="single-data">
                            <div className='property'>State living in:</div>
                            <div className='value'>kartnataka</div>
                        </div>
                        <div class="single-data">
                            <div className='property'>City / District:</div>
                            <div className='value'>Doesnt matter</div>
                        </div>
                    </div>
                </div>
                <div className='titles'>
                    <h3 className='about-title'>Education & Career</h3>
                    <p onClick={() => setShow2(true)}>Edit</p>
                </div>
                <div class="row row-acc-1">
                    <div className='data-1'>
                        <div class="single-data">
                            <div className='property'>Highest Qualification:</div>
                            <div className='value'>{userData?.EducationAndCareer[0]?.HighestQualification}</div>
                        </div>
                        <div class="single-data">
                            <div className='property'>Working with:</div>
                            <div className='value'>{userData?.EducationAndCareer[0]?.HighestQualification}</div>
                        </div>
                        <div class="single-data">
                            <div className='property'>Professional area:</div>
                            <div className='value'>{userData?.EducationAndCareer[0]?.HighestQualification}</div>
                        </div>
                    </div>
                    <div className='data-2'>
                        <div class="single-data">
                            <div className='property'>Working as</div>
                            <div className='value'>{userData?.EducationAndCareer[0]?.WorkingAs}</div>
                        </div>
                        <div className='property'>Annual Income:</div>
                        <div className='value'>{userData?.EducationAndCareer[0]?.AnnualIncome}</div>

                    </div>
                </div>
                <div className='titles'>
                    <h3 className='about-title'>Other Details</h3>
                    <p onClick={() => setShow1(true)}>Edit</p>
                </div>
                <div class="row row-acc-1">
                    <div className='data-1'>
                        <div class="single-data">
                            <div className='property'>Profile created by:</div>
                            <div className='value'>Doesnt matter</div>
                        </div>
                    </div>
                    <div className='data-2'>
                        <div class="single-data">
                            <div className='property'>Diet</div>
                            <div className='value'>Doesnt matter</div>
                        </div>
                    </div>
                </div>
            </div>
            {show && <ReligiousModal setShow={setShow} show={show} />}
            {show1 && <OtherInfo setShow={setShow1} show={show1} />}
            {show2 && <EducationInfo setShow={setShow2} show={show2} />}
            {show3 && <LocationInfo setShow={setShow3} show={show3} />}
            {show4 && <BasicInfo setShow={setShow4} show={show4} />}
        </>
    );
}

export default PartnerPreferences;
