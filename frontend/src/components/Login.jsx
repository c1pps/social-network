import React, { Suspense } from "react"
import { useState } from "react"
import Loader from "./Loader"
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const api_url = import.meta.env.VITE_API_URL;

export default function Login() {
    const [formData, setFormData] = useState({"email":'', "password":''})
    const [displayError, setError] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState({
        "email": null,
        "password": null
    })
    const navigate = useNavigate()

    async function handleSubmit(e) {
        console.log("submit")
        e.preventDefault()
        setLoading(true)
        console.log(isFormValid)

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

            if(response.status === 200) {
                navigate('/')
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
                    ...validationError, [targetName]:'Email is too short'
                }); 
                setIsFormValid(false)
                return
            }
            setIsFormValid(true)
            setValidationError({
                ...validationError, [targetName]:null
            }); 

        }
        setFormData({...formData, [targetName]:targetValue})
        // console.log(formData)
    }

    // console.log(validationError)

   return (
        <Suspense fallback={{Loader}}>
            <div className="signin-container">
                <Helmet>
                    <title>Log In</title>
                    <meta name="description" content="Page de connexion de l'utilisateur" />
                </Helmet>
                <form style={{width: '40%'}} onSubmit={(e) => handleSubmit(e)}>

                    {loading ? <Loader /> : <>
                    <h3>Login</h3>

                    {displayError ? <p style={{color: 'red', fontSize: '14px'}}>{displayError}</p> : <div></div>}

                    <label htmlFor="email">Email</label>
                    <input type="email" htmlFor="email" id="email" name="email" onChange={(e) => handleFormChange(e)} />
                    <p style={{color: 'red', fontSize: '12px'}}>{validationError.email ? validationError.email : ''}</p>
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" htmlFor="password" id="password" name="password" onChange={(e) => handleFormChange(e)} />

                    <button type="submit" disabled={!isFormValid} tabIndex="0">Send</button>
                    </>}
                </form>
            </div>
        </Suspense>
    )
}