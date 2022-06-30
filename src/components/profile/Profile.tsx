import { Typography } from '@mui/material';
import React from 'react'
import { Navigate, Route } from 'react-router-dom';

const Profile = () => {

    const isLoggedIn = true;
    return (
        <Typography
            variant='h1'
            component='h1'
        >
            Profile
        </Typography>
    )
}

export default Profile;