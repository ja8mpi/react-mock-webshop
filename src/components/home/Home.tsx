import { Grid, Link, Typography } from '@mui/material';
import React from 'react'

const Home = () => {
    return (
        <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{
                minHeight: '100vh'
            }}
        >

            <Grid item xs={3}>
                <Typography
                    variant="h3"
                    component="h1"
                >
                    React.js refernce project
                </Typography>
                <Typography
                    variant="h4"
                    component="p"
                >
                    Created using MaterialUI & TypeScript
                </Typography>
                <Link
                    target="_blank"
                    href="https://github.com/ja8mpi/react-mock-webshop.git"
                >
                    Github
                </Link>
            </Grid>

        </Grid >
    )
}

export default Home;