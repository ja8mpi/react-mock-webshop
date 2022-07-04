import { Container, Paper, Table, Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Navigate, Route } from 'react-router-dom';
import Order from '../order/Order';

const Profile = () => {

    const user = JSON.parse(localStorage.getItem('user')!);

    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {
        const fetchMyData = async () => {
            const { data } = await axios.get(`http://localhost:5000/orders?userid=${user.id}`);
            if (data) {
                setOrders(data);
            } else {
                // There was an error fetching the data
            }
        };

        fetchMyData();
    }, []);

    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: 'primary.info',
                paddingTop: '10%'
            }}
        >
            <Stack spacing={2}>
                <Container>
                    <Typography
                        variant='h4'
                        component='h1'
                    >
                        Personal info
                    </Typography>
                    <Typography>
                        firstname: {user.firstname}
                    </Typography>
                    <Typography>
                        lastname: {user.lastname}
                    </Typography>
                    <Typography>
                        email: {user.email}
                    </Typography>
                </Container>
                <Container>
                    <Typography
                        variant='h4'
                        component='h1'
                    >
                        Orders
                    </Typography>
                    {
                        !orders ? <Typography variant='h6' component='p'>No orders</Typography>
                            :
                            <Stack>
                                <Order orders={orders} />
                            </Stack>
                    }
                </Container>
            </Stack>
        </Container>
    )
}

export default Profile;