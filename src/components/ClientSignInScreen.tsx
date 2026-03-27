import React, { useState } from 'react';
import './SignInScreen.css';
import { supabase } from '../lib/supabase';

const logo = '/assets/bocralogo.png';

interface ClientSignInScreenProps {
    onLogin: () => void;
    onBackToAdmin: () => void;
}

const ClientSignInScreen: React.FC<ClientSignInScreenProps> = ({ onLogin, onBackToAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            setError(signInError.message);
        } else {
            onLogin();
        }
        setLoading(false);
    };

    return (
        <div className="signin-container">
            <div className="signin-split-layout">
                
                {/* Left Side: Welcome & Information */}
                <div className="signin-welcome-section">
                    <div className="signin-logo-container">
                        <img src={logo} alt="BOCRA Logo" className="signin-logo" />
                    </div>
                    <h1 className="welcome-title">Welcome to BOCRA Client Portal</h1>
                    <p className="welcome-text">
                        Access regulatory services, file complaints, and check type approved devices securely from our integrated client portal.
                    </p>

                    <div className="welcome-safety-notice">
                        <strong>Security Best Practices:</strong> Keep your login credentials strictly confidential. Never share your password with anyone. Always ensure you log out when stepping away from the system to prevent unauthorized access.
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="glass-card">

                    <h1 className="signin-title">Sign In to the Client Portal</h1>

                    <form onSubmit={handleSubmit} className="signin-form">
                        {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
                        
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Client email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="signin-input"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="signin-input"
                                required
                            />
                        </div>

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'Logging In...' : 'Login to Client Portal'}
                        </button>
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

