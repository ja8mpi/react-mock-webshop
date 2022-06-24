import React from 'react'
import { Typography } from '@mui/material';
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path='./' />
            <Route path='./store' />
            <Route path='./login' />
            <Route path='./signup' />
        </Routes>
    )
}

export default App;