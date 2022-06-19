import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import '../styles/navbar.scss';
import Logo from '../images/logo.png';
import { useLocation, useNavigate } from "react-router-dom";
import decode from 'jwt-decode';

import { LOGOUT } from '../constants/actionTypes';

const NavBar = () => {
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');
        setProfile(null);
    };

    useEffect(() => {
        const token = profile?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) 
                logout();
        }
        setProfile(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <Navbar collapseOnSelect>
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img src={Logo} height={64} alt="Жан Ашыр"/>
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar" className="justify-content-end">
                <Nav>
                    <LinkContainer to="about">
                        <Nav.Link>Біз туралы</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="fonds">
                        <Nav.Link>
                            Қорлар
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="partners">
                        <Nav.Link>Серіктестер</Nav.Link>
                    </LinkContainer>
                    <Nav.Link href="/contacts#contact-list">Бізбен байланыс</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {/* <LinkContainer to="">
                <Navbar.Brand className="icon">
                    <FontAwesomeIcon icon={['fas', 'magnifying-glass']} size="lg" />
                </Navbar.Brand>
            </LinkContainer> */}
            <LinkContainer to={(profile && profile.user) ? '/cabinet/profile' : '/auth'}>
                <Navbar.Brand className="icon">
                    <FontAwesomeIcon icon={['far', 'user']} size="lg" />
                </Navbar.Brand>
            </LinkContainer>
            {/* <LinkContainer to="/">
                <Navbar.Brand >
                    Бізге көмек
                </Navbar.Brand>
            </LinkContainer> */}
        </Navbar>
    );
};

export default NavBar;