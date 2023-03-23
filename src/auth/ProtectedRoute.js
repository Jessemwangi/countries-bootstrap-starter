import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({user, children}) => {

    if(!user) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export { ProtectedRoute };