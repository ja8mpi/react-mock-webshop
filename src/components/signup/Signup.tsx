import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Link as MUILink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from '@mui/system';
import React, { ReactFragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignupFormInput } from './SignupFormInput';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

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



const Signup = () => {

    const methods = useForm<IFormInputs>(
        {
            mode: 'onTouched',
            resolver: yupResolver(schema),
        });


    const formSubmitHandler: SubmitHandler<IFormInputs> = (/*{ email, password }*/ data: IFormInputs) => {
        const { errors } = methods.formState;
        const user = {
            id: uuidv4(),
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        }
        axios.post('http://localhost:5000/users', user)
            .then((response) => {
                console.log(response);
                methods.reset();
            })
            .catch((error) => {
                console.log(error);
            });
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
                    Sign up
                </Typography>
                <FormProvider {...methods}>
                    <Box component="form" onSubmit={methods.handleSubmit(formSubmitHandler)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <SignupFormInput
                                    autoFocus
                                    label='Firstname'
                                    name='firstname'
                                    id='firstname'
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SignupFormInput
                                    label='Lastname'
                                    name='lastname'
                                    id='lastname'
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SignupFormInput
                                    label='Email address'
                                    name='email'
                                    id='email'
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SignupFormInput
                                    label='password'
                                    name='password'
                                    id='password'
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SignupFormInput
                                    label='Confirm password'
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    type='password'
                                />
                            </Grid>
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
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <MUILink
                                    to="/signin"
                                    component={Link}
                                >
                                    Already have an account? Sign in
                                </MUILink>
                            </Grid>
                        </Grid>
                    </Box>
                </FormProvider>
            </Box>
        </Container >
    )
}

export default Signup;