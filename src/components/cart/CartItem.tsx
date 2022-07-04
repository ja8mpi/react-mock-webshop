import React, { useContext, useState } from 'react'
import { Button, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, TableCell, TableRow, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductType, StoreContext } from '../../contexts/StoreContext';

function CartItem({ id, name, price, quantity, src }: any) {

    const { cart, dispatchCart } = useContext(StoreContext);

    const [quantityState, setQuantityState] = useState(quantity);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        const value = Number(e.target.value);

        console.log('value', value)
        console.log('quantityState', quantityState)

        if (value === 0 && e.target.value !== "") {
            dispatchCart({ type: 'remove', id, quantity: 1 });
        } else if (value < quantityState) {
            console.log('difference: ', quantityState - value);
            dispatchCart({ type: 'decrease', id, quantity: quantityState - value });
            setQuantityState(value);
        } else if (value > quantityState) {
            console.log('increased');
            dispatchCart({ type: 'increase', id, quantity: value - quantityState });
            setQuantityState(value);
        }

    }

    const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value - 1 === quantityState) {
            dispatchCart({ type: 'increase', id, quantity: 1 });
            setQuantityState(value);
        } else if (value + 1 === quantityState) {
            dispatchCart({ type: 'decrease', id, quantity: 1 });
            setQuantityState(value);
        } else {
            return;
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
                            min: 0,
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                        }
                    }}
                    onChange={handleCHange}
                    onBlur={handleBlur}
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