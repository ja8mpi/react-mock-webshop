import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Badge
} from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
          <IconButton
            size="large"
            color="inherit"
            component={Link}
            to='./cart'
          >
            <Badge
              badgeContent="0"
              color="error"
              overlap="circular"
              style={{
                transform: 'translate(30px, -20px)'
              }}
            />
            <ShoppingCartIcon />
          </IconButton>

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