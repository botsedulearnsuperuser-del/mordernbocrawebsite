import React, { useState } from 'react';
import './SignInScreen.css';
import { supabase } from '../lib/supabase';

const logo = '/assets/bocralogo.png';

interface ConsumerSignUpScreenProps {
    onSignUp: () => void;
    onBackToSignIn: () => void;
}

const ConsumerSignUpScreen: React.FC<ConsumerSignUpScreenProps> = ({ onSignUp, onBackToSignIn }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        phone: phone
                    }
                }
            });

            if (signUpError) {
                setError(signUpError.message);
            } else if (data.user) {
                // Background profile sync
                try {
                    await supabase.from('profiles').upsert({
                        id: data.user.id,
                        full_name: fullName,
                        updated_at: new Date().toISOString()
                    });
                } catch (pe) {
                    console.warn('Profile sync skipped:', pe);
                }
                onSignUp();
            }
        } catch (err: any) {
            console.error('Unexpected Sign-up Error:', err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-split-layout">
                {/* Left Side: Welcome & Information */}
                <div className="signin-welcome-section">
                    <div className="signin-logo-container">
                        <img src={logo} alt="BOCRA Logo" className="signin-logo" />
                    </div>
                    <h1 className="welcome-title">Create Your BOCRA Account</h1>
                    <p className="welcome-text">
                        Join our integrated consumer portal to access regulatory services, file complaints, and track your requests securely.
                    </p>

                    <div className="welcome-safety-notice">
                        <strong>Security Best Practices:</strong> Use a strong password with a mix of letters, numbers, and special characters. Your account security is our priority.
                    </div>
                </div>

                {/* Right Side: Sign Up Form */}
                <div className="glass-card">
                    <h1 className="signin-title">Sign Up to BOCRA Portal</h1>

                    <form onSubmit={handleSignUp} className="signin-form">
                        {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
                        
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="signin-input"
                                required
                            />
                        </div>

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
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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

                    <div className="signin-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <div>
                            <span>Already registered? </span>
                            <button
                                type="button"
                                className="contact-link"
                                style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', color: '#A80000', padding: 0, textDecoration: 'underline', fontWeight: 'bold' }}
                                onClick={onBackToSignIn}
                            >
                                Login as Consumer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsumerSignUpScreen;
