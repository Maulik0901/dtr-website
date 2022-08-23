import React from 'react';
import './profile.css'
import About from './About';

function Profile() {
    return (
        <div className='profile'>
            <div className='name'>
                <h3>Prince (SH95017392)</h3>
            </div>
            <div className='manage-profile'>
                <div className='upload-photo'>
                    <form>
                        <input type="file" id="myfile" name="myfile" />
                    </form>
                </div>
                <div className='user-details'>
                    <div class="row row-acc-1">
                        <div className='data-1'>
                            <div class="single-data">
                                <div className='property'>Age / Height:</div>
                                <div className='value'>29 / 5'9"</div>
                            </div>
                            <div class="single-data">
                                <div className='property'>Marital Status:</div>
                                <div className='value'>Never Married</div>
                            </div>
                            <div class="single-data">
                                <div className='property'>Posted by:</div>
                                <div className='value'>Sibling</div>
                            </div>
                        </div>
                        <div className='data-2'>
                            <div class="single-data">
                                <div className='property'>Religion / Community:</div>
                                <div className='value'>Christian, Protestant</div>
                            </div>
                            <div class="single-data">
                                <div className='property'>Location:</div>
                                <div className='value'>Virudhunagar</div>
                            </div>
                            <div class="single-data">
                                <div className='property'>Mother Tongue:</div>
                                <div className='value'>Tamil</div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-acc-2">
                        <h3 className='manage-title'>Manage your Profile</h3>
                        <div className='manage-row'>
                            <div className="row-1">
                                <ul>
                                    <li><a href=''>Edit Personal Profile</a></li>
                                    <li><a href=''>Edit Partner Profile</a></li>
                                    <li><a href=''>Edit Contact Details</a></li>
                                </ul>
                            </div>
                            <div className='row-2'>
                                <ul>
                                    <li><a href=''>View Profile Stats</a></li>
                                    <li><a href=''>Add Photos</a></li>
                                    <li><a href=''>Hobbies & Interests</a></li>
                                </ul>
                            </div>
                            <div className='row-3'>
                                <ul>
                                    <li><a href=''>Set Contact Filters</a></li>
                                    <li><a href=''>Hide / Delete Profile</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='preview'>
                        <a href=''>Preview your profile</a>
                    </div>
                </div>
            </div>

            <About />

        </div>
    )

}

export default Profile;
