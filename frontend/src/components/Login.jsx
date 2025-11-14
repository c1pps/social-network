import React from "react"
import { useState } from "react"
import Loader from "./Loader"
const api_url = import.meta.env.VITE_API_URL;

export default function Login() {
    const [formData, setFormData] = useState({"email":'', "password":''})
    const [displayError, setError] = useState(null)
    const [isFormValid, setIsFormValid] = useState(true)
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState({
        "email": null,
        "password": null
    })

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            if(isFormValid) {
                 const response = await fetch(`${api_url}/api/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: formData['email'], password: formData['password']})
            });

            if(response.status === 401) {
                throw new Error('Email ou mot de passe incorrect')
            }
            
            if (response.status === 500) {
                throw new Error ('Erreur serveur, revenez plus tard')
            }

            if(response.status === 400) {
                throw new Error ('Les champs sont manquants')
            }

            let responseJSON = await response.json()
            localStorage.setItem('jwt-token', responseJSON.token)
            }

            setLoading(false)           
        } catch(error) {   
            setTimeout(() => {         
                setError(error.message)
                setLoading(false)
            }, 500)
        } 
    }
    
    function handleFormChange(e) {
        const targetName = e.target.name
        const targetValue = e.target.value

        if(targetName === 'email') {

            if(targetValue.length < 10) {
                setValidationError({
                    ...validationError, [targetName]:'Email trop petit'
                }); 
                setIsFormValid(false)
                return
            }
             setValidationError({
                    ...validationError, [targetName]:null
            }); 

        }
        setFormData({...formData, [targetName]:targetValue})
        // console.log(formData)
    }

    // console.log(validationError)

   return (
        <div className="signin-container">
            
            <form style={{width: '40%'}} onSubmit={(e) => (handleSubmit(e))}>
                {loading ? <Loader /> : <>
                <h3>Login</h3>

                {displayError ? <p style={{color: 'red', fontSize: '14px'}}>{displayError}</p> : <div></div>}

                <label htmlFor="email">Email</label>
                <input type="email" htmlFor="email" id="email" name="email" onChange={(e) => handleFormChange(e)} />
                <p style={{color: 'red', fontSize: '12px'}}>{validationError.email ? validationError.email : ''}</p>
                
                <label htmlFor="password">Password</label>
                <input type="password" htmlFor="password" id="password" name="password" onChange={(e) => handleFormChange(e)} />

                <button type="submit" disabled={isFormValid}>Send</button>
                </>}
            </form>
        </div>
    )
}