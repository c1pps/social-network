import React from "react"
import { useState } from "react"
const api_url = import.meta.env.VITE_API_URL;

export default function SignIn() {
    const [formData, setFormData] = useState({"username":'', "email":'', "password":''})

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(`${api_url}/auth/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: formData['email'], username: formData['username'], password: formData['password']})
            });
            if(!response.ok) {
                throw new Error('failed to fetch')
            }
            let responseJSON = await response.json()
            localStorage.setItem('jwt-token', responseJSON.token)
            localStorage.setItem('username', responseJSON.user.username)
        } catch(error) {            
            console.log(error)
        } 
    }

    function handleFormChange(e) {
        setFormData({...formData, [e.target.name]:e.target.value})
        // console.log(formData)
    }

    return (
        <div className="signin-container">
            <form style={{width: '40%'}} onSubmit={(e) => handleSubmit(e)}>
                <h3>Sign In</h3>
                
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                onChange={(e) => handleFormChange(e)} 
                />
                
                <label htmlFor="username">Username</label>
                <input 
                type="text" 
                id="username" 
                name="username" 
                onChange={(e) => handleFormChange(e)} 
                />

                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                id="password" 
                name="password" 
                onChange={(e) => handleFormChange(e)} 
                />

                <button type="submit">Send</button>
            </form>
        </div>
    )
}