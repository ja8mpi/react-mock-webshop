import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Store from './components/store/Store';
import SignIn from './components/signin/Signin';
import Signup from './components/signup/Signup';
import NavBar from './components/navbar/NavBar';
import AuthContext, { AuthContextProvider } from "./contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Profile from "./components/profile/Profile";
import { Cart } from "./components/cart/Cart";
import { StoreContextProvider } from "./contexts/StoreContext";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
// import { ShopProvider } from "./contexts/ProductsContext";


const App = () => {

    const isLoggedIn = localStorage.getItem("loggedIn");

    const { ToggleLogin } = useContext(AuthContext);

    const aggreed = localStorage.getItem("aggreed");

    const [open, setOpen] = useState((aggreed ? false : true));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const style = {
        position: 'absolute' as 'absolute',
        top: '85%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (

        <AuthContextProvider>
            <StoreContextProvider>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={style}
                    >
                        <Typography
                            variant='h6'
                            component='p'
                        >
                            We use cookies to increase user experience
                        </Typography>
                        <Button
                            variant='outlined'
                            color='success'
                            onClick={() => {
                                localStorage.setItem('aggreed', 'true')
                                handleClose();
                            }}
                        >
                            Agree
                        </Button>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={() => {
                                localStorage.setItem('aggreed', 'false')
                                handleClose();
                            }}
                        >
                            Disagree
                        </Button>
                    </Box>
                </Modal>
                < NavBar />
                <Routes>
                    <Route path='/'>
                        <Route path='' element={<Home />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/store' element={<Store />} />
                        {!isLoggedIn && <Route path='signup' element={<Signup />} />}
                        {!isLoggedIn && <Route path='signin' element={<SignIn />} />}

                        {isLoggedIn && <Route path='profile' element={<Profile />} />}
                    </Route>
                </Routes>

            </StoreContextProvider>
        </AuthContextProvider>
    )
}

export default App;