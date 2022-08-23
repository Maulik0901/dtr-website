import React from 'react';
import "./privacy.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion} from "react-bootstrap";


function PrivacyPolicy() {
    return (
        <div className='privacy'>
            <p>Your privacy is important to us, and so is being transparent about how we collect, use, and share information about you. This policy is intended to help you understand:</p>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>What information does dtrmatrimony.com collect from you?</Accordion.Header>
                    <Accordion.Body>
                        <p>dtrmatrimony.com is an advertising platform providing targeted advertising services for the purpose of matchmaking ("Service"). In order to do provide the services, we ask for certain personal information which is displayed on the site on behalf of you to find the perfect life partner. You hereby provide your consent to collect, process, and share of your personal information in order to provide the service.</p>
                        <h4>dtrmatrimony.com gathers following types of information:</h4>
                        <ol className='inner-most-list'>
                            <li>Information you submit; and</li>
                            <li>Information not directly submitted by the you</li>
                            <li>Information we receive from others</li>
                        </ol>
                        <ol className='inner-list'>
                            <li>
                                <h4>Information submitted by you</h4>
                                <p>In order to avail the service you provide the following information:-</p>
                                <ol className='inner-list'>
                                    <li>While registering for our service, you share with us your personal details, such as name, your gender, date of birth, contact details, educational qualification, employment details, photos, marital status and your interests etc...</li>
                                    <li>When you avail for a paid service, you provide us or our payment service provider with information, such as your debit or credit card number or UPI.</li>
                                    <li>Testimonials submitted by you including your success story and photos.</li>
                                    <li>Information submitted by you voluntarily while participating in surveys contest, promotions or events.</li>
                                    <li>Details shared with our customer care team. (This information used to monitor or for training purposes and to ensure a better service).</li>
                                    <li>You have the option to send interesting profiles/ articles to your friends. We will use your friend's email address only to send a one-time message to them per request. Then they will never ever hear from us again unless they voluntarily subscribe to our services.</li>
                                    <li>Your chats and messages with other users as well as the content you publish will be processed as a part of the service.</li>
                                </ol>
                            </li>
                            <li>
                                <h4>Information not directly submitted by you</h4>
                                <ol className='inner-list'>
                                    <li>
                                        <h5>User activity</h5>
                                        We collect information about your activity on our services, such as date and time you logged in, features you've been using, searches, clicks and pages visited by you, your interaction with other users including messages exchanged.
                                    </li>
                                    <li>
                                        <h5>Device Information</h5>
                                        We collect information from and about the device(s) such as IP address, device ID and type, device-specification and apps settings, app error reports, browser type and version, operating system, identifiers associated with cookies or other technologies that may uniquely identify your device or browser.
                                    </li>
                                    <li>
                                        <h5>SMS permission</h5>
                                        We need SMS permission for authenticating transactions via OTP, sent by the Payment Gateway.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h4>Information we receive from others</h4>
                                <p>In addition to the information you provide us directly, we receive information about you from others, such as:</p>
                                <ol className='inner-list'>
                                    <li>
                                        <h5>Social Media</h5>
                                        <p>You have an option to use your social media login (such as Facebook Login) to create and log into your dtrmatrimony.com account. This saves you from remembering one more login credentials and allows you to share some information from your social media account with us.</p>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>How we use information we collect?</Accordion.Header>
                    <Accordion.Body>
                        <p>We use the information collected in the following ways:</p>
                        <ol className='inner-list'>
                            <li>we use the information submitted by you to provide the Service.</li>
                            <li>manage your account</li>
                            <li>provide you with customer support</li>
                            <li>conduct research and analysis about your use of our services for providing better services</li>
                            <li>communicate with you by email, phone about services, promotions or offers that may be of your interest.</li>
                            <li>Recommend relevant matches to you and display your profile to other users.</li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>With whom does we share your information?</Accordion.Header>
                    <Accordion.Body>
                        <p>Except where you are expressly informed on the site or as described in this privacy policy we do not sell, rent, share, trade or give away any of your personal information.</p>
                        <ol className='inner-list'>
                            <li>
                                <h5>With other users</h5>
                                <p>we publish the information shared by you with other users to provide the services. The information so published are provided by you and be cautious as what you share with other users. You can always control your privacy setting by visiting the "setting/privacy option" page.</p>
                            </li>
                            <li>
                                <h5>With our service providers and partners</h5>
                                <p>We may use third party service providers to provide website and application development, hosting, maintenance, backup, storage, payment processing, analysis and other services for us, which may require them to access or use information about you. If a service provider needs to access information about you to perform services on our behalf, they do so under close instruction from us, including policies and procedures designed to protect your information. All of our service providers and partners agree to strict confidentiality obligations.</p>
                            </li>
                            <li>
                                <h5>With law enforcement agencies</h5>
                                <p>we will disclose your personally identifiable information as required by law and when we believe that disclosure is necessary to protect our rights, other members interest and protection and/or comply with a judicial proceeding, court order, or legal process served on our Web site.</p>
                            </li>
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>How to access and/or control your information?</Accordion.Header>
                    <Accordion.Body>
                        <p>You have been provided with tools to manage your information. You have the rights to access, rectify, update information that you provided to us and that's associated with your dtrmatrimony.com account directly by logging into your account.
                        </p>
                        <p>In addition to aforesaid privacy control, a member from EU have the following rights</p>
                        <ol className='inner-list'>
                            <li>Reviewing your information. Applicable privacy laws may give you the right to review the personal information we keep about you (depending on the jurisdiction, this may be called right of access, right of portability or variations of those terms). You can request a copy of your personal information by putting in such a request here.</li>
                            <li>If you believe that the information we hold about you, are no longer entitled to use it and you want to delete or object to its processing, please contact us here. Please note, however, we may need to retain certain information for record keeping purposes, to complete transactions or to comply with our legal obligations and applicable territorial laws.</li>
                            <li>If you wish to receive information relating to another user, such as a copy of any messages you received from him or her through our service, the other user will have to contact us and provide their written consent before the information is released.</li>
                            <li>conduct research and analysis about your use of our services for providing better services</li>
                            <li>You have the right to withdraw your consent from processing your information. Please note that by withdrawing your consent means, its deletion of your profile and we won't be able to provide further service to you.</li>
                        </ol>
                        <p>Also, we may not be able to accommodate certain requests to object to the processing of personal information, notably where such requests would not allow us to provide our service to you anymore. For instance, we cannot provide our service if we do not have your date of birth/gender/contact details.</p>
                        <p>For your protection and the protection of all our users, we may ask you to provide proof of identity to accommodate your requests.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>How we secure your information?</Accordion.Header>
                    <Accordion.Body>
                        <p>While we implement safeguards designed to protect your information, no security system is impenetrable and due to the inherent nature of the Internet, we cannot guarantee that data, during transmission through the Internet or while stored on our systems or otherwise in our care, is absolutely safe from intrusion by others.When our registration/order process asks you to enter sensitive information (such as a credit card number), such information is encrypted and is protected with the best encryption software in the industry. We follow generally accepted industry standards to protect the personal information submitted to us. All your information, not just the sensitive information mentioned above, is restricted in our offices. Only employees who need the information to perform a specific job are granted access to personally identifiable information.
                        </p>
                        <p>If you have any questions about the security at our website, please email us.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>How long we keep your information?</Accordion.Header>
                    <Accordion.Body>
                        <p>We keep your personal information only as long as you use our service and also as permitted/required by applicable law.In practice, we delete or anonymize your information upon deletion of your account, unless the same is required for to comply with legal obligations, fraud prevention, take actions we deem necessary to protect the integrity of our website or our users, to resolve disputes, to enforce our agreements, to support business operations, and to continue to develop and improve our Services. We retain information for better services, and we only use the information to analyse about the use of our Services, not to specifically analyse personal characteristics about you.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header>Cookies and other tracking Tools</Accordion.Header>
                    <Accordion.Body>
                        <p>We and our third-party partners, such as our advertising and analytics partners, use various technologies to collect information, such as cookies and web beacons etc. to identify you and your user behaviour. You may read our Cookies Policy for more information as why we use Cookies and how you can control their use, through your browser settings and other tools.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                    <Accordion.Header>How we transfer information we collect Internationally?</Accordion.Header>
                    <Accordion.Body>
                        <p>We collect information globally and primarily store that information in India and other jurisdiction. We may transfer, process and store your information outside of your country of residence, to wherever we or our third-party service providers operate for the purpose of providing you the Services. Information collected within the European Economic Area ("EEA") may, for example, be transferred to countries outside of the EEA for the purposes as described in this policy. Whenever we transfer your information, we take adequate steps to protect it and it is done with standard contractual data protection.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                    <Accordion.Header>How will I know of changes in dtrmatrimony.com privacy policy?</Accordion.Header>
                    <Accordion.Body>
                        <p>If we make a material change to our privacy policy, we will send an email communication about the update so you are always aware of what information we collect, how we use it, and under what circumstances, if any, we disclose it. If at any point we decide to use personally identifiable information in a manner materially different from that stated at the time it was collected, we will notify you by way of an email. We will give you a choice as to whether or not we can use information in this different manner and act accordingly.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9">
                    <Accordion.Header>Tell me how to contact dtrmatrimony.com</Accordion.Header>
                    <Accordion.Body>
                        <p>If you have any questions about this privacy statement, the practices of this site, or your dealings with this Web site, please email us or contact us at.</p>
                        <h5>dtrmatrimony.com</h5>
                        <address>
                        2/998,Mahakaliyamman Kovil Street, <br />
                        Muthugoundenpudur,Kurumbapalayam,<br />
                        Sulur,Coimbatore<br />
                        +91 9087757040
                        </address>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}


export default PrivacyPolicy;
