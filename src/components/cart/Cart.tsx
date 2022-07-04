import { Button, List, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext';
import { StoreContext } from '../../contexts/StoreContext';
import CartItem from './CartItem';

export const Cart = () => {

    const { cart, products, dispatchCart } = useContext(StoreContext);
    const { isLoggedIn } = useContext(AuthContext);


    const newItems = cart.items.map((item) => {
        return {
            ...products?.find(element => element.id === item.id),
            quantity: item.quantity
        };
    });

    const fullPrice = (newItems?.reduce((acc: number, item: any) => { return acc + item.price * item.quantity; }, 0)).toFixed(2);

    // const cartItems = products?.filter((item) => {
    //     console.log(cart.items.find(cartItem => cartItem.id === item.id))
    //     return {
    //         ...cart.items.find(cartItem => cartItem.id === item.id),
    //         quantity: cart.items.find(cartItem => cartItem.id === item.id)?.quantity
    //     }

    // })

    const handleSubmitOrder = () => {
        axios.post('/orders', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleEmpty = () => {
        dispatchCart({ type: 'empty', id: 0, quantity: 0 })
    }

    return (
        <>
            {
                (cart.items.length !== 0) ?
                    <>
                        <TableContainer component={Paper}
                            sx={{
                                width: '100vw',
                                height: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                            }
                        >
                            <Table
                                sx={{
                                    width: '50%',
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Product</TableCell>
                                        <TableCell
                                            align='center'
                                        >
                                            Quantity
                                        </TableCell>
                                        <TableCell >Price</TableCell>
                                        <TableCell colSpan={2}>
                                            <Button
                                                variant='outlined'
                                                color='warning'
                                                onClick={handleEmpty}
                                            >
                                                Empty
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    {newItems?.map((item) => {
                                        return (
                                            <CartItem
                                                key={item.id}
                                                {...item}
                                            />
                                        )
                                    })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow
                                        sx={{ "& td": { border: 0 } }}
                                    >
                                        <TableCell
                                            colSpan={3}
                                            align='right'
                                        >
                                            <Typography>
                                                Full: {fullPrice}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                        >
                                            <Button
                                                variant='contained'
                                                size='large'
                                                onClick={handleSubmitOrder}
                                            >
                                                Order
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer >
                    </>
                    :
                    <Typography
                        variant='h3'
                    >
                        Cart is empty
                    </Typography>
            }
        </>
    )
}
