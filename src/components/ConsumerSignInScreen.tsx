import React, { useState } from 'react';
import './SignInScreen.css';
import { supabase } from '../lib/supabase';

const logo = '/assets/bocralogo.png';

interface ConsumerSignInScreenProps {
    onLogin: () => void;
    onBackToAdmin: () => void;
    onSwitchToSignUp: () => void;
}

const ConsumerSignInScreen: React.FC<ConsumerSignInScreenProps> = ({ onLogin, onBackToAdmin, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        console.log('Attempting login for:', email);

        let isStillLoading = true;

        // Safety timeout for login attempt
        const loginTimeout = setTimeout(() => {
            if (isStillLoading) {
                setLoading(false);
                setError('Login request timed out. Please check your internet connection and verify if you have clicked the link in your email.');
                console.warn('Login request timed out after 10s');
                isStillLoading = false;
            }
        }, 10000);

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (!isStillLoading) return; // Already timed out
            isStillLoading = false;
            clearTimeout(loginTimeout);
            
            if (signInError) {
                console.error('SignIn Error:', signInError);
                setError(signInError.message);
            } else if (data.session) {
                console.log('Login successful, proceeding...');
                onLogin();
            } else if (data.user) {
                // User exists but no session yet (could be email verification required)
                setError('Please verify your email address before logging in.');
            }
        } catch (err: any) {
            if (!isStillLoading) return;
            isStillLoading = false;
            clearTimeout(loginTimeout);
            console.error('Unexpected Login Exception:', err);
            setError('An unexpected error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const { error: googleError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });
        if (googleError) setError(googleError.message);
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

                    <div className="welcome-safety-notice">
                        <strong>Security Best Practices:</strong> Keep your login credentials strictly confidential. Never share your password with anyone. Always ensure you log out when stepping away from the system to prevent unauthorized access.
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="glass-card">

                    <h1 className="signin-title">Sign In to the Consumer Portal</h1>

                    <form onSubmit={handleSubmit} className="signin-form">
                        {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
                        
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email address"
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
                            {loading ? 'Logging In...' : 'Login to Portal'}
                        </button>

                        <div className="signin-footer" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                            <span>Don't have an account? </span>
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
                                onClick={onSwitchToSignUp}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '10px' }}>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }} />
                            <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: '700' }}>OR</span>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }} />
                        </div>

                        <button 
                            type="button" 
                            className="google-signin-btn"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#333',
                                transition: 'all 0.2s ease'
                            }}
                            onClick={handleGoogleSignIn}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                            Sign in with Google
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

export default ConsumerSignInScreen;

