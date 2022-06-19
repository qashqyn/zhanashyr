import React from "react";
import { useEffect } from "react";
import { Container, Row, Spinner, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEvents } from "../../actions/events";
import EventCard from "./EventCard";

import '../../styles/events.scss';

const Events = () => {
    const {isLoading, events} = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <Container id="events" >
            <h1>Танымал алымдар</h1>

            <div className="events mt-3 mb-3">
            {(isLoading || !events) ? (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : ((!!events && events.length > 0) ? (
                    <>
                        <Row xs={1} md={2} lg={3}>
                            {events.map((event) => (
                                <Col key={event.id}>
                                    <EventCard event={event} />
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <>
                        <div className="text-center p-5"> 
                            Алымдар жоқ
                        </div>
                    </>
                )

            )}
            </div>
        </Container>
    );
}

export default Events;