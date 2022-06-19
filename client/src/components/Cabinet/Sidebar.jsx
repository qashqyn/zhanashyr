import React, { useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from "../../constants/actionTypes";

import './styles/sidebar.scss';
const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = (e) =>{
        e.preventDefault();
        dispatch({type: LOGOUT});
        navigate('/');
    }



    return (
        <div id="sidebar">
            <Nav className="flex-column">
                <Dropdown title="Қайырымдылық" id="basic-nav-dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Қайырымдылық
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <LinkContainer to="donation?type=monthly">
                            <Dropdown.Item href="#action/3.1">Ай сайындық</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer  to="donation?type=permanent">
                            <Dropdown.Item href="#action/3.1">Бір реттік</Dropdown.Item>
                        </LinkContainer>
                    </Dropdown.Menu>
                </Dropdown>
                <LinkContainer to="settings">
                    <Nav.Link>Аккаунт баптаулары</Nav.Link>
                </LinkContainer>
                {(profile && profile.user && profile.user._admin) && (
                <LinkContainer to="add-fond">
                    <Nav.Link>Жаңа қор қосу</Nav.Link>
                </LinkContainer>
                )}
                <Nav.Link onClick={logout} >Шығу</Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;