import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Link as MUILink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from '@mui/system';
import React, { ReactFragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignupFormInput } from './SignupFormInput';


interface IFormInputs {
    email: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
}


const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6).max(20),
    confirmPassword: yup.string().required().min(6).max(20),
    firstname: yup.string().required(),
    lastname: yup.string().required()
});



const Signup = () => {

    const methods = useForm<IFormInputs>(
        {
            mode: 'onBlur',
            resolver: yupResolver(schema),
        });


    const formSubmitHandler: SubmitHandler<IFormInputs> = (/*{ email, password }*/ data: IFormInputs) => {
        console.log('submitted data:\n', data);
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SignupFormInput
                                    label='Lastname'
                                    name='lastname'
                                    id='lastname'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SignupFormInput
                                    label='Email address'
                                    name='email'
                                    id='email'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SignupFormInput
                                    label='password'
                                    name='password'
                                    id='password'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SignupFormInput
                                    label='Confirm password'
                                    name='confirmPassword'
                                    id='confirmPassword'
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