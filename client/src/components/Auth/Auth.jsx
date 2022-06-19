import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isExists, signIn, signUp } from "../../actions/auth";
import { CLEAR_USER_EXISTS } from "../../constants/actionTypes";

import '../../styles/auth.scss';

const initialErrors = {email: '', password: ''};

const Auth = () => {
    const { userExists } = useSelector((state) => state.auth);
    const [ formData, setFormData ] = useState({});
    const [ errors, setErrors ] = useState(initialErrors);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if(userExists !== null){
            document.getElementById('check-email').classList.add('d-none');
            if(userExists === true){
                document.getElementById('sign-in').classList.remove('d-none');
            }else{
                document.getElementById('sign-up').classList.remove('d-none');
            }
        }
    }, [dispatch, userExists]);

    const cancelSignUp = (e) => {
        e.preventDefault();
        dispatch({type: CLEAR_USER_EXISTS});

        document.getElementById('check-email').classList.remove('d-none');
        document.getElementById('sign-in').classList.add('d-none');
        document.getElementById('sign-up').classList.add('d-none');
    }

    const checkUser = (e) => {
        e.preventDefault();
        const regex = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if(formData.email){
            if(formData.email && regex.test(formData.email)){
                setErrors({...errors, email: ''})
                dispatch(isExists(formData.email));
            }else{
                setErrors({...errors, email: 'Почта дұрыс емес'})
            }
        }
        else   
            setErrors({...errors, email: 'Почта енгізілмеді'})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.password.length === 0){
            setErrors({...errors, password: 'Құпия сөз енгізілмеді'});
        }else{
            if(userExists)
                dispatch(signIn(formData, navigate));
            else    
               dispatch(signUp(formData, navigate));
        }
    }

    return (
        <div id="auth">
            <Row xs={1} md={2}>
                <Col className="d-none d-md-block">
                    <div>
                        {/* <span>ЖАН АШЫР</span> */}
                    </div>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={8}>
                                <div id="check-email">
                                    <Form.Group controlId="form-email">
                                        <h1>Жан Ашыр</h1>
                                        <h3>Кіру немесе тіркелу</h3>
                                        <p>Кіру немесе тіркелу үшін почтанызды енгізініз</p>
                                        <Form.Control isInvalid={errors.email.length > 0} type="text" name="email" placeholder="Почта" onChange={handleChange}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button onClick={checkUser}>Жалғастыру</Button>
                                </div>
                                <div id="sign-in" className="d-none">
                                    <Form.Group controlId="form-signin">
                                        <h3>Кіру</h3>
                                        <p>Құпия сөзді енгізініз</p>
                                        <p className="email">{formData.email}</p>
                                        <Form.Control isInvalid={errors.password.length > 0} type="password" name="password" placeholder="Құпия сөз" onChange={handleChange}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type="submit">Кіру</Button>
                                </div>
                                <div id="sign-up" className="d-none">
                                    <Form.Group controlId="form-signup">
                                        <a onClick={cancelSignUp} className="cancel-sign-up">Артқа</a>
                                        <h3>Тіркелу</h3>
                                        <p>Жеке кабинетізінге кіру үшін құпия сөз құрастырыныз</p>
                                        <Form.Control type="password" name="password" placeholder="Құпия сөз" onChange={handleChange}/>
                                    </Form.Group>
                                    <Button type="submit">Жалғастыру</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Auth;


// public Object loginUser(User user){
//     User existingUser = usersRepo.findByEmail(user.getEmail());
//     Map<String, Object> resObj = new HashMap<>();
//     if(existingUser != null){
//         if(!passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
//             return null;
//         Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
//         String accessToken = JWT.create()
//                 .withSubject(user.getEmail())
//                 .withExpiresAt(new Date(System.currentTimeMillis() + 10*60*60*1000))
//                 .sign(algorithm);
//         resObj.put("user", (existingUser));
//         resObj.put("token", (accessToken));
//         return resObj;
//     }
//     return null;
// }

// @PostMapping("/login")
//     public  ResponseEntity<Object> loginn(@RequestBody User user){
//         return ResponseEntity.ok().body(userService.loginUser(user));
//     }