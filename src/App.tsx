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
// import { ShopProvider } from "./contexts/ProductsContext";


const App = () => {

    const isLoggedIn = localStorage.getItem("loggedIn");

    console.log(isLoggedIn)

    return (
        <AuthContextProvider>
            <StoreContextProvider>
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