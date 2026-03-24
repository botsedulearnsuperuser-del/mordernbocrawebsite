import React, { useState } from 'react';
import './SignInScreen.css';
import { supabase } from '../lib/supabase';

const logo = '/assets/bocralogo.png';

interface ConsumerSignUpScreenProps {
    onSignUp: () => void;
    onBackToSignIn: () => void;
}

const ConsumerSignUpScreen: React.FC<ConsumerSignUpScreenProps> = ({ onSignUp, onBackToSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            onSignUp();
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
                    <h1 className="welcome-title">Create Your BOCRA Consumer Account</h1>
                    <p className="welcome-text">
                        Join our integrated consumer portal to access regulatory services, file complaints, and track your requests securely.
                    </p>

                    <div className="welcome-safety-notice">
                        <strong>Security Best Practices:</strong> Use a strong password with a mix of letters, numbers, and special characters. Your account security is our priority.
                    </div>
                </div>

                {/* Right Side: Sign Up Form */}
                <div className="glass-card">
                    <h1 className="signin-title">Sign Up to Consumer Portal</h1>

                    <form onSubmit={handleSignUp} className="signin-form">
                        {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
                        
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email Address"
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

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="signin-input"
                                required
                            />
                        </div>

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="signin-footer">
                        <div>
                            <span>Already have an account? </span>
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
                                onClick={onBackToSignIn}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsumerSignUpScreen;
