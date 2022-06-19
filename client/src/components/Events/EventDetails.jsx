import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventById } from "../../actions/events";
import { Container, Spinner, Image, Row, Col, Nav, Table } from "react-bootstrap";

import '../../styles/eventDetails.scss';
import moment from "moment";
import Donate from "../Donate";
import { getDonationsByEventId } from "../../actions/donations";
import { useState } from "react";

const EventDetails = () => {
    const { id } = useParams();    
    const {event, isLoading, donations} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const now = new Date();

    useEffect(()=>{
        dispatch(getEventById(id));
        dispatch(getDonationsByEventId(id));
    }, [id, dispatch]);

    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if(donations){
            let amount = 0;

            for (let index = 0; index < donations.length; index++) {
                const donation = donations[index];
                amount+= donation.amount;
            }

            setAmount(amount);
        }
    }, [donations]);


    return (
        <Container id="eventDetails">
            {(isLoading || !event) ? (
                <div>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div id="event">
                    <div id="eventheading">
                        <Image id="eventimg" src={event.img} />
                        <h1><span>{event.firstname} {event.lastname}:</span> {event.title}</h1>
                    </div>
                    <Row>
                        <Col xs={12} lg={9}>
                            <div className="inner">
                                <div className="eventinfo">
                                    <div className="fond">
                                        <div className="fondimg">
                                            <Image src={event.fond.img} />
                                        </div>
                                        <div className="fondinfo">
                                            <p>Бұл қайырымдылық қаражат жинау шарасы. Барлық қайырымдылықтар "<a href={`/fonds/${event.fond.id}`}>{event.fond.title}</a>"  ұйымына жіберіледі</p>
                                            <a href="#help" className="help-btn">Көмек беру</a>
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <p>Алым күйі</p>
                                            <p>{(moment(event.date) > moment(now) ? 'Қаражат жинау жүріп жатыр' : 'Жинақ аяқталды')}</p>
                                        </div>
                                        <div className="field">
                                            <p>Себебі</p>
                                            <p>{event.reason}</p>
                                        </div>
                                        <div className="field">
                                            <p>Алым күні</p>
                                            <p>{moment(event.start_date).format('DD.MM.YYYY')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="description">
                                    <h2>СИПАТЫ</h2>
                                    <div className="description">
                                        <div className="heading">
                                            <div className="author">
                                                <div className="username">
                                                    <p>{event.firstname} {event.lastname}</p>
                                                    <span>Алымның авторы</span>
                                                </div>
                                                <div className="date">
                                                    <span>
                                                        {moment(event.created_date).format('HH:mm, DD.MM.YYYY')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p>
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
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
                                <Donate fondId={event.fond.id} eventId={event.id} fondname={event.fond.title} />
                            </div>
                        </Col>
                        <Col className="sidebar d-none d-lg-block" lg={3} >
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link>
                                        <p>Жиналды</p>
                                        <span>{amount} ₸</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link>
                                        <p>Мақсат</p>
                                        <span>{event.cashgoal === '0' ? `∞` : `${event.cashgoal} ₸`}</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link>
                                        <p>Садақа саны</p>
                                        <span>{donations ? donations.length : 0}</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#help">Көмек беру</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
}

export default EventDetails;