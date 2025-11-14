import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../providers/AuthProvider"

export default function Navbar() {
    const {currentUser, isAuthenticated} = useAuth()
    
    async function logout() {
        localStorage.removeItem('jwt-token')
        localStorage.removeItem('username')
    }

    return (
        <nav>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/signin">Sign In</NavLink>
                <NavLink to="/login">Log In</NavLink>
                {isAuthenticated ? <button style={{display: 'flex', alignItems: 'center', gap: '10px'}} onClick={() => logout()}> <img src={currentUser.image_url} className="avatar-img-btn" /> Logout</button> : <div></div>}
            </div>
        </nav>
    )
}