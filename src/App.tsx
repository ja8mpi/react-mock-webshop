import React from 'react'
import { Typography } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Store from './components/store/Store';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import NavBar from './components/navbar/NavBar';

const App = () => {
    return (
        <>
            < NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/store' element={<Store />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </>
    )
}

export default App;