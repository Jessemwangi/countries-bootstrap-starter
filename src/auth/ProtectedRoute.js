import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./Firebase";

const ProtectedRoute = ({ children}) => {
    const [user] = useAuthState(auth);
    if(!user) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export { ProtectedRoute };