import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }: any) => {
    if (!loggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};