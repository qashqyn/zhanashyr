import React from "react";
import { useEffect } from "react";
import {useSearchParams, useNavigate} from 'react-router-dom'

import { Col, Container, Form, Image, Nav, Row, Spinner, Button, Modal} from "react-bootstrap";

import '../../styles/addEvent.scss';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFondById } from "../../actions/fonds";
import { createEvent } from "../../actions/events";

const initialState = {firstname: '', lastname: '', reason: '', title: '', img:'', date: '', fondId: '', cashgoal: '', description: ''};
let terms = {first:false, second: false}
const reasonOptions = ['Балаларды қорғау күні','Жай әншейін','1 қыркүйек','Фестиваль','Спорттық шара','Көрме','8 наурыз','Мектеп бітіру','Үйлену тойының жылдығы','Мерейтой','Туған күн','Жұмысқа барғыңыз келмейтін күн','Менің сүйікті көйлегіме кенеттен кірген күнім','Махаббат күні','Біз кездескен күн','Атастыру','Басқалар туралы ойлағың келетін күн','Бақытты күн','Пайдалы болу себебі','Жаңа жыл','қоныс той','Баланың дүниеге келуі','Үйлену той','Басқа'];

const AddEvent = () => {
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [fondId, setFondId] = useState(null);
    const {fond} = useSelector((state) => state.posts);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {event_status} = useSelector((state) => state.posts);

    const [formData, setFormData] = useState(initialState);
    const [formError, setFormError] = useState({...initialState, terms: ''});
    const [infinite, setInfinite] = useState(false);
    
    useEffect(()=>{
        if(!profile || !profile.user)
            navigate(-1);
        else{
            // if(profile.user.firstname)
            //     setFormData({...formData, firstname: profile.user.firstname});
            // if(profile.user.lastname)
            //     setFormData({...formData, lastname: profile.user.lastname});
        }
        if(searchParams.get('fond') && !isNaN(Number(searchParams.get('fond')))){
            setFondId(searchParams.get('fond'));
        }else{
            navigate(-1);
        }
    }, [profile, searchParams]);

    useEffect(()=>{
        if(fondId){
            dispatch(getFondById(fondId));
        }
    }, [fondId]);

    useEffect(()=>{
        if(event_status && event_status === 200){
            navigate(`/fonds/${fondId}`);
        }
    }, [event_status]);

    const handleChange = (e) => {
        e.preventDefault();
        setFormError({...formError, [e.target.name]: ''});
        if(e.target.name === 'cashgoal'){
            let value = Number(e.target.value.replace(/\D/g, ''));
            if(value === 0)
                value = '';
            setFormData({...formData, [e.target.name]: value});
        }else{
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    useEffect(()=>{
        if(profile && profile.user){
            setFormData({...formData, firstname: profile.user.firstname, lastname: profile.user.lastname},)
        }
    }, [profile])

    const handleSubmit = (e) => {
        e.preventDefault();

        let errs = {firstname: '', lastname: '', img:'',reason: '', title: '', date: '', cashgoal: '', description: '', terms: ''};
        let errCnt = 0;

        if(!formData.firstname){
            errCnt++;
            errs.firstname = 'Атынызды енгізіңіз';
        }
        if(!formData.lastname){
            errCnt++;
            errs.lastname = 'Тегінізді енгізіңіз';
        }
        if(!formData.reason){
            errCnt++;
            errs.reason = 'Атынызды енгізіңіз';
        }
        if(!formData.title){
            errCnt++;
            errs.title = 'Алым атың енгізіңіз';
        }
        if(!formData.date){
            errCnt++;
            errs.date = 'Тегінізді енгізіңіз';
        }
        if(!formData.description){
            errCnt++;
            errs.description = 'Сипаттаманы енгізіңіз';
        }
        if(!infinite && !formData.cashgoal){
            errCnt++;
            errs.cashgoal = 'Соманы енгізіңіз';
        }
        if(!formData.img){
            errCnt++;
            errs.img = 'Алымның суретің танданыз';
        }

        if(!terms.first){
            errCnt++;
            errs.terms = 'Сізге қызмет көрсету шарттарымен келісу қажет';
        }
        if(!terms.second){
            errCnt++;
            errs.terms = 'Сізге қызмет көрсету шарттарымен келісу қажет';
        }

        setFormError(errs);

        if(errCnt === 0){
            dispatch(createEvent(formData, fondId, profile.user.id));
        }

    }

    const handleImage = async (e) =>{
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFormData({...formData, [e.target.name]: base64});
        setFormError({...formError, img: ''});
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

    useEffect(()=>{
        if(fond && fond.id){
            setFormData({...formData, fondId: fond.id})
        }
    },[fond]);

    return fond && (
        <Container id="add-event">
            <h1 className="text-center">Алым жасаныз</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                    <Form.Label>Есім</Form.Label>
                    <div className="input">
                        <Form.Control type="text" name="firstname" placeholder="Атынызды енгізіңіз" onChange={handleChange} value={formData.firstname} isInvalid={!!formError.firstname} />
                        <Form.Control.Feedback type="invalid">{formError.firstname}</Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Тег</Form.Label>
                    <div className="input">
                        <Form.Control type="text" name="lastname" placeholder="Тегінізді енгізіңіз" onChange={handleChange} value={formData.lastname} isInvalid={!!formError.lastname} />
                        <Form.Control.Feedback type="invalid">{formError.lastname}</Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Себеп</Form.Label>
                    <div className="input">
                        <Form.Select name="reason" defaultValue={formData.reason} onChange={handleChange} isInvalid={!!formError.reason} >
                            <option value="">Себепті танданыз</option>
                            {reasonOptions.map((reason, key) => (
                                <option value={reason} key={key}>{reason}</option>
                            ))}
                        </Form.Select>
                        <Form.Control hidden isInvalid={!!formError.reason} />
                        <Form.Control.Feedback type="invalid">{formError.reason}</Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Алым атау</Form.Label>
                    <div className="input">
                        <Form.Control type="text" name="title" placeholder="Алым атың енгізіңіз" onChange={handleChange} value={formData.title} isInvalid={!!formError.title} />
                        <Form.Control.Feedback type="invalid">{formError.title}</Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Алым күні</Form.Label>
                    <div className="input">
                        <Form.Control type="date" name="date" placeholder="Күнді таңданыз" onChange={handleChange} value={formData.date} isInvalid={!!formError.date} />
                        <Form.Control.Feedback type="invalid">{formError.date}</Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="form-group" controlId="image">
                    <Form.Label>Сурет тандау</Form.Label>
                    <div className="input">
                        {formData.img && (
                            <div className="image-preview">
                                <Image src={formData.img} />
                            </div>
                        )}
                        <label id="chooseimg">
                            {formData.img ? 'Басқа сурет тандау' : 'Сурет тандау'}
                            <Form.Control name="img" type="file" accept="image/*" onChange={handleImage} className="d-none" />
                        </label>
                        <Form.Control hidden isInvalid={!!formError.img} />
                        <Form.Control.Feedback type="invalid">{formError.img}</Form.Control.Feedback>
                    </div>
            </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Алымның қысқа сипаттамасы</Form.Label>
                    <div className="input">
                        <Form.Control as="textarea" rows={5} name="description" placeholder="Сипаттаманы енгізіңіз" onChange={handleChange} value={formData.description} isInvalid={!!formError.description} />
                        <Form.Control.Feedback type="invalid">{formError.description}</Form.Control.Feedback>
                    </div>
                </Form.Group>

                
                <Form.Group className="form-group">
                    <Form.Label>Қор</Form.Label>
                    <div className="fond">
                        <Image src={fond.img} />
                        <p>{fond.title}</p>
                    </div>
                </Form.Group>
                
                <Form.Group className="form-group">
                    <Form.Label>Қаржылық мақсат</Form.Label>
                    <div className="input">
                        <Form.Control type="text" name="cashgoal" disabled={infinite} placeholder={infinite ? '' : 'Соманы енгізіңіз'} onChange={handleChange} value={(!infinite) ? formData.cashgoal : ''} isInvalid={!!formError.cashgoal} />
                        <label>
                            <Form.Check checked={infinite} onChange={(e)=>{
                                                        setInfinite(e.target.checked); 
                                                        if(e.target.checked){ 
                                                            setFormData({...formData, cashgoal: 0}); 
                                                            setFormError({...formError, cashgoal: ''})
                                                        }else{
                                                            setFormData({...formData, cashgoal: ''});    
                                                        }
                                                        }} />Мақсатым жоқ, қанша жиналады, сонша жиналады
                        </label>
                        <Form.Control.Feedback type="invalid">{formError.cashgoal}</Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label>Орналастыру шарттары</Form.Label>
                    <div className="input">
                        <label>
                            <Form.Check isInvalid={!terms.first && formError.terms} onChange={(e)=>{terms.first=e.target.checked}} /> Мен ұсыныспен келісемін
                        </label>
                        <label>
                            <Form.Check isInvalid={!terms.second && formError.terms} onChange={(e)=>{terms.second=e.target.checked}} /> Мен жеке деректерді өңдеу саясатымен келісемін
                        </label>
                        <Form.Control hidden isInvalid={!!formError.terms} />
                        <Form.Control.Feedback type="invalid">{formError.terms}</Form.Control.Feedback>
                    </div>
                </Form.Group>

                <div className="bottom">
                    <Button type="submit">ЖАРИЯЛАУ</Button>
                </div>

            </Form>

        </Container>
    )
};

export default AddEvent;