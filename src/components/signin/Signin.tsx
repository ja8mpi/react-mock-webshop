import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Link as MUILink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from '@mui/system';
import React from 'react'
import { Link } from 'react-router-dom';

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