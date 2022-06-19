import React from "react";
import { Button, Col, Container, Form, Image, Nav, Navbar, Row, Modal } from "react-bootstrap";

import '../styles/partners.scss';

import PartnersIMG from '../images/partners.png';
import { useDispatch } from "react-redux";
import { CLEAR_STATUS } from "../constants/actionTypes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { sendRequest } from "../actions/form";


const Partners = () => {
    const dispatch = useDispatch();
    const {request_status} = useSelector((state) => state.posts);
    const [formData, setFormData] = useState({});

    const [show, setShow] = useState(false);
    const [modalText, setModalText] = useState({title: '', text: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendRequest(formData));
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        if(request_status){
            switch(request_status){
                case 200:
                    setModalText({title: 'Сәттілік', text: 'Сіздің өтінішініз, сәтті түрде жеткізілді. Жауап электронды почтанызға жіберіледі.'});
                    setShow(true);
                    break;
                default:
                    setModalText({title: 'Қате', text: 'Қателік пайда болды. Әрекетті кейінірек қайталаунызды сураймыз.'});
                    setShow(true);
                    break;
            }
        }
    }, [request_status]);

    const closeModal = () => {
        setShow(false);
        dispatch({type: CLEAR_STATUS});
    }
    return (
        <div id="partners">
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalText.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalText.text}</p>
                </Modal.Body>
            </Modal>
            <div className="top">
                <Container>
                    <Row>
                        <Col xs={12} md={7}>
                            <div className="d-flex">
                                <div className="content">
                                    <h1><strong>"ЖанАшыр"</strong> қоры - әлеуметтік мәселелерді жүйелі шешуде бизнес үшін сенімді серіктес</h1>
                                    <p>Біз бизнеске өз сараптамамызды және қайырымдылықпен және корпоративтік-әлеуметтік жауапкершілікпен байланысты кез келген міндеттерді шешуге және жобаларды ұйымдастыруға арналған құралдарды ұсынамыз.</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={5} className="d-none d-md-block">
                            <Image src={PartnersIMG} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div id="scrollspy">
                <Navbar id="navspy">
                    <Nav>
                        <Nav.Link href="#partnerships">Серіктестіктерге</Nav.Link>
                        {/* <Nav.Link href="#feedback">Пікірлер</Nav.Link> */}
                        <Nav.Link href="#application">Өтінішті жолдау</Nav.Link>
                    </Nav>
                </Navbar>
                <Container>
                    <div data-spy="scroll" data-target="#navspy" data-offset="0">
                        <div id="partnerships">
                            <h3>Серіктестіктерге</h3>
                            <Row>
                                <Col xs={12} md={8}>
                                    <ul>
                                        <li>
                                            <h6>Тексерілген қорлар каталогы</h6>
                                            <p>Біздің платформада Қазақстанның түкпір — түкпірінен Шығыстан Батысқа дейін көптеген коммерциялық немесе коммерциялық емес ұйымдарды тіркейміз. Олардың барлығын біздің сарапшылар тексерді. Біз бұл ұйымдардың адал жұмыс істейтініне кепілдік береміз. Біздің басты мақсатымыз барынша талаптарға сай болуы, ал олардың жұмысы тиімді болуы. Сондықтан біз тексеруге көп көңіл бөліп қана қоймай, сонымен қатар қорларға осы өлшемдерге сәйкес келуге көмектесеміз, жұмысты жақсарту, оқыту және ағарту бойынша ұсыныстар береміз.</p>
                                            {/* <Button>Тіркелу</Button> */}
                                        </li>
                                        <li>
                                            <h6>Серіктестіктер Алым(Сбор) аша алады.</h6>
                                            <p>Біздің тағы бір жобаларымыздың бірі - "Алым ашу". Соның ішінде сіз кез-келген мұқтаж жандарға алымды өзіңіз аша аласыз.Солай көмекті жан-жақтан тез жинап алуға мүмкіндігіңіз бар.</p>
                                            {/* <Button>Алым ашу</Button> */}
                                        </li>
                                    </ul>
                                </Col>
                                <Col xs={4} className="d-none d-md-block"></Col>
                            </Row>
                        </div>
                        {/* <div id="feedback">
                            <h3>Пікірлер</h3>
                            <div>

                            </div>
                        </div> */}
                        <div id="application">
                            <Form className="my-3" onSubmit={handleSubmit}>
                                <div className="heading">
                                    <h3>Өтініш жіберіңіз</h3>
                                    <p>Біз екі жұмыс күні ішінде сізге электрондық пошта арқылы хабарласамыз.</p>
                                </div>
                                <Row xs={1} md={2}>
                                    <Col>
                                        <Form.Group className="form-group">
                                            <Form.Label>Ұйымның атауы</Form.Label>
                                            <Form.Control type="text" name="fondName" required onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="form-group">
                                            <Form.Label>Байланысушы тұлға, лауазымы</Form.Label>
                                            <Form.Control type="text" name="personInfo" required onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="form-group">
                                            <Form.Label>Электрондық пошта</Form.Label>
                                            <Form.Control type="email" name="email" required onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="form-group">
                                            <Form.Label>Ұялы телефон</Form.Label>
                                            <Form.Control type="text" name="phoneNumber" required onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="form-group">
                                    <Form.Label>Напишите ваш запрос</Form.Label>
                                    <Form.Control as="textarea"  name="message" required onChange={handleChange}/>
                                </Form.Group>
                                <Form.Check type="checkbox" required label="Дербес деректерді өңдеуге келісім беремін" id="check" />
                                <Button type="submit">Өтінішті жіберу</Button>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Partners;