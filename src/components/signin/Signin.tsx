import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Link as MUILink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from '@mui/system';
import React from 'react'
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

interface IFormInputs {
    email: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
}


const schema = yup.object().shape({
    checkEmail: yup.boolean(),
    email: yup
        .string()
        .required('Email must be provided.')
        .email('The email must be valid.')
        .test('Unique Email', 'Email already in use', // <- key, message
            (value) => {
                return new Promise((resolve, reject) => {
                    axios.get(`http://localhost:5000/users`)
                        .then((res) => {
                            const user = res.data.find((u: any) => u.email === value);
                            if (user) resolve(false);
                            resolve(true)
                        })
                    // .catch((error) => {
                    //     if (error.response.data.content === "The email has already been taken.") {
                    //         resolve(false);
                    //     }
                    // })
                })
            }
        ),
    password: yup.string().required().min(6).max(20),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'The passwords must match.'),
    firstname: yup.string().required('Firstname must be provided.'),
    lastname: yup.string().required('Lastname must be provided.')
});

const SignIn = () => {
    return (
        <Container>
            <Box
                sx={{
                    width: '60%',
                    margin: 'auto',
                    backgroundColor: 'white',
                    padding: '16px',
                    marginTop: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: 'primary.main'
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={() => console.log('submit')} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        size='large'
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <MUILink
                                to="#"
                                component={Link}
                            >
                                Forgot password?
                            </MUILink>
                        </Grid>
                        <Grid item>
                            <MUILink
                                to="/signup"
                                component={Link}>
                                {"Don't have an account? Sign Up"}
                            </MUILink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    )
}

export default SignIn;