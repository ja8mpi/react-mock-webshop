import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Link as MUILink, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import { SignupFormInput } from '../signup/SignupFormInput';
import { SignInFormInput } from './SignInFormInput';

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
        .email('The email must be valid.'),
    password: yup.string().required(),
});

const SignIn = () => {

    const { isLoggedIn, ToggleLogin } = useContext(AuthContext);

    let navigate = useNavigate();

    const [error, setError] = useState(false);

    const methods = useForm<IFormInputs>(
        {
            mode: 'onSubmit',
            resolver: yupResolver(schema),
        });

    const formSubmitHandler: SubmitHandler<IFormInputs> = (/*{ email, password }*/ loginCredentials: IFormInputs) => {

        const { email, password } = loginCredentials;

        axios.get('http://localhost:5000/users')
            .then(({ data }) => {
                const user = data.find((u: any) => u.email === email);
                if (user && user.password === password) {
                    localStorage.setItem('loggedIn', 'true');
                    ToggleLogin();
                    navigate('/profile');
                    console.log('logged in');
                } else {
                    setError(true);
                    console.log('not logged in');
                }
            })
    }

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
                <FormProvider {...methods}>
                    <Box component="form" onSubmit={methods.handleSubmit(formSubmitHandler)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <SignInFormInput
                                    autoFocus={true}
                                    label={"Email address"}
                                    id={"email"}
                                    name={"email"}
                                    type={"email"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SignInFormInput
                                    label={"Password"}
                                    id={"password"}
                                    name={"password"}
                                    type={"password"}
                                />
                            </Grid>
                        </Grid>
                        {error && <Alert severity="error">No user found!</Alert>}
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
                </FormProvider>
            </Box>
        </Container >
    )
}

export default SignIn;