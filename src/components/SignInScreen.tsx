import React, { useState } from 'react';
import './SignInScreen.css';
import { supabase } from '../lib/supabase';

const logo = '/assets/bocralogo.png';

interface SignInScreenProps {
    onLogin: () => void;
    onSwitchToClient: () => void;
    onSwitchToConsumer: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onLogin, onSwitchToClient, onSwitchToConsumer }) => {
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
                    <h1 className="welcome-title">Welcome to BOCRA Admin Portal</h1>
                    <p className="welcome-text">
                        The structured management system for Botswana Communications Regulatory Authority. Please sign in to securely access the administrative tools.
                    </p>

                    <div className="welcome-safety-notice">
                        <strong>Security Best Practices:</strong> Keep your login credentials strictly confidential. Never share your password with anyone. Always ensure you log out when stepping away from the system to prevent unauthorized access.
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="glass-card">

                <h1 className="signin-title">Sign In to the Admin Panel</h1>

                <form onSubmit={handleSubmit} className="signin-form">
                    {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
                    
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Admin email address"
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
                        {loading ? 'Logging In...' : 'Login to Admin Panel'}
                    </button>
                </form>

                <div className="signin-footer">
                    <div>
                        <span>Dont have an account? </span>
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
                                textDecoration: 'underline',
                                fontWeight: 'bold'
                            }}
                            onClick={onSwitchToClient}
                        >
                            Sign In to Client Portal
                        </button>
                    </div>
                    
                    <div style={{ marginTop: '0.75rem' }}>
                         <span>Are you a consumer? </span>
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
                                textDecoration: 'underline',
                                fontWeight: 'bold'
                            }}
                            onClick={onSwitchToConsumer}
                        >
                            Consumer Sign In
                        </button>
                    </div>
                </div>


            </div>
            </div>
        </div>
    );
};

export default SignInScreen;
