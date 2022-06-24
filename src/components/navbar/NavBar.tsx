import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Menu,
  MenuItem
} from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar
      position='static'
      color='primary'
    >
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="logo"
        >
          <StorefrontIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={
            {
              flexGrow: 1
            }
          }
        >
          React Mock Webshop
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button
            color="inherit"
            component={Link}
            to='./'
          >Home</Button>
          <Button
            color="inherit"
            component={Link}
            to='./store'
          >Store</Button>
          <Button
            color="inherit"
            component={Link}
            to='./signin'
          >Sign in</Button>
          <Button
            color="inherit"
            variant='outlined'
            component={Link}
            to='./signup'
          >Sign up</Button>
        </Stack>
      </Toolbar>
    </AppBar >
  )
}

export default NavBar;