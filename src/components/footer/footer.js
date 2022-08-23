import React from 'react'
import './footer.css'
import {Link} from 'react-router-dom';
import footLogo from "../../Assets/images/logo.png"

export default function Footer() {
    return (
        <div>
            <div className='footer'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-3 col-md-6'>
                        <img src={footLogo} alt="footer-log" style={{width:'250px'}} />
                        <p className='about-dtr'>A best matrimonial company in Coimbatore focused to provide most genuine & selectivity choosen mactches to every individuals's preferences and suitablity
                        </p>
                    </div>
                    <div className='col-lg-3 col-md-6 custom'>
                        <h2>Customer Service</h2>
                        {/* <Link to=''>About Us</Link>
                <Link to='contact-us'>Contact Us</Link> */}
                <Link to='terms-of-use'>Terms & Conditions</Link>
                <Link to='privacy-policy'>Privacy Policy</Link>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <h2>Head Office</h2>
                        <address>
                        2/998,Mahakaliyamman Kovil Street, <br/>
                        Muthugoundenpudur,Kurumbapalayam, <br />
                        Sulur,Coimbatore <br />
                        Mobile : 9087757040
                        </address>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <h2>Online Office</h2>
                        <address>
                        P.V.S COMPLEX, <br/>
                        Near TMB Bank, <br />
                        Sattur <br />
                        Mobile: 9087757041,7695992941
                        </address>
                        <address>
                        B.K.Puram, <br/>
                        Konampatti (Po),<br />
                        Theni(Dt)<br />
                        Mobile: 9087757042
                        </address>
                    </div>
                </div>
            </div>
            </div>

            <div className='secondary'>
                <div>© 2022 DTRmatrimony.com, The South India's Leading Matchmaking Service™</div>
                <div>Designed and Developed by <a href="http://infoston.com/" className="infoston-site" target="_blank">Infoston Technologies</a></div>
            </div>
        </div>
    )
}
