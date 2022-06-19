import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";
import Sidebar from "./Sidebar";
import decode from 'jwt-decode';

import './styles/main.scss';
import { useEffect } from "react";

const Cabinet = () => {
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div id="cabinet">
            <Sidebar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Cabinet;