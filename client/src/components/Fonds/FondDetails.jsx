import moment from "moment";
import React, { useEffect } from "react";
import { Col, Container, Form, Image, Nav, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDonationsByFondId } from "../../actions/donations";
import { getFondById } from "../../actions/fonds";

import '../../styles/fondDetails.scss';
import Donate from "../Donate";
import EventCard from "../Events/EventCard";

const FondDetails = () => {
    const {fond, isLoading, events, donations} = useSelector((state) => state.posts); 
    const { id } = useParams();    
    const dispatch = useDispatch();

    const profile = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getFondById(id));
        dispatch(getDonationsByFondId(id));
    }, [id, dispatch]);

    

    return (
        <div id="fond-details">
            <Container>
                {(isLoading || !fond) ? (
                    <div>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Row>
                        <Col xs={12} md={9} className="fond-details">
                            <div className="fond" id="about">
                                <div className="fond-location">
                                    {fond.location}
                                </div>
                                <div className="fond-image">
                                    <Image src={fond.img} />
                                </div>
                                <h1 className="fond-title">{fond.title}</h1>
                                <div className="description">
                                    {fond.description}
                                </div>
                                <a href="#help" className="help-btn">Көмек беру</a>
                            </div>
                            <div id="events">
                                <h2 className="heading" >Алымдар</h2>
                                {(profile && profile.user) && (
                                    <div className="create-event">
                                        <p>Бір теңге жұмсамай көмектесіңіз! Кез келген сәтті пайдаланыңыз және достарыңызды қайырымдылыққа ақша аударуға шақырыңыз. Туған күннен бастап сүйікті командаңыздың жеңісіне дейін кез келген оқиға қолайлы!</p>
                                        <a href={`/events/add?fond=${fond.id}`}>Алым жасау</a>
                                    </div>
                                )}
                                {!events ? (
                                    <div className="text-center p-5">
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Загрузка...</span>
                                        </Spinner>
                                    </div>
                                ) : (!!events && events.length>0) ? (
                                        <Row xs={1} lg={2}>
                                            {events.map((event) => (
                                                <Col key={event.id}>
                                                    <EventCard event={event} />
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : (
                                        <div className="text-center p-5">
                                            Алымдар жоқ
                                        </div>    
                                    )
                                }
                            </div>
                            <div id="donations">
                                    <h2>САДАҚАЛАР</h2>
                                    <div className="donations">

                                        {(donations && donations.length>0) ? (
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>ЕСІМІ</th>
                                                        <th>КҮНІ/УАҚЫТЫ</th>
                                                        <th>СОММА</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {donations.map((donation)=>(
                                                        <tr key={donation.id}>
                                                            <td>{donation.user ? `${donation.user.firstname} ${donation.user.lastname}` : 'Анонимно'}</td>
                                                            <td>{moment(donation.date).format('DD.MM.YYYY hh.mm')}</td>
                                                            <td>{donation.amount} ₸</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            ):(
                                                <div className="text-center">
                                                    Бірінші болып <a href="#help">садақа беріңіз</a> 
                                                </div>
                                            )}
                                    </div>
                                </div>
                            <Donate fondId={fond.id} fondname={fond.title} />
                        </Col>
                        <Col className="sidebar d-none d-md-block" xs={2}>
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link href="#about">Қор туралы</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#events">Алымдар</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#help">Көмек беру</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
        
}

export default FondDetails;