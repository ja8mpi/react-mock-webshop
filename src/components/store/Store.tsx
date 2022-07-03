import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { ProductType, StoreContext } from '../../contexts/StoreContext';
import StoreItem from './storeItem/StoreItem';

const Store = () => {

    const { products } = useContext(StoreContext);

    return (
        <Grid container spacing={2} m={3}>
            {
                products?.map((product: ProductType) => {
                    return (
                        <Grid
                            item
                            key={product.id}
                        >
                            <StoreItem {...product} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default Store;