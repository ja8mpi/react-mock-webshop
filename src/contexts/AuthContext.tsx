import { render } from '@testing-library/react';
import { createContext } from 'react'

interface IAuth {
    isLoggedIn: boolean;
    ToggleLogin: any
}


const defaultState = {
    isLoggedIn: false,
};

const AuthContext = createContext<Partial<IAuth>>(defaultState);

export default AuthContext;
