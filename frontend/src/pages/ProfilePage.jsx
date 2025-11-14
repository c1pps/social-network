import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
const api_url = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
    const [showPassword, setShowPassword] = useState(false);
    const [userr, setUser] = useState([]);
    const jwt = localStorage.getItem('jwt-token');

    useEffect(() => {
        async function fetchUser() {
            try {
            const response = await fetch(`${api_url}/api/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            if(!response.ok) {
                throw new Error('failed to fetch')
            }
            const {user} = await response.json();
            setUser(user)
            } catch (error) {
            console.log(error);
            }
        }
        fetchUser()
    }, [jwt])
    
    return (
        <div>
            <Helmet>
                <title>Page Profile</title>
                <meta name="description" content="Page de profil de l'utilisateur" />
            </Helmet>
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <img 
                            src={`${userr.image_url}`} 
                            alt="avatar"
                            className="profile-avatar"
                            tabIndex="0"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="profile-header-info">
                            <h1 className="profile-username" tabIndex="0">{userr.username}</h1>
                            <p className="profile-id" tabIndex="0">ID: {userr.id}</p>
                        </div>
                    </div>

                    <div className="profile-body">
                        <div className="info-group">
                            <label className="info-label" tabIndex="0">Nom d'utilisateur</label>
                            <div className="info-value" tabIndex="0">{userr.username}</div>
                        </div>

                        <div className="info-group">
                            <label className="info-label" tabIndex="0">Email</label>
                            <div className="info-value" tabIndex="0">{userr.email}</div>
                        </div>

                        <div className="divider"></div>

                        <div className="info-group">
                            <label className="info-label" tabIndex="0">Mot de passe</label>
                            <div className="password-container">
                                <div className="info-value" style={{ paddingRight: '80px' }} tabIndex="0">
                                    ••••••••
                                </div>
                            </div>
                        </div>

                        <div className="info-group">
                            <label className="info-label" tabIndex="0">Membre depuis</label>
                            <div className="info-value" tabIndex="0">{userr.created_at ? new Date(userr.created_at).toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}