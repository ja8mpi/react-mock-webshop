import { render } from '@testing-library/react';
import { createContext } from 'react'

const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//     return (
//         <AuthContext.Provider>
//             {children}
//         </AuthContext.Provider>
//     )
// }