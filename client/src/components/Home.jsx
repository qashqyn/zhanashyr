import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, Button, Container, Card, Carousel, Row, Col, Image } from "react-bootstrap";

import '../styles/home.scss';

import FondsImg from '../images/home-fonds.png';
import KitapImg from '../images/home-kitap.png';
import VolunteerImg from '../images/home-volunteer.png';
import HandsImg from '../images/hands.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const handleChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }
    const search = (e) =>{
        e.preventDefault();
        navigate(`/fonds?search=${searchValue}`);
    }
    return (
        <div id="home">
            <div className="top">
                <img src={HandsImg} id="backgroundHands1" className="hands" alt="hands1"/>
                <img src={HandsImg} id="backgroundHands2" className="hands" alt="hands2"/>
                <div className="content">
                    <h1>Қайырымдылық қорларын іздеу қосымшасы</h1>
                    <Form onSubmit={search} className="search">
                        <Form.Control type="text" value={searchValue} placeholder="Қордың аты..." name="search" onChange={handleChange} />
                        <Button type="submit">
                            <FontAwesomeIcon icon={['fas', 'magnifying-glass']} size="lg" />
                        </Button>
                    </Form>
                    <p>
                        Мұнда Қазақстандағы қайырымдылық қорлары туралы ең басты ақпараттары. Сіз кімге көмектесуге, қалай көмектесуге және оны не үшін жасауға болатындығын таба аласыз.
                    </p>
                </div>
            </div>
            <Container>
                <h2>Қалай көмектессем болады?</h2>
                <p>Сізге сәйкес келетін көмек әдісін таңдаңыз</p>

                <Carousel>
                    <Carousel.Item>
                        <Card>
                            <Card.Body>
                                <Card.Title>Қайырымдылық жасаңыз</Card.Title>
                                <Row>
                                    <Col xs={7}>
                                        <Card.Text>
                                            Сізге жақын қорларды таңдаңыз және олардың пайдасына бір реттік немесе тұрақты қайырымдылық жасаңыз . Біз қайырымдылықтан пайыздар алмаймыз және тіпті аударым үшін комиссия төлемейміз - адресат сіздің ақшаңызды бір тиынға дейін алады.
                                        </Card.Text>
                                        <a href="/fonds">ФОНД ТАҢДАУ</a>
                                    </Col>
                                    <Col xs={4}>
                                        <Image src={FondsImg} />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card>
                            <Card.Body>
                                <Card.Title>Кітапты таңдап алыңыз</Card.Title>
                                <Row>
                                    <Col xs={7}>
                                        <Card.Text>
                                        Кітаптарды бізден сатып алыңыз , солай сіз жай ғана кітаптарды сатып ала қоймай , сіз біздің қайырымдылық қорына үлкен үлесіңізді қосасыңыз!
                                        </Card.Text>
                                        <a href="https://t.me/kitapal_1" target="_blank" rel="noopener noreferrer">Кітап таңдау</a>
                                    </Col>
                                    <Col xs={4}>
                                        <Image src={KitapImg} />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card>
                            <Card.Body>
                                <Card.Title>Волонтер бола аласыз</Card.Title>
                                <Row>
                                    <Col xs={7}>
                                        <Card.Text>
                                        Қайырымдылық акцияны сіз тек ақша беру арқылы көмекте аламын деп ойлайсыз ба?
                                        <br />
                                        Жоқ , сіз ерікті волонтер болып көмектесе аласыз
                                        </Card.Text>
                                        <a href="/volunteer">Волонтер болу</a>
                                    </Col>
                                    <Col xs={4}>
                                        <Image src={VolunteerImg} />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    );
};

export default Home;