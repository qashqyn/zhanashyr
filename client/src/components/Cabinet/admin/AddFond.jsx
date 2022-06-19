import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createFond, getFondById, updateFond } from "../../../actions/fonds";
import { CLEAR_STATUS } from "../../../constants/actionTypes";

import '../styles/addfond.scss';

const initialData = {title: '', description: '', location: '', category: '', img: ''};

const locations = ["Алматы", "Нұр-Сұлтан", "Шымкент", "Ақтөбе", "Қарағанды", "Тараз", "Павлодап", "Семей", "Өскемен", "Қызылорда", "Орал", "Қостанай", "Атырау", "Петропавл", "Ақтау", "Көкшетау", "Талдықорған"];
const categories = ['Барлығына','Ересектерге','Балаларға','Әйелдерге','Жануарлар','Қоғамға','Жасөспірімдерге','Қарттарға','Отбасыларға','Экологияға'];

const AddFond = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState(initialData);
    const [formError, setFormError] = useState(initialData);

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();

    const {fond_status, fond} = useSelector((state) => state.posts);
    const [show, setShow] = useState(false);
    const closeModal = () => {setShow(false); clear(); dispatch({type: CLEAR_STATUS}); if(fond) navigate(-1); };

    useEffect(()=>{
        if(searchParams){
            let fondId = searchParams.get('fondId');
            if(fondId)
                dispatch(getFondById(fondId));
        }
    }, [searchParams]);

    useEffect(()=>{
        if(profile && profile.user && !profile.user._admin){
            navigate(-1);
        }
    }, [profile])

    useEffect(()=>{
        if(fond_status){
            switch(fond_status){
                case 200:
                    setShow(true);
                    break;
            }
        }
    }, [fond_status]);

    useEffect(() => {
        if(searchParams && searchParams.get('fondId') && fond){
            setFormData(fond);
        }
    }, [fond]);

    const clear = () => {
        setFormData(initialData);
        setFormError(initialData);
    }


    const handleChange = (e) =>{
        if(e.target.name === 'category'){
            let categories = [];
            if(formData.category.length > 0)
                categories = formData.category.split(',');
            if(e.target.checked)
                categories.push(e.target.value);
            else{
                if(categories.includes(e.target.value)){
                    categories.splice(categories.indexOf(e.target.value), 1);
                }
            }
            setFormData({...formData, category: categories.join(',')})
        }else{
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }
    const handleImage = async (e) =>{
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFormData({...formData, [e.target.name]: base64});
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errCnt = 0;
        let errs = {title: '', description: '', location: '', category: '', img: ''};

        if(!formData.title){
            errCnt++;
            errs.title = 'Қор атауың енгізіңіз';
        }
        if(!formData.description){
            errCnt++;
            errs.description = 'Қор жайлы мағлұмат енгізіңіз';
        }
        if(!formData.location){
            errCnt++;
            errs.location = 'Орналасқан қаланы таңданыз';
        }
        if(!formData.category){
            errCnt++;
            errs.category= 'Кімге арналғанын таңданыз';
        }
        if(!formData.img){
            errCnt++;
            errs.img = 'Қор суретін таңданыз';
        }

        setFormError(errs);
        if(errCnt === 0){
            if(fond && fond.id)
                dispatch(updateFond(formData));
            else
                dispatch(createFond(formData));
        }

    };
    return (
        <div id="addfond">
            <Modal show={show} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Сәттілік</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {fond ? (
                        <p>Қор сәтті түрде өзгертілді</p>
                    ) : (
                        <p>Жаңа қор сәтті түрде қосылды</p>
                    )}
                </Modal.Body>
            </Modal>
            {fond ? (
                <h1>Қор жайлы информацияны өзгеру</h1>
            ) : (
                <h1>Жаңа қор қосу</h1>
            )}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="image">
                            <div className="image-preview">
                                {formData.img ? (
                                    <Image src={formData.img} />
                                ) : (
                                    <div>
                                        СУРЕТ ЖОК
                                    </div>
                                )}
                            </div>
                            <Form.Label>Сурет тандау</Form.Label>
                            <Form.Control name="img" type="file" accept="image/*" onChange={handleImage} hidden isInvalid={formError.img}/>
                            <Form.Control.Feedback type="invalid" >{formError.img}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="flex-grow">     
                        <Form.Group controlId="title">
                            <Form.Label>Атауы</Form.Label>
                            <Form.Control name="title" value={formData.title} type="text" placeholder="Қор атауы" onChange={handleChange} isInvalid={formError.title} />
                            <Form.Control.Feedback type="invalid" >{formError.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="location">
                            <Form.Label>Орналасқан жері</Form.Label>
                            <Form.Select name="location" value={formData.location} isInvalid={formError.location} onChange={handleChange}>
                                <option value="">Қала</option>
                                {locations.map((location,key) => (
                                    <option key={key} value={location}>{location}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" >{formError.location}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Кімге арналған</Form.Label>
                            <Row xs={1} md={2} lg={3}>
                                {categories.map((category,key) => (
                                    <Col key={key}>
                                        <Form.Check name="category" id={`category-${category}`} checked={formData.category.split(',').includes(category)} value={category} label={category} onChange={handleChange}/>
                                    </Col>
                                ))}
                            </Row>
                            <Form.Control hidden isInvalid={formError.category} />
                            <Form.Control.Feedback type="invalid" >{formError.category}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="description">
                    <Form.Label>Мағлұмат</Form.Label>
                    <Form.Control as="textarea" isInvalid={formError.description} value={formData.description} onChange={handleChange} name="description"></Form.Control>
                    <Form.Control.Feedback type="invalid" >{formError.description}</Form.Control.Feedback>
                </Form.Group>
                <div className="bottom">
                    <Button type="submit">{fond ? 'Өзгерту' : 'Қосу'}</Button>
                </div>
            </Form>
        </div>
    );
}

export default AddFond;