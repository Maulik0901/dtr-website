import React from 'react';

function Contact({userData}) {
    return (
        <div className='contact'>
            <div>
                <h3 className='partner-heading'>My Contact Details</h3>
            </div>
            <div class="row row-acc-1">
                <div className='data-1'>
                    <div class="single-data">
                        <div className='property'>Country living in:</div>
                        <div className='value'>{userData?.contactDetails[0]?.Country}</div>
                    </div>
                    <div class="single-data">
                        <div className='property'>State living in:</div>
                        <div className='value'>{userData?.contactDetails[0]?.state}</div>
                    </div>
                    <div class="single-data">
                        <div className='property'>City / District:</div>
                        <div className='value'>{userData?.contactDetails[0]?.state}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
