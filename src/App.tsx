import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Store from './components/store/Store';
import SignIn from './components/signin/Signin';
import Signup from './components/signup/Signup';
import NavBar from './components/navbar/NavBar';
// import { ShopProvider } from "./contexts/ProductsContext";

const App = () => {

    const isLoggedIn = true;

    return (
        <>
            < NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/store' element={<Store />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </>
    )
}

export default App;