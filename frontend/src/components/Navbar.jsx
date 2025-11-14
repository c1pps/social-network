import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../providers/AuthProvider"

export default function Navbar() {
    const {currentUser, isAuthenticated, signOut} = useAuth()

    return (
        <nav>
            <div className='nav-container'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/signin">Sign In</NavLink>
                <NavLink to="/login">Log In</NavLink>
                <div className="btn-container">
                    {isAuthenticated ? <NavLink to='/profile' className="btn" style={{display: 'flex', alignItems: 'center', gap: '10px'}}> <img src={currentUser.image_url} alt='profile-img' className="avatar-img-btn" loading="lazy" decoding="async" /> Profile</NavLink> : <div></div>}
                    {isAuthenticated ? <button onClick={() => signOut()} className="btn" style={{display: 'flex', alignItems: 'center', gap: '10px'}}> Sign Out</button> : <div></div>}
                </div>
            </div>
        </nav>
    )
}