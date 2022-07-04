import React, { useContext, useState } from 'react'
import { Button, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, TableCell, TableRow, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductType, StoreContext } from '../../contexts/StoreContext';

function CartItem({ id, name, price, quantity, src }: any) {

    const { cart, dispatchCart } = useContext(StoreContext);

    const [quantityState, setQuantityState] = useState(quantity);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = Number(e.target.value)
        if (value === 0) {
            dispatchCart({ type: 'remove', id, quantity: 1 });
        } else if (e.target.value < quantityState) {
            dispatchCart({ type: 'decrease', id, quantity: 1 });
            setQuantityState(e.target.value);
        } else if (e.target.value > quantityState) {
            console.log('increased');
            dispatchCart({ type: 'increase', id, quantity: 1 });
            setQuantityState(e.target.value);
        }

    }

    return (
        <TableRow>
            {/* <TableCell /> */}
            <TableCell>
                <Grid container spacing={1} direction="row">
                    <Grid item>
                        <img
                            src={src}
                            style={{
                                width: '50%',
                                height: 'auto',
                            }}
                            alt={name}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant='subtitle1'
                        >
                            {name}
                        </Typography>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell
                align='center'
            >
                <TextField
                    type='number'
                    size='small'
                    sx={{
                        width: '100%',
                    }}
                    defaultValue={quantity}
                    InputProps={{
                        inputProps: {
                            min: 0
                        }
                    }}
                    onChange={handleChange}
                />
            </TableCell>
            <TableCell>
                {price}
            </TableCell>

            <TableCell>
                <Button
                    variant='outlined'
                    color='error'
                    onClick={() => dispatchCart({ type: 'remove', id, quantity: quantity })}
                >
                    Remove
                </Button>
            </TableCell>
        </TableRow >
    )
}

export default CartItem