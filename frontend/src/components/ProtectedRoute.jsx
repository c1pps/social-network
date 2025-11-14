import { Navigate } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
import Loader from "./Loader"

export default function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth()
    if(!isAuthenticated) {
        return <Navigate to='/login' />
    }

    return <div>{children}</div>
}