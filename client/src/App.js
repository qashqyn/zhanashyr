import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Navbar from './components/NavBar';
import Footer from './components/FooTer';
import Page404 from './components/Page404';
import Home from './components/Home';
import Fonds from './components/Fonds/Fonds';
import Contacts from './components/Contacts';
import Partners from './components/Partners';
import FondDetails from './components/Fonds/FondDetails';
import Cabinet from './components/Cabinet/Cabinet';
import Profile from './components/Cabinet/Profile';
import AddFond from './components/Cabinet/admin/AddFond';
import Auth from './components/Auth/Auth';

import Events from './components/Events/Events';
import EventDetails from './components/Events/EventDetails';
import AddEvent from './components/Events/AddEvent';
import Settings from './components/Cabinet/Settings';
import Donation from './components/Cabinet/Donation';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' exact element={<Auth /> }/>
                <Route path="/"  element={
                    <>
                        <Navbar/>
                        <div className='main'>
                            <Outlet/>
                        </div>
                        <Footer />
                    </>
                } >
                    <Route path='/' exact element={<Home />} />
                    <Route path='/cabinet' element={<Cabinet />} >
                        <Route path='profile' element={<Profile />} />
                        <Route path='add-fond' element={<AddFond />} />
                        <Route path='donation' element={<Donation />} />
                        <Route path='settings' element={<Settings />} />
                    </Route>
                    <Route path="about" exact element={<Contacts />} />
                    <Route path="/fonds" exact element={<Fonds />} />
                    <Route path="/fonds/:id" element={<FondDetails />} />
                    <Route path="/contacts" exact element={<Contacts /> } />
                    <Route path='/partners' exact element={<Partners /> }/>
                    <Route path='/events' exact element={<Events />} />
                    <Route path='/events/add' exact element={<AddEvent />} />
                    <Route path='/events/:id' element={<EventDetails />} /> 
                    <Route path='*' element={<Page404 />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;