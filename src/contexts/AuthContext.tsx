import { render } from '@testing-library/react';
import { createContext, useState } from 'react'

type IAuth = {
    isLoggedIn: boolean;
    ToggleLogin: any
}


const defaultState = {
    isLoggedIn: false,
};

const AuthContext = createContext<Partial<IAuth>>({});

export default AuthContext;


type AuthContextProps = {
    children: React.ReactNode
}


export const AuthContextProvider = ({ children }: AuthContextProps) => {

    const [loggedIn, setLoggedIn] = useState(false);

    // localStorage.removeItem('loggedIn');

    const toggleLogin = () => {
        const loginCookie = localStorage.getItem('loggedIn');
        if (loginCookie) {
            setLoggedIn(false);
            localStorage.removeItem('loggedIn');
        } else {
            setLoggedIn(true);
            localStorage.setItem('loggedIn', 'true');
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: loggedIn,
                ToggleLogin: toggleLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}