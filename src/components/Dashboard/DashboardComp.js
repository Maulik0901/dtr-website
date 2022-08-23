import React, { Component }  from 'react';
import React from 'react';
import './dashboard.css';
import { Card, ListGroup, ListGroupItem, Button, Container, Row, Col } from 'react-bootstrap';

function DashboardComp() {
    return (
        <div className='dashboard'>
            <Container>
                <Row>
                    <div className='col-md-4'>
                        <Card>
                            <div className='profile-photo-container'>
                                <Card.Img variant="top" className='profile-photo' src="https://img2.shaadi.com/imgs/profiles/150-no-border-male.gif" />
                            </div>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <div className='profile-name'>Prince</div>
                                    <div className='product-id'>SH95017392</div>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <div className='account-type-title'>Account Type</div>
                                    <div className='account-type'>Free Membership</div>
                                </ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='col-md-8'>
                        <h3 className='dashboard-title'>Your Activity Summary</h3>
                        <Container className='active-summary'>
                            <Row>
                                <Col>
                                    <h3>3</h3>
                                    <p>Pending Invitations</p>
                                </Col>
                                <Col className='active-summary-list'>
                                    <h3>0</h3>
                                    <p>No Accepted Invitations</p>
                                </Col>
                                <Col>
                                    <h3>50</h3>
                                    <p>Recent Visitors</p>
                                </Col>
                            </Row>
                        </Container>
                        <Container className='active-summary'>
                            <Row>
                                <Col>
                                    <p>Only Premium Members can avail these benefits</p>
                                </Col>
                                <Col className='active-summary-list'>
                                    <h3>0</h3>
                                    <p>Contact Viewed</p>
                                </Col>
                                <Col>
                                    <h3>0</h3>
                                    <p>Chats Initiated</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Row>
            </Container>

            <Container>

                <Row>
                    <div className='col-md-9'>
                        <h3 className='recent-visitor'>Recent Visitors</h3>
                        <Col>
                            <Card>
                                <div className='profile-photo-container'>
                                    <Card.Img variant="top" className='profile-photo' src="https://img2.shaadi.com/imgs/profiles/150-no-border-male.gif" />
                                </div>
                                <Card.Body>
                                    <Card.Text className='profile-details'>
                                        <h4>Sudha</h4>
                                        <p>28 yrs, 5'2' Tamil</p>
                                        <p>Hyderabad</p>
                                        <Button className='connect'>Connect Now</Button>
                                    </Card.Text>
                                   
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                    <div className='col-md-3'>
                        <h3 className='notification'>Notifications</h3>
                        <Card style={{ width: '18rem' }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                </Row>

            </Container>
        </div>
    );
}

export default DashboardComp;
