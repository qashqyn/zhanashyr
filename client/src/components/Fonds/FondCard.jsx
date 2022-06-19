import React from "react";
import { Card } from "react-bootstrap";

import "../../styles/fondCard.scss"
import NoImg from '../../images/no-image.jpg';
import { LinkContainer } from "react-router-bootstrap";

const FondCard = ({fond}) =>{
    return (
        <Card className="fond-card">
            <LinkContainer to={`/fonds/${fond.id}`}>
                <Card.Body>
                    <Card.Img src={fond.img ? fond.img : NoImg} variant="top" />
                    <Card.Title>{fond.title}</Card.Title>
                </Card.Body>
            </LinkContainer>
        </Card>
    );
};

export default FondCard;