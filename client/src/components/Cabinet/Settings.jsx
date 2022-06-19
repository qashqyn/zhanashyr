import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import {Form, Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import './styles/settings.scss';
import { updateUser } from "../../actions/auth";
import moment from "moment";

const initialState = {firstname: '', lastname: '', birth_date: '', gender: '', email: '', phone: ''};

const Settings = () => {
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailError, setEmailError] = useState('');

    useEffect(()=>{
        if(profile && profile.user){
            setFormData(profile.user);
        }else{
            dispatch({type: LOGOUT});
            navigate('/');
        }
    }, [profile]);

    const handleChange = (e) => {
        // e.preventDefault();
        let value = e.target.value;
        if(e.target.name === 'phone'){
            value = value.replace(/\D/g, '');
            switch(value.length){
                case 0: value = ''; break;
                case 1: value = '+' + value; break;
                case 2: case 3: case 4: value = '+' + value.substring(0,1) + " " + value.substring(1,4); break;
                case 5: case 6: case 7: value = "+" + value.substring(0,1) + " " + value.substring(1,4) + " " + value.substring(4,7); break;    
                default: value = "+" + value.substring(0,1) + " " + value.substring(1,4) + " " + value.substring(4,7) + " " + value.substring(7,11); break
            }
        }
        setFormData({...formData, [e.target.name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if((formData.email && !regex.test(formData.email)) || !formData.email){
            setEmailError('Почтанызды енгізіңіз');
        }else{
            dispatch(updateUser(formData));
        }
    }

    return (
        <div id="settings">
            <h1>Аккаунт баптаулары</h1>
            <Form onSubmit={handleSubmit}>
                <h5>НЕГІЗГІ АҚПАРАТ</h5>
                <Form.Group className="form-group">
                    <Form.Label>Есім</Form.Label>
                    <Form.Control type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Тег</Form.Label>
                    <Form.Control type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Туған күн</Form.Label>
                    <Form.Control type="date" name="birth_date" value={moment(formData.birth_date).format('YYYY-MM-DD')} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Жыныс</Form.Label>
                    <div className="choose">
                        <Form.Check type="radio" checked={formData.gender === 'Еркек'} name="gender" value="Еркек" label="Еркек" id="gendermale" onChange={handleChange} />
                        <Form.Check type="radio" checked={formData.gender === 'Әйел'} name="gender" value="Әйел" label="Әйел" id="genderfemale" onChange={handleChange} />
                    </div>
                </Form.Group>
                <h5>БАЙЛАНЫС АҚПАРАТЫ</h5>
                <Form.Group className="form-group">
                    <Form.Label>Электронды почта</Form.Label>
                    <div className="choose">
                        <Form.Control type="text" name="email" value={formData.email} onChange={handleChange} isInvalid={emailError} />
                        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                    </div>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Телефон номері</Form.Label>
                    <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </Form.Group>
                <div className="bottom">
                    <Button type="submit">Өзгерістерді сақтау</Button>
                </div>
            </Form>
        </div>
    );
}

export default Settings;