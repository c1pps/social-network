import { createContext, useContext, useEffect, useState } from "react"
import Loader from "../components/Loader"
const AuthContext = createContext()
const api_url = import.meta.env.VITE_API_URL;

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const token = localStorage.getItem('jwt-token')

        if(!token) {
            setLoading(false)
            return
        }

        async function validateToken() {
            if(!token) {
                return
            } else {
                try {
                    const response = await fetch(`${api_url}/api/auth/me`, {
                        headers: {'Authorization': `Bearer ${token}`}
                    })

                    const {user} = await response.json()
                    
                    setCurrentUser(user)
                    setTimeout(() => {
                     setLoading(false)
                    }, 1000)
                } catch(error) {
                    console.log(error)
                     setLoading(false)
                }
            }
        }
        validateToken()
    }, [])

    const value = {currentUser, isAuthenticated: currentUser ? true : false, loading}

    if(loading) {
        return (
            <AuthContext.Provider value={value}>
                <Loader />
            </AuthContext.Provider>
        )
    }

    return (
        <AuthContext.Provider value={value}>
            <div>
                {children}
            </div>
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
