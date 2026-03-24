import React from 'react';
import './SignInScreen.css';

const logo = '/assets/bocralogo.png';

interface AccountCreatedScreenProps {
    onContinueToLogin: () => void;
}

const AccountCreatedScreen: React.FC<AccountCreatedScreenProps> = ({ onContinueToLogin }) => {
    return (
        <div className="signin-container">
            <div className="signin-split-layout">
                {/* Left Side: Welcome & Information */}
                <div className="signin-welcome-section">
                    <div className="signin-logo-container">
                        <img src={logo} alt="BOCRA Logo" className="signin-logo" />
                    </div>
                    <h1 className="welcome-title">Registration Complete</h1>
                    <p className="welcome-text">
                        Welcome to the Botswana Communications Regulatory Authority securely integrated portal.
                    </p>

                    <div className="welcome-safety-notice">
                        <strong>Important Security Step:</strong> Before accessing your account, you must verify your identity. We have dispatched a verification link to your registered email address.
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                            <path fill="currentColor" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-1.293-4.707a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L10 14.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-6 6Z" clipRule="evenodd"/>
                        </svg>
                    </div>

                    <h1 className="signin-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Account Successfully Created!</h1>
                    
                    <p style={{ color: '#444', lineHeight: '1.7', marginBottom: '2rem', fontSize: '1.05rem', maxWidth: '400px' }}>
                        Your BOCRA profile has been provisioned. To activate your secure session, please check your inbox and click the verification link we just sent you.
                    </p>

                    <div style={{ background: '#fdf2f2', border: '1px solid #ffe4e4', padding: '1.25rem', borderRadius: '8px', marginBottom: '2.5rem', width: '100%' }}>
                        <p style={{ margin: 0, color: '#A80000', fontSize: '0.9rem', fontWeight: '600' }}>
                            Didn't receive an email? Check your spam/junk folder.
                        </p>
                    </div>

                    <button 
                        onClick={onContinueToLogin} 
                        className="login-button" 
                        style={{ width: '100%', maxWidth: '300px' }}
                    >
                        Proceed to Login Portal
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default AccountCreatedScreen;
