import React, { useState } from 'react';
import './SignInScreen.css';
const logo = '/assets/bocralogo.png';

interface ClientSignInScreenProps {
    onLogin: () => void;
    onBackToAdmin: () => void;
}

const ClientSignInScreen: React.FC<ClientSignInScreenProps> = ({ onLogin, onBackToAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Client Login attempt:', { email, password });
        onLogin();
    };

    return (
        <div className="signin-container">
            <div className="signin-split-layout">
                
                {/* Left Side: Welcome & Information */}
                <div className="signin-welcome-section">
                    <div className="signin-logo-container">
                        <img src={logo} alt="BOCRA Logo" className="signin-logo" />
                    </div>
                    <h1 className="welcome-title">Welcome to BOCRA Consumer Portal</h1>
                    <p className="welcome-text">
                        Access regulatory services, file complaints, and check type-approved devices securely from our integrated consumer portal.
                    </p>

                    <div className="welcome-support-box">
                        <h3 className="support-title">Need System Support?</h3>
                        <p>If you require assistance or encounter issues accessing your account, please contact technical support:</p>
                        <div className="support-contacts">
                            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ color: '#A80000' }}>
                                    <path fill="currentColor" d="m21 15.46l-5.27-.61l-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97z"/>
                                </svg>
                                <strong>77593604</strong>
                            </p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ color: '#A80000' }}>
                                    <path fill="currentColor" d="M5 17V3h18v14zm-4 4V6.5h2V19h16.5v2zm13-8.725l7-4.85V5l-7 4.85L7 5v2.425z"/>
                                </svg>
                                <strong>support@bocra.org.bw</strong>
                            </p>
                        </div>
                    </div>

                    <div className="welcome-safety-notice">
                        <strong>Security Best Practices:</strong> Keep your login credentials strictly confidential. Never share your password with anyone. Always ensure you log out when stepping away from the system to prevent unauthorized access.
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="glass-card">

                    <h1 className="signin-title">Sign In to the Client Portal</h1>

                    <form onSubmit={handleSubmit} className="signin-form">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="membership number or email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="signin-input"
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="signin-input"
                            />
                        </div>

                        <button type="submit" className="login-button">Login to Portal</button>
                    </form>

                    <div className="signin-footer">
                        <div>
                            <span>Are you an Admin? </span>
                            <button 
                                type="button" 
                                className="contact-link" 
                                style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    font: 'inherit', 
                                    cursor: 'pointer',
                                    color: '#A80000',
                                    padding: 0,
                                    textDecoration: 'underline'
                                }}
                                onClick={onBackToAdmin}
                            >
                                Sign In to Admin Panel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientSignInScreen;
