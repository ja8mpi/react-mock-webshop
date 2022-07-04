import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ProductType } from '../../contexts/StoreContext';

function CartItem() {
    return (
        <ListItem disablePadding>
            <ListItemText primary={'asd'} />
            <ListItemButton>
                <ListItemIcon>
                    asd
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}

export default CartItem