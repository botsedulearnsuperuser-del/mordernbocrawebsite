import React from 'react';
import './SignInScreen.css';

const logo = '/assets/bocralogo.png';

interface AccountVerifiedScreenProps {
    onContinueToLogin: () => void;
}

const AccountVerifiedScreen: React.FC<AccountVerifiedScreenProps> = ({ onContinueToLogin }) => {
    return (
        <div className="signin-container">
            <div className="signin-split-layout">
                {/* Left Side: Welcome & Information */}
                <div className="signin-welcome-section">
                    <div className="signin-logo-container">
                        <img src={logo} alt="BOCRA Logo" className="signin-logo" />
                    </div>
                    <h1 className="welcome-title">Account Activated</h1>
                    <p className="welcome-text">
                        Welcome to the Botswana Communications Regulatory Authority securely integrated portal.
                    </p>

                    <div className="welcome-safety-notice">
                        <strong>Security Best Practices:</strong> Never share your login credentials. Always ensure you log out when stepping away from public or shared devices.
                    </div>
                </div>

                {/* Right Side: Success Messaging */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
                    
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: '#e6ffe6', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        color: '#28a745'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="m23 12l-2.44-2.79l.34-3.69l-3.61-.82l-1.89-3.2L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5l.34 3.7L1 12l2.44 2.79l-.34 3.7l3.61.82L8.6 22.5l3.4-1.47l3.4 1.46l1.89-3.19l3.61-.82l-.34-3.69zm-12.91 4.72l-3.8-3.81l1.48-1.48l2.32 2.33l5.85-5.87l1.48 1.48z"/></svg>
                    </div>

                    <h1 className="signin-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Account Verified Successfully!</h1>
                    
                    <p style={{ color: '#444', lineHeight: '1.7', marginBottom: '2.5rem', fontSize: '1.05rem', maxWidth: '400px' }}>
                        Your email address has been successfully verified. Your secure BOCRA profile is now fully activated and ready to use.
                    </p>

                    <button 
                        onClick={onContinueToLogin} 
                        className="login-button" 
                        style={{ width: '100%', maxWidth: '300px' }}
                    >
                        Sign In Now
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default AccountVerifiedScreen;
