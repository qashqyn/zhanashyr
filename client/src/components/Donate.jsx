import React from "react";
import { useDispatch } from "react-redux";
import {Form, Row, Col, Button, Modal} from 'react-bootstrap';

import '../styles/donate.scss';
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { donate } from "../actions/donations";
import { CLEAR_STATUS } from "../constants/actionTypes";

const initialErrors = {type: '', amount: '', cart_number: '', til: '', cart_user: '', cvv: '', firstname: '', lastname: '', phone: '', email: '', term: ''};
const initialState = {type: 'monthly', amount: '100', cart_number: '', til: '', cart_user: '', cvv: '', firstname: '', lastname: '', phone: '', email: ''};

const Donate = ({fondId, eventId, fondname}) => {
    const dispatch = useDispatch();
    const [steps, setSteps] = useState({first: false});
    const [terms, setTerm] = useState({first: false, second: false});
    const [formData, setFormData] = useState(initialState);
    const [formError, setFormError] = useState(initialErrors);

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

    const {donate_status} = useSelector((state) => state.posts);

    useEffect(()=>{
        if(profile && profile.user){
            const firstname = profile.user.firstname ? profile.user.firstname : formData.firstname;
            const lastname = profile.user.lastname ? profile.user.lastname : formData.lastname;
            const email = profile.user.email ? profile.user.email : formData.email;
            const phone = profile.user.phone ? profile.user.phone : formData.phone;
            setFormData({...formData, firstname: firstname, lastname: lastname, email: email, phone: phone});
        }
    }, [profile]);

    const [show, setShow] = useState(false);

    useEffect(()=>{
        if(donate_status){
            switch(donate_status){
                case 200:
                    setShow(true);
                    break;
            }
        }
    }, [donate_status]);
    
    const closeModal = () => {setShow(false); clear(); dispatch({type: CLEAR_STATUS})};

    const clear = () => {
        let firstname = '';
        let lastname = '';
        let email = '';
        let phone = '';

        if(profile && profile.user){
            firstname = profile.user.firstname ? profile.user.firstname : '';
            lastname = profile.user.lastname ? profile.user.lastname : '';
            email = profile.user.email ? profile.user.email : '';
            phone = profile.user.phone ? profile.user.phone : '';
        }

        setFormData({...initialState, firstname: firstname, lastname: lastname, email: email, phone: phone});
        setFormError(initialErrors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errCnt = 0;
        let errs = {cart_number: '', til: '', cart_user: '', cvv: '', firstname: '', lastname: '', phone: '', email: '', term: ''};

        if(formData.cart_number.length < 19){
            errCnt++;
            errs.cart_number = 'Карта номерін енгізіңіз';
        }
        if(formData.cvv.length < 3){
            errCnt++;
            errs.cvv = 'CVV енгізіңіз';
        }
        if(!formData.cart_user){
            errCnt++;
            errs.cart_user = 'Карта иесін енгізіңіз';
        }
        if(formData.til.length < 5){
            errCnt++;
            errs.til = 'Жарамдылық мерзімің енгізіңіз';
        }

        if(!formData.firstname){
            errCnt++;
            errs.firstname = 'Атынызды енгізіңіз';
        }
        if(!formData.lastname){
            errCnt++;
            errs.lastname = 'Тегінізді енгізіңіз';
        }
        if(formData.phone.length < 15){
            errCnt++;
            errs.phone = 'Телефон номерінізді енгізіңіз';
        }
        const regex = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if((formData.email && !regex.test(formData.email)) || !formData.email){
            errCnt++;
            errs.email = 'Почтанызды енгізіңіз';
        }

        if(!terms.first || !terms.second){
            errCnt++;
            errs.term = 'Карта иесін енгізіңіз';
        }

        setFormError(errs);

        if(errCnt === 0){
            if(profile && profile.user && profile.user.id){
                dispatch(donate(formData, fondId, eventId, profile.user.id));
            }else{
                dispatch(donate(formData, fondId, eventId, null));
            }
        }

    }

    

    const handleChange = (e) => {
        // e.preventDefault();
        setFormError({...formError, [e.target.name]: ''});
        let value = e.target.value;
        switch(e.target.name){
            case 'cart_number':
                value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
                break;
            case 'cart_user':
                if(value.indexOf(' ') === 0 || value.indexOf(' ') !== value.length-1){
                    value = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase().trim();
                }else{
                    value = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
                }
                break;
            case 'cvv':
                value = value.replace(/\D/, '').trim().substring(0,3);
                break;
            case 'phone':
                value = value.replace(/\D/g, '');
                switch(value.length){
                    case 0: value = ''; break;
                    case 1: value = '+' + value; break;
                    case 2: case 3: case 4: value = '+' + value.substring(0,1) + " " + value.substring(1,4); break;
                    case 5: case 6: case 7: value = "+" + value.substring(0,1) + " " + value.substring(1,4) + " " + value.substring(4,7); break;    
                    default: value = "+" + value.substring(0,1) + " " + value.substring(1,4) + " " + value.substring(4,7) + " " + value.substring(7,11); break
                }
                break;
            case 'til':
                value = value.replace(/\D/g, '').trim();
                if((value.length === 1 && Number(value) > 1))
                    value = '0' + value + '/';
                else if(value.length === 2 && value === '00')
                    value = '01/';
                else if(value.length === 2 && Number(value) > 12)
                    value = '12/';
                else if(value.length > 1)
                    value = value.substring(0,2) + '/' + value.substring(2,4);
                break;
        }
        setFormData({...formData, [e.target.name]: value});
    }

    const handleTilChange = (e) =>{
        if(e.key === 'Backspace' && e.target.value.length === 3){
            setFormData({...formData, til: e.target.value.substring(0, 2)});
        }
    }

    const checkFirstStep = (e) => {
        e.preventDefault();
        if(formData.type && formData.amount){
            setSteps({...steps, first: true});
        }
    } 

    return (
        <div id="help">
            <Modal show={show} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Төлем өтті</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Қолдағаныныз үшін, үлкен рахмет!</p>
                </Modal.Body>
            </Modal>
            <div className="content">
                <h1>Көмек беру</h1>
                <p>"{fondname}" қорына көмек берініз</p>
                <Form className="form" onSubmit={handleSubmit}>
                    <h5>Қайырымдылық түрі мен мөлшерін таңдаңыз</h5>
                    <Form.Group className="form-group">
                        <Row xs={2}>
                            <Col><Form.Check type="radio" name="type" checked={formData.type === 'monthly'} id="monthlyDonation" value="monthly" label="Ай сайын қайымдылық садақасын беру" onChange={handleChange} /></Col>
                            <Col><Form.Check type="radio" name="type" checked={formData.type === 'permanent'} id="permanentDonation" value="permanent" label="Бір рет қайымдылық садақасын беру" onChange={handleChange}/></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Row>
                            <Col xs={3}><Form.Check type="radio" name="amount" id="amount100" value="100" label="100₸" checked={formData.amount === '100'} onChange={handleChange} /></Col>
                            <Col xs={3}><Form.Check type="radio" name="amount" id="amount500" value="500" label="500₸" checked={formData.amount === '500'} onChange={handleChange} /></Col>
                            <Col xs={3}><Form.Check type="radio" name="amount" id="amount1000" value="1000" label="1 000₸" checked={formData.amount === '1000'} onChange={handleChange} /></Col>
                            <Col xs={3}><Form.Check type="radio" name="amount" id="amount3000" value="3000" label="3 000₸" checked={formData.amount === '3000'} onChange={handleChange} /></Col>
                            <Col xs={3}><Form.Check type="radio" name="amount" id="amount5000" value="5000" label="5 000₸" checked={formData.amount === '5000'} onChange={handleChange} /></Col>
                            <Col xs={3}><Form.Check type="radio" name="amount" id="amount10000" value="10000" label="10 000₸" checked={formData.amount === '10000'} onChange={handleChange} /></Col>
                            <Col xs={6}></Col>
                        </Row>
                    </Form.Group>
                    {!steps.first && (
                        <Button onClick={checkFirstStep} >Төлемге өту</Button>
                    )}
                    {steps.first && (
                        <>
                            <h5>Банк картаңыздың мәліметтерін енгізіңіз</h5>
                            <div className="bankcard">
                                <Row>
                                    <Col xs={8}>
                                        <Form.Group>
                                            <Form.Label>Карта номері</Form.Label>
                                            <Form.Control type="text" name="cart_number" value={formData.cart_number} onChange={handleChange} isInvalid={formError.cart_number} />
                                            <Form.Control.Feedback type="invalid">{formError.cart_number}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group>
                                            <Form.Label>Дейін жарамды</Form.Label>
                                            <Form.Control type="text" name="til" placeholder="АЙ/ЖЫЛ" value={formData.til} onKeyUp={handleTilChange} onChange={handleChange} isInvalid={formError.til} />
                                            <Form.Control.Feedback type="invalid">{formError.til}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Group>
                                            <Form.Label>Карта иесі</Form.Label>
                                            <Form.Control type="text" name="cart_user" value={formData.cart_user} onChange={handleChange} isInvalid={formError.cart_user} />
                                            <Form.Control.Feedback type="invalid">{formError.cart_user}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group>
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control type="text" name="cvv" value={formData.cvv} onChange={handleChange} isInvalid={formError.cvv} />
                                            <Form.Control.Feedback type="invalid">{formError.cvv}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className="userinfo">
                                <Row xs={1} lg={2}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Аты</Form.Label>
                                            <Form.Control disabled={profile && profile.user && profile.user.firstname}  type="text" name="firstname" value={formData.firstname} onChange={handleChange} isInvalid={formError.firstname} />
                                            <Form.Control.Feedback type="invalid">{formError.firstname}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Тегі</Form.Label>
                                            <Form.Control disabled={profile && profile.user && profile.user.lastname} type="text" name="lastname" value={formData.lastname} onChange={handleChange} isInvalid={formError.lastname} />
                                            <Form.Control.Feedback type="invalid">{formError.lastname}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Телефон</Form.Label>
                                            <Form.Control disabled={profile && profile.user && profile.user.phone} type="text" name="phone" value={formData.phone} onChange={handleChange} isInvalid={formError.phone} />
                                            <Form.Control.Feedback type="invalid">{formError.phone}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Почта</Form.Label>
                                            <Form.Control disabled={profile && profile.user && profile.user.email} type="text" name="email" value={formData.email} onChange={handleChange} isInvalid={formError.email} />
                                            <Form.Control.Feedback type="invalid">{formError.email}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <Form.Group className="form-group">
                                <div className="terms">
                                    <label>
                                        <Form.Check isInvalid={!terms.first && formError.term} onChange={(e)=>{terms.first=e.target.checked}} /> Мен ұсыныспен келісемін
                                    </label>
                                    <label>
                                        <Form.Check isInvalid={!terms.second && formError.term} onChange={(e)=>{terms.second=e.target.checked}} /> Мен жеке деректерді өңдеу саясатымен келісемін
                                    </label>
                                    <Form.Control hidden isInvalid={!!formError.term} />
                                    <Form.Control.Feedback type="invalid">{formError.term}</Form.Control.Feedback>
                                </div>
                            </Form.Group>
                            <Button type="submit">Садақа беру</Button>
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default Donate;