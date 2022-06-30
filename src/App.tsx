import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Store from './components/store/Store';
import SignIn from './components/signin/Signin';
import Signup from './components/signup/Signup';
import NavBar from './components/navbar/NavBar';
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import Profile from "./components/profile/Profile";
import { Cart } from "./components/cart/Cart";
// import { ShopProvider } from "./contexts/ProductsContext";


const App = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setLoggedIn(!!localStorage.getItem('loggedIn'));
    }, []);

    const ToggleLogin = () => {
        setLoggedIn(!loggedIn);
    }


    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: loggedIn,
                ToggleLogin
            }}
        >
            < NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/store' element={<Store />} />
                {!loggedIn && <Route path='/signup' element={<Signup />} />}
                {!loggedIn && <Route path='/signin' element={<SignIn />} />}

                {loggedIn && <Route path='/profile' element={<Profile />} />}
            </Routes>
        </AuthContext.Provider>
    )
}

export default App;