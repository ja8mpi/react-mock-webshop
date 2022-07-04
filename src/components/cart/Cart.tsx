import { List } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext';
import CartItem from './CartItem';

export const Cart = () => {

    const { cart, products } = useContext(StoreContext);

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <List
                sx={{
                    width: '50%',
                }}
            >
                <CartItem />
            </List>
        </Box>
    )
}
