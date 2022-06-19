import React from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import NoImg from '../../images/no-image.jpg';

import '../../styles/eventCard.scss';

const EventCard = ({event}) => {



    return(
        <LinkContainer to={`/events/${event.id}`}>
            <Card className="event-card">
                    <Card.Img src={event.img ? event.img : NoImg} variant="top" />
                    <Card.Body>
                        <Card.Subtitle>{event.reason}</Card.Subtitle>
                        <Card.Title><span>{event.firstname} {event.lastname}:</span> {event.title}</Card.Title>
                        <div className="cash">
                            <div>
                                <p>Жиналды</p>
                                <span>{event.amount ? event.amount : 0} ₸</span>
                            </div>
                            <div>
                                <p>Мақсат</p>
                                <span>{event.cashgoal === '0' ? `∞` : `${event.cashgoal} ₸`}</span>
                            </div>
                        </div>
                    </Card.Body>
            </Card>
        </LinkContainer>
    )
}

export default EventCard;